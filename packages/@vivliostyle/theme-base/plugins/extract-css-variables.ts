// oxlint-disable no-underscore-dangle
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { lexer, type DSNode } from 'css-tree';
import type { Plugin, PluginCreator } from 'postcss';
import valueParser from 'postcss-value-parser';
import { parse, stringify } from 'yaml';

const defaultOutput = 'css-variables.yml';
const defaultDefineOutput = 'css/common/define.css';
const defaultJsonOutput = 'dist/css-variables.json';
const defaultSelector = ':root';
const defaultPrefix = '';

const basicGroup = '_basic';
const metaPropertiesGroup = '_meta-properties';
// Variables that carry no namespace of their own get a synthetic group. These
// lead the output; real namespaces follow, sorted by name.
const leadingGroups = [metaPropertiesGroup, basicGroup];
// postcss-variable-theming joins nested `@var` scopes with this, so it is what
// separates one level of the spec from the next.
const nestingDelimiter = '--';

const fallbackSyntax = '*';

export interface Options {
  cwd?: string;
  prefix?: string;
  output?: string;
  defineOutput?: string;
  jsonOutput?: string;
  format?: (file: string, code: string) => string | Promise<string>;
}

/** One `_define` entry as written by hand in the spec file. */
type DefineSource =
  | string
  | number
  | { media?: string; selector?: string; value?: unknown };

interface SpecEntry {
  _syntax?: string;
  _property?: string | string[];
  _define?: DefineSource | DefineSource[];
  [field: string]: unknown;
}

interface SpecNode {
  [key: string]: SpecEntry | SpecNode;
}

interface DefineItem {
  media: string | null;
  selector: string;
  value: unknown;
}

interface UsageRecord {
  name: string;
  property: string;
}

interface Registry {
  files: Map<string, UsageRecord[]>;
  existing: SpecNode | undefined;
  lastWritten: string | null;
  queue: Promise<void>;
}

/** How often one `@property` component may repeat, and with which separator. */
interface ComponentUse {
  repeated: boolean;
  comma: boolean;
}

type Components = Map<string, ComponentUse>;

// Component names `@property` accepts, per css-properties-values-api-1.
// `<length-percentage>` is kept rather than expanded to `<length> |
// <percentage>` so that repeated values such as `margin-inline: 1em 5%` stay
// expressible; for single-valued properties the two spellings are equivalent.
const supportedComponents = new Set([
  'angle',
  'color',
  'custom-ident',
  'image',
  'integer',
  'length',
  'length-percentage',
  'number',
  'percentage',
  'resolution',
  'string',
  'time',
  'transform-function',
  'transform-list',
  'url',
]);

const reservedKeywords = new Set([
  'default',
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
]);

