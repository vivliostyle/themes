#!/usr/bin/env node
// Moves the example of a theme package into a template that
// `vivliostyle create` can use, and declares it in `vivliostyle.template`.
//   node scripts/example-to-template.ts [--dry-run] <package-dir>...
//
// The root vivliostyle.config.js keeps building the moved files, so
// `example:build` and `example:preview` work as before.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

import {
  isRecord,
  readPackageJson,
  writePackageJson,
} from './theme-metadata.ts';

type Config = Record<string, unknown>;
type Entry = string | Record<string, unknown>;

interface Plan {
  id: string;
  name: string;
  sourceDir: string;
  config: Config;
}

const EXAMPLE_DIR = 'example';
const TEMPLATE_DIR = 'template';
const CONFIG_FILE = 'vivliostyle.config.js';
// Options that only make sense for building the example inside the theme
// package; a project created from the template uses the CLI's defaults.
const DROPPED_OPTIONS = new Set([
  'title',
  'author',
  'language',
  'theme',
  'entry',
  'cover',
  'output',
  'workspaceDir',
  'copyAsset',
  'image',
  'browser',
]);

function normalizePath(value: string): string {
  return path.posix.normalize(value.replace(/^\.\//v, ''));
}

function toEntries(value: unknown): Entry[] {
  const values = Array.isArray(value) ? value : [value];
  return values.map((entry: unknown) => {
    if (typeof entry === 'string' || isRecord(entry)) {
      return entry;
    }
    throw new TypeError(`Unexpected entry: ${JSON.stringify(entry)}`);
  });
}

function entryPath(entry: Entry): string | undefined {
  if (typeof entry === 'string') {
    return entry;
  }
  return typeof entry.path === 'string' ? entry.path : undefined;
}

function commonDir(paths: string[]): string {
  const split = paths.map((p) => normalizePath(p).split('/').slice(0, -1));
  const first = split[0] ?? [];
  let length = first.length;
  for (const segments of split) {
    length = Math.min(length, segments.length);
    for (let i = 0; i < length; i++) {
      if (segments[i] !== first[i]) {
        length = i;
        break;
      }
    }
  }
  return first.slice(0, length).join('/');
}

async function loadConfigs(packageDir: string): Promise<Config[]> {
  const url = pathToFileURL(path.resolve(packageDir, CONFIG_FILE));
  const module: unknown = await import(url.href);
  const config = isRecord(module) ? module.default : undefined;
  const configs: unknown[] = Array.isArray(config) ? config : [config];
  return configs.map((item) => {
    if (!isRecord(item)) {
      throw new TypeError(`${url.pathname} does not export a config`);
    }
    return item;
  });
}

function planTemplates(configs: Config[], themeName: string): Plan[] {
  const [single] = configs;
  if (configs.length === 1 && single) {
    return [
      {
        id: 'default',
        name: `${themeName} sample`,
        sourceDir: EXAMPLE_DIR,
        config: single,
      },
    ];
  }
  return configs.map((config) => {
    const sourceDir = commonDir(
      toEntries(config.entry ?? []).flatMap((entry) => entryPath(entry) ?? []),
    );
    if (!sourceDir.startsWith(`${EXAMPLE_DIR}/`)) {
      throw new Error(
        `The entries of a build task are not in a subdirectory of ${EXAMPLE_DIR}/`,
      );
    }
    const id = path.posix.basename(sourceDir);
    return {
      id,
      name: typeof config.title === 'string' ? config.title : id,
      sourceDir,
      config,
    };
  });
}

function toJs(value: unknown, indent: string): string {
  const inner = `${indent}  `;
  if (Array.isArray(value)) {
    return value.length === 0
      ? '[]'
      : `[\n${value.map((item: unknown) => `${inner}${toJs(item, inner)},`).join('\n')}\n${indent}]`;
  }
  if (isRecord(value)) {
    const fields = Object.entries(value).map(
      ([key, item]) =>
        `${inner}${/^[A-Za-z_$][\w$]*$/v.test(key) ? key : JSON.stringify(key)}: ${toJs(item, inner)},`,
    );
    return fields.length === 0 ? '{}' : `{\n${fields.join('\n')}\n${indent}}`;
  }
  return JSON.stringify(value);
}

function renderConfig(
  plan: Plan,
  packageName: string,
  mainStyle: string,
): string {
  const theme = `{{#if theme}}{{json theme}}{{else}}${JSON.stringify(packageName)}{{/if}}`;
  const relative = (value: unknown): string => {
    if (typeof value !== 'string') {
      throw new TypeError(`Unexpected path: ${JSON.stringify(value)}`);
    }
    const normalized = normalizePath(value);
    if (!normalized.startsWith(`${plan.sourceDir}/`)) {
      throw new Error(`${value} is outside of ${plan.sourceDir}/`);
    }
    return JSON.stringify(normalized.slice(plan.sourceDir.length + 1));
  };
  const themeEntry = (value: unknown): string => {
    if (typeof value !== 'string') {
      throw new TypeError(`Unexpected theme: ${JSON.stringify(value)}`);
    }
    const normalized = normalizePath(value);
    if (normalized === '.' || normalized === mainStyle) {
      return theme;
    }
    if (!normalized.includes('/')) {
      return `{ specifier: ${theme}, import: ${JSON.stringify(normalized)} }`;
    }
    return relative(normalized);
  };
  const lines = ['title: {{json (proper title)}},', 'author: {{json author}},'];
  const { config } = plan;
  if (typeof config.language === 'string') {
    // The sample text is written in this language whatever the user chooses.
    lines.push(`language: ${JSON.stringify(config.language)},`);
  } else {
    lines.push('{{#if language}}', 'language: {{json language}},', '{{/if}}');
  }
  for (const [key, value] of Object.entries(config)) {
    if (!DROPPED_OPTIONS.has(key)) {
      lines.push(`${key}: ${toJs(value, '  ')},`);
    }
  }
  if (config.theme !== undefined) {
    const themes: unknown[] = Array.isArray(config.theme)
      ? config.theme
      : [config.theme];
    const rendered = themes.map((value) => themeEntry(value));
    lines.push(
      rendered.length === 1
        ? `theme: ${rendered[0]},`
        : `theme: [${rendered.join(', ')}],`,
    );
  }
  const entries = toEntries(config.entry ?? []).map((entry) => {
    if (typeof entry === 'string') {
      return relative(entry);
    }
    if (Object.keys(entry).length === 1 && typeof entry.path === 'string') {
      return relative(entry.path);
    }
    const fields = Object.entries(entry).map(([key, value]) => {
      if (key === 'path') {
        return `${key}: ${relative(value)}`;
      }
      if (key === 'theme') {
        return `${key}: ${themeEntry(value)}`;
      }
      return `${key}: ${JSON.stringify(value)}`;
    });
    return `{ ${fields.join(', ')} }`;
  });
  lines.push(`entry: [\n    ${entries.join(',\n    ')},\n  ],`);
  if (typeof config.cover === 'string') {
    lines.push(`cover: ${relative(config.cover)},`);
  } else if (isRecord(config.cover)) {
    const { src, ...rest } = config.cover;
    lines.push(
      `cover: ${toJs({ ...rest, src: '<src>' }, '  ').replace('"<src>"', relative(src))},`,
    );
  }
  return `// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  ${lines.join('\n  ')}
});
`;
}

function escapeHandlebars(dir: string): string[] {
  const escaped: string[] = [];
  const decoder = new TextDecoder('utf-8', { fatal: true });
  for (const entry of fs.readdirSync(dir, {
    withFileTypes: true,
    recursive: true,
  })) {
    if (!entry.isFile()) {
      continue;
    }
    const file = path.join(entry.parentPath, entry.name);
    let text: string;
    try {
      text = decoder.decode(fs.readFileSync(file));
    } catch {
      // The CLI copies files that are not UTF-8 text as they are.
      continue;
    }
    const replaced = text.replaceAll(/(?<!\\)\{\{/gv, '\\{{');
    if (replaced !== text) {
      fs.writeFileSync(file, replaced);
      escaped.push(file);
    }
  }
  return escaped;
}

function rewriteConfigPaths(packageDir: string, plans: Plan[]): void {
  const files = [CONFIG_FILE];
  const configDir = path.join(packageDir, 'config');
  if (fs.existsSync(configDir)) {
    for (const entry of fs.readdirSync(configDir, { recursive: true })) {
      if (path.basename(String(entry)) === CONFIG_FILE) {
        files.push(path.join('config', String(entry)));
      }
    }
  }
  for (const file of files) {
    const target = path.join(packageDir, file);
    let text = fs.readFileSync(target, 'utf8');
    for (const plan of plans) {
      for (const quote of ["'", '"', '`']) {
        for (const prefix of ['', './']) {
          text = text.replaceAll(
            `${quote}${prefix}${plan.sourceDir}/`,
            `${quote}${TEMPLATE_DIR}/${plan.id}/`,
          );
        }
      }
    }
    fs.writeFileSync(target, text);
  }
}

async function convert(packageDir: string, dryRun: boolean): Promise<void> {
  const pkg = readPackageJson(packageDir);
  if (pkg.vivliostyle?.template) {
    console.log(`${pkg.name}: already has templates`);
    return;
  }
  const mainStyle = normalizePath(
    pkg.vivliostyle?.theme?.style ?? pkg.style ?? pkg.main ?? 'theme.css',
  );
  const plans = planTemplates(
    await loadConfigs(packageDir),
    pkg.vivliostyle?.theme?.name ?? pkg.name,
  );
  const rendered = plans.map((plan) => ({
    plan,
    config: renderConfig(plan, pkg.name, mainStyle),
  }));
  if (dryRun) {
    for (const { plan, config } of rendered) {
      console.log(
        `${pkg.name}: ${plan.sourceDir}/ -> ${TEMPLATE_DIR}/${plan.id}/`,
      );
      console.log(config);
    }
    return;
  }
  const templates: Record<string, { name: string; source: string }> = {};
  for (const { plan, config } of rendered) {
    const target = path.join(packageDir, TEMPLATE_DIR, plan.id);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.renameSync(path.join(packageDir, plan.sourceDir), target);
    for (const file of escapeHandlebars(target)) {
      console.log(
        `${pkg.name}: escaped {{ in ${path.relative(packageDir, file)}`,
      );
    }
    fs.writeFileSync(path.join(target, CONFIG_FILE), config);
    templates[plan.id] = {
      name: plan.name,
      source: `./${TEMPLATE_DIR}/${plan.id}`,
    };
  }
  const exampleDir = path.join(packageDir, EXAMPLE_DIR);
  if (fs.existsSync(exampleDir) && fs.readdirSync(exampleDir).length === 0) {
    fs.rmdirSync(exampleDir);
  }
  rewriteConfigPaths(packageDir, plans);
  if (pkg.files) {
    pkg.files = [
      ...new Set(
        pkg.files.map((file) => (file === EXAMPLE_DIR ? TEMPLATE_DIR : file)),
      ),
    ];
  }
  pkg.vivliostyle = { ...pkg.vivliostyle, template: templates };
  writePackageJson(packageDir, pkg);
  console.log(`${pkg.name}: ${Object.keys(templates).join(', ')}`);
}

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { 'dry-run': { type: 'boolean', default: false } },
});
if (positionals.length === 0) {
  console.error(
    'Usage: node scripts/example-to-template.ts [--dry-run] <package-dir>...',
  );
  process.exit(1);
}
for (const packageDir of positionals) {
  await convert(packageDir, values['dry-run']);
}