// Derived from css-tree's value definition grammar (a patched copy of
// mdn-data) rather than hand-maintained. Returns the `@property` components a
// property accepts, or null when its values cannot be expressed at all.
function deriveComponents(property: string): Components | null {
  const descriptor = lexer.properties[property];
  if (!descriptor?.syntax) {
    return null;
  }

  const found: Components = new Map();
  const visiting = new Set<string>();

  const record = (component: string, context: ComponentUse): void => {
    const previous = found.get(component);
    found.set(component, {
      repeated: (previous?.repeated ?? false) || context.repeated,
      comma: (previous?.comma ?? false) || context.comma,
    });
  };

  const walk = (node: DSNode, context: ComponentUse): void => {
    switch (node.type) {
      case 'Group': {
        // A functional notation is a juxtaposed group led by a Function term.
        // Its arguments say nothing about the property's own value type.
        if (node.terms.some((term) => term.type === 'Function')) {
          break;
        }
        // `||` and `&&` let several operands appear together
        // (`font-synthesis: weight style`), which a flat union cannot express.
        const combined =
          (node.combinator === '||' || node.combinator === '&&') &&
          node.terms.length > 1;
        const next = combined ? { ...context, repeated: true } : context;
        for (const term of node.terms) {
          walk(term, next);
        }
        break;
      }
      case 'Multiplier': {
        walk(node.term, {
          repeated: context.repeated || node.max === 0 || node.max > 1,
          comma: context.comma || node.comma,
        });
        break;
      }
      case 'Type': {
        // `<foo()>` is a functional notation, `<-foo>` a non-standard type.
        if (node.name.endsWith('()') || node.name.startsWith('-')) {
          break;
        }
        if (supportedComponents.has(node.name)) {
          record(`<${node.name}>`, context);
          break;
        }
        const type = lexer.types[node.name];
        if (!type?.syntax || visiting.has(`<${node.name}>`)) {
          break;
        }
        visiting.add(`<${node.name}>`);
        walk(type.syntax, context);
        visiting.delete(`<${node.name}>`);
        break;
      }
      case 'Property': {
        const reference = lexer.properties[node.name];
        if (!reference?.syntax || visiting.has(node.name)) {
          break;
        }
        visiting.add(node.name);
        walk(reference.syntax, context);
        visiting.delete(node.name);
        break;
      }
      case 'Keyword': {
        // CSS-wide keywords are always accepted regardless of the registered
        // syntax, and `default` is reserved; neither may be spelled out.
        if (!reservedKeywords.has(node.name)) {
          record(node.name, context);
        }
        break;
      }
      // Function / Token / String carry no component of their own.
      default:
        break;
    }
  };

  walk(descriptor.syntax, { repeated: false, comma: false });
  if (found.size === 0) {
    return null;
  }
  // A repeated sequence mixing component types (`content`, which allows
  // `'x' url(y)`) has no `@property` spelling: multipliers bind per component,
  // so `<string>+ | <url>+` would reject the very values it should allow.
  if (found.size > 1 && [...found.values()].some((entry) => entry.repeated)) {
    return null;
  }
  return found;
}

const componentsCache = new Map<string, Components | null>();

function propertyComponentsOf(property: string): Components | null {
  const cached = componentsCache.get(property);
  if (cached !== undefined) {
    return cached;
  }
  const components = deriveComponents(property);
  componentsCache.set(property, components);
  return components;
}

// A variable is substituted into every property that references it, so its
// value has to satisfy all of them: the components they have in common.
// Properties with no expressible syntax constrain nothing and drop out.
function intersectComponents(sets: Components[]): Components {
  const [first, ...rest] = sets;
  const shared: Components = new Map();
  if (!first) {
    return shared;
  }
  for (const [component, entry] of first) {
    const others: ComponentUse[] = [];
    for (const set of rest) {
      const other = set.get(component);
      if (other) {
        others.push(other);
      }
    }
    if (others.length !== rest.length) {
      continue;
    }
    const all = [entry, ...others];
    // Repetition survives only where every property allows it and they agree
    // on the separator; otherwise a single value is the safe common ground.
    const repeated =
      all.every((item) => item.repeated) &&
      all.every((item) => item.comma === entry.comma);
    shared.set(component, { repeated, comma: entry.comma });
  }
  return shared;
}

function renderComponents(components: Components): string {
  const isType = (component: string): boolean => component.startsWith('<');
  return [...components]
    .toSorted(
      ([a], [b]) => Number(isType(a)) - Number(isType(b)) || a.localeCompare(b),
    )
    .map(
      ([component, { repeated, comma }]) =>
        `${component}${repeated ? (comma ? '#' : '+') : ''}`,
    )
    .join(' | ');
}

function scanValue(value: string, onVar: (name: string) => void): void {
  if (!value.includes('var(')) {
    return;
  }
  valueParser(value).walk((node) => {
    if (node.type !== 'function' || node.value !== 'var') {
      return;
    }
    const [nameNode] = node.nodes;
    if (nameNode?.type === 'word' && nameNode.value.startsWith('--')) {
      onVar(nameNode.value);
    }
  });
}

// Maps a variable name onto its path in the spec. The last segment keeps the
// property name fused to its scope (`anchor-text-decoration`), because the two
// are joined by a single dash that nothing distinguishes from a dash inside
// either half.
function locate(name: string, prefix: string): string[] | null {
  const head = `--${prefix}`;
  if (!name.startsWith(head) || name === head) {
    return null;
  }
  const rest = name.slice(head.length);
  // A `@var -foo` scope sits one level below the prefix, which is what the
  // extra leading dash of `--vs--foo-bar` marks.
  const scoped = rest.startsWith('-');
  const specPath = (scoped ? rest.slice(1) : rest).split(nestingDelimiter);
  if (specPath.some((segment) => segment === '')) {
    return null;
  }
  if (scoped) {
    return [basicGroup, ...specPath];
  }
  return specPath.length === 1 ? [metaPropertiesGroup, ...specPath] : specPath;
}

function variableName(specPath: string[], prefix: string): string {
  const [head, ...rest] = specPath;
  if (head === metaPropertiesGroup) {
    return `--${prefix}${rest.join(nestingDelimiter)}`;
  }
  if (head === basicGroup) {
    return `--${prefix}-${rest.join(nestingDelimiter)}`;
  }
  return `--${prefix}${specPath.join(nestingDelimiter)}`;
}

// Leaves hold the fields of one variable, all of them underscore-prefixed;
// every other key is a nesting level.
function isLeaf(node: SpecEntry | SpecNode): node is SpecEntry {
  return Object.keys(node).some((key) => key.startsWith('_'));
}

function* leavesOf(
  node: SpecNode,
  specPath: string[] = [],
): Generator<[string[], SpecEntry]> {
  for (const [key, value] of Object.entries(node)) {
    if (typeof value !== 'object') {
      continue;
    }
    const next = [...specPath, key];
    if (isLeaf(value)) {
      yield [next, value];
    } else {
      yield* leavesOf(value, next);
    }
  }
}

// Custom properties and at-rule params are usage sites, but they name no CSS
// property and carry no type information, so they describe neither field.
function cssPropertiesOf(properties: Set<string>): string[] {
  return [...properties]
    .filter(
      (property) => !property.startsWith('--') && !property.startsWith('@'),
    )
    .toSorted((a, b) => a.localeCompare(b));
}

function syntaxOf(cssProperties: string[]): string {
  const sets = cssProperties
    .map((property) => propertyComponentsOf(property))
    .filter((components): components is Components => components !== null);
  if (sets.length === 0) {
    return fallbackSyntax;
  }
  const shared = intersectComponents(sets);
  return shared.size === 0 ? fallbackSyntax : renderComponents(shared);
}

function mergeEntry(
  generated: SpecEntry,
  previous: SpecEntry | undefined,
): SpecEntry {
  if (!previous) {
    return generated;
  }
  // Rebuilt in a fixed order rather than spread, so an entry that gains or
  // loses `_property` keeps the same field layout as every other one.
  const merged: SpecEntry = {};
  // `_syntax` is seeded when the entry first appears, then left to hand edits.
  if ('_syntax' in previous) {
    merged._syntax = previous._syntax;
  } else if ('_syntax' in generated) {
    merged._syntax = generated._syntax;
  }
  // `_property` only records where the variable is used, so it must not drift.
  if ('_property' in generated) {
    merged._property = generated._property;
  }
  for (const [field, value] of Object.entries(previous)) {
    if (field !== '_syntax' && field !== '_property') {
      merged[field] = value;
    }
  }
  return merged;
}

function lookupEntry(
  node: SpecNode | undefined,
  specPath: string[],
): SpecEntry | undefined {
  let current = node;
  for (const segment of specPath.slice(0, -1)) {
    const child = current?.[segment];
    current = child !== undefined && !isLeaf(child) ? child : undefined;
  }
  const key = specPath.at(-1);
  const leaf = key === undefined ? undefined : current?.[key];
  return leaf !== undefined && isLeaf(leaf) ? leaf : undefined;
}

function sortNode(node: SpecNode, depth: number): SpecNode {
  const keys = Object.keys(node).toSorted((a, b) => a.localeCompare(b));
  // The synthetic groups only exist at the top, where they lead.
  const ordered =
    depth === 0
      ? [
          ...leadingGroups.filter((group) => keys.includes(group)),
          ...keys.filter((key) => !leadingGroups.includes(key)),
        ]
      : keys;

  const sorted: SpecNode = {};
  for (const key of ordered) {
    const value = node[key];
    if (value === undefined) {
      continue;
    }
    sorted[key] = isLeaf(value) ? value : sortNode(value, depth + 1);
  }
  return sorted;
}

function build(
  files: Map<string, UsageRecord[]>,
  existing: SpecNode | undefined,
  prefix: string,
): SpecNode {
  const usage = new Map<string, Set<string>>();
  const use = (name: string, property: string): void => {
    const properties = usage.get(name) ?? new Set<string>();
    usage.set(name, properties);
    properties.add(property);
  };

  for (const records of files.values()) {
    for (const record of records) {
      use(record.name, record.property);
    }
  }

  const tree: SpecNode = {};
  for (const [name, properties] of usage) {
    const specPath = locate(name, prefix);
    if (!specPath) {
      continue;
    }

    const cssProperties = cssPropertiesOf(properties);
    const entry: SpecEntry = { _syntax: syntaxOf(cssProperties) };
    if (cssProperties.length === 1) {
      entry._property = cssProperties[0];
    } else if (cssProperties.length > 1) {
      entry._property = cssProperties;
    }

    const key = specPath.at(-1);
    if (key === undefined) {
      continue;
    }
    let node = tree;
    for (const segment of specPath.slice(0, -1)) {
      const child = node[segment];
      const branch = child !== undefined && !isLeaf(child) ? child : {};
      node[segment] = branch;
      node = branch;
    }
    node[key] = mergeEntry(entry, lookupEntry(existing, specPath));
  }
  return sortNode(tree, 0);
}

// A `_define` entry is either the value on its own or an object carrying the
// context it applies in; a bare value lands on `:root` with no media query.
function defineItemsOf(define: SpecEntry['_define']): DefineItem[] {
  if (define === undefined || define === null) {
    return [];
  }
  const sources: DefineSource[] = Array.isArray(define) ? define : [define];
  return sources
    .map<DefineItem>((item) =>
      typeof item === 'object'
        ? {
            media: item.media ?? null,
            selector: item.selector ?? defaultSelector,
            value: item.value,
          }
        : { media: null, selector: defaultSelector, value: item },
    )
    .filter((item) => item.value !== undefined && item.value !== null);
}

interface DeclarationLine {
  group: string;
  text: string;
}

function renderRule(
  selector: string,
  declarations: DeclarationLine[],
  depth: number,
): string {
  const pad = '  '.repeat(depth);
  const indent = '  '.repeat(depth + 1);
  const body = declarations
    .map((declaration, index) => {
      const previous = declarations[index - 1];
      const gap = previous && previous.group !== declaration.group ? '\n' : '';
      return `${gap}${indent}${declaration.text}`;
    })
    .join('\n');
  return `${pad}${selector} {\n${body}\n${pad}}`;
}

function renderDefineCss(spec: SpecNode, prefix: string): string {
  // Keyed by media query first so selectors sharing one share a single
  // `@media`; the empty key holds the unconditional rules.
  const queries = new Map<string, Map<string, DeclarationLine[]>>();

  for (const [specPath, entry] of leavesOf(spec)) {
    const name = variableName(specPath, prefix);
    // Declarations are separated by a blank line wherever the scope changes.
    const group = specPath.slice(0, -1).join(nestingDelimiter);
    for (const item of defineItemsOf(entry._define)) {
      const query = item.media ?? '';
      const selectors =
        queries.get(query) ?? new Map<string, DeclarationLine[]>();
      queries.set(query, selectors);
      const declarations = selectors.get(item.selector) ?? [];
      selectors.set(item.selector, declarations);
      declarations.push({ group, text: `${name}: ${String(item.value)};` });
    }
  }

  // Unconditional rules lead; the rest keep the order the variables appear in,
  // which the spec file already fixes.
  const ordered = [...queries].toSorted(
    ([a], [b]) => Number(Boolean(a)) - Number(Boolean(b)),
  );

  const chunks: string[] = [];
  for (const [query, selectors] of ordered) {
    if (query === '') {
      for (const [selector, declarations] of selectors) {
        chunks.push(renderRule(selector, declarations, 0));
      }
      continue;
    }
    const rules = [...selectors]
      .map(([selector, declarations]) => renderRule(selector, declarations, 1))
      .join('\n\n');
    chunks.push(`@media ${query} {\n${rules}\n}`);
  }
  return chunks.length === 0 ? '' : `${chunks.join('\n\n')}\n`;
}

function isSpecNode(value: unknown): value is SpecNode {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readRaw(output: string): string | null {
  try {
    return readFileSync(output, 'utf8');
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

// Re-reading before every write would feed this plugin its own half-finished
// output and drop the preserved fields of files not processed yet. Reading only
// when the file no longer matches what was written last keeps hand edits that
// land between the rebuilds of a long-lived `postcss --watch`.
function refreshExisting(registry: Registry, output: string): string | null {
  const raw = readRaw(output);
  if (raw === registry.lastWritten) {
    return raw;
  }
  const parsed: unknown = raw === null ? undefined : parse(raw);
  registry.existing = isSpecNode(parsed) ? parsed : undefined;
  return raw;
}

// postcss-load-config re-imports the config file for every input file, so a new
// plugin instance is created per file. Keeping the collected records in module
// scope is what lets a single YAML cover the whole build.
const registries = new Map<string, Registry>();

function registryFor(output: string): Registry {
  const registry: Registry = registries.get(output) ?? {
    files: new Map(),
    existing: undefined,
    // Content of the last write, so that an edit arriving between two rebuilds
    // of one process can be told apart from this plugin's own output.
    lastWritten: null,
    // Writes are async once formatting is involved, so they are queued: each
    // rebuilds after the previous one finished, and the last file to arrive
    // therefore writes last, with every file's records in hand.
    queue: Promise.resolve(),
  };
  registries.set(output, registry);
  return registry;
}

const extractCssVariables = (options: Options = {}): Plugin => {
  const cwd = options.cwd ?? process.cwd();
  const prefix = options.prefix ?? defaultPrefix;
  const output = path.resolve(cwd, options.output ?? defaultOutput);
  const defineOutput = path.resolve(
    cwd,
    options.defineOutput ?? defaultDefineOutput,
  );
  const jsonOutput = path.resolve(cwd, options.jsonOutput ?? defaultJsonOutput);
  const registry = registryFor(output);
  const { files } = registry;
  const format = options.format ?? ((file: string, code: string) => code);

  return {
    postcssPlugin: 'extract-css-variables',
    // Scanning happens in OnceExit rather than in node visitors because
    // postcss-variable-theming expands its `@var` blocks in OnceExit, and
    // PostCSS has already finished its visitor walk by then. Visitors would
    // only ever see the source tree, missing every generated var() reference.
    OnceExit(root, { result }) {
      const from = result.opts.from;
      const file = from ? path.relative(cwd, from) : '<no source>';
      const records: UsageRecord[] = [];
      files.set(file, records);

      // Hand edits to the spec file change the generated `_define` output, so
      // `postcss --watch` has to rebuild on them as it would for an @import.
      if (from) {
        result.messages.push({
          type: 'dependency',
          plugin: 'extract-css-variables',
          file: output,
          parent: from,
        });
      }

      root.walkDecls((decl) => {
        scanValue(decl.value, (name) => {
          records.push({ name, property: decl.prop });
        });
      });
      root.walkAtRules((atRule) => {
        scanValue(atRule.params, (name) => {
          records.push({ name, property: `@${atRule.name}` });
        });
      });

      registry.queue = registry.queue.then(async () => {
        const current = refreshExisting(registry, output);
        const spec = build(files, registry.existing, prefix);
        const yaml = stringify(spec, {
          defaultKeyType: 'PLAIN',
          defaultStringType: 'QUOTE_SINGLE',
          lineWidth: 0,
        });
        const written = await format(output, yaml);
        // The spec file is watched as a dependency of every input, so writing
        // it unconditionally would make `postcss --watch` rebuild forever.
        if (written !== current) {
          writeFileSync(output, written);
        }
        registry.lastWritten = written;
        // css/ and dist/ are build artifacts, so they may not exist yet.
        mkdirSync(path.dirname(defineOutput), { recursive: true });
        writeFileSync(
          defineOutput,
          await format(defineOutput, renderDefineCss(spec, prefix)),
        );
        mkdirSync(path.dirname(jsonOutput), { recursive: true });
        writeFileSync(
          jsonOutput,
          await format(
            jsonOutput,
            `${JSON.stringify(spec, null, 2)}
`,
          ),
        );
      });
      return registry.queue;
    },
  };
};
extractCssVariables.postcss = true as const;

export default extractCssVariables satisfies PluginCreator<Options>;
