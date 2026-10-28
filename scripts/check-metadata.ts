#!/usr/bin/env node
// Checks the metadata of the official themes against docs/spec.md, beyond
// what `vivliostyle theme validate` checks.
//   node scripts/check-metadata.ts [<package-dir>...]

import fs from 'node:fs';
import path from 'node:path';

interface ThemePackageJson {
  name: string;
  description?: string;
  files?: string[];
  vivliostyle?: {
    theme?: {
      author?: string;
      category?: string;
      topics?: string[];
      i18n?: Record<string, unknown>;
    };
    template?: Record<string, { source: string }>;
  };
}

interface VocabularyTerm {
  id: string;
  label: Record<string, string>;
  aliases: string[];
}

interface Vocabulary {
  version: number;
  facets: {
    id: string;
    label: Record<string, string>;
    terms: VocabularyTerm[];
  }[];
}

const ROOT = path.join(import.meta.dirname, '..');
const PACKAGES_DIR = path.join(ROOT, 'packages/@vivliostyle');

// Keep in sync with THEME_CATEGORIES of vivliostyle-cli, which validates the
// category of themes it scaffolds against this list.
const CATEGORIES = ['novel', 'magazine', 'journal', 'report', 'misc'];

const TOPIC = /^[a-z0-9]+(?:-[a-z0-9]+)*$/v;
const JAPANESE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/v;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readPackageJson(packageDir: string): ThemePackageJson {
  const manifestPath = path.join(packageDir, 'package.json');
  const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!isRecord(parsed) || typeof parsed.name !== 'string') {
    throw new Error(`${manifestPath} has no name field`);
  }
  return { ...parsed, name: parsed.name };
}

function listThemePackages(): string[] {
  return fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('theme-'))
    .map((entry) => path.join(PACKAGES_DIR, entry.name))
    .toSorted();
}

function isLabel(value: unknown): value is Record<string, string> {
  return (
    isRecord(value) &&
    typeof value.en === 'string' &&
    typeof value.ja === 'string' &&
    Object.values(value).every((label) => typeof label === 'string')
  );
}

function isTerm(value: unknown): value is VocabularyTerm {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    isLabel(value.label) &&
    Array.isArray(value.aliases) &&
    value.aliases.every((alias: unknown) => typeof alias === 'string')
  );
}

function readVocabulary(): Vocabulary {
  const parsed: unknown = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'vocabulary/topics.json'), 'utf8'),
  );
  if (
    !isRecord(parsed) ||
    typeof parsed.version !== 'number' ||
    !Array.isArray(parsed.facets)
  ) {
    throw new Error('vocabulary/topics.json has no version or facets');
  }
  const facets = parsed.facets.map((facet: unknown) => {
    if (
      !isRecord(facet) ||
      typeof facet.id !== 'string' ||
      !isLabel(facet.label) ||
      !Array.isArray(facet.terms) ||
      !facet.terms.every((term: unknown) => isTerm(term))
    ) {
      throw new Error(`Invalid facet in vocabulary/topics.json`);
    }
    return { id: facet.id, label: facet.label, terms: facet.terms };
  });
  return { version: parsed.version, facets };
}

/** The same normalization as theme.vivliostyle.org applies to topics. */
function normalizeTopic(value: string): string {
  return value.normalize('NFKC').trim().toLowerCase().replaceAll(/\s+/gv, '-');
}

function indexVocabulary(vocabulary: Vocabulary): Map<string, string> {
  const index = new Map<string, string>();
  const ids = new Set<string>();
  for (const facet of vocabulary.facets) {
    for (const term of facet.terms) {
      if (ids.has(term.id)) {
        throw new Error(`The id of ${facet.id}:${term.id} is used twice`);
      }
      ids.add(term.id);
      for (const alias of [term.id, ...term.aliases]) {
        const key = normalizeTopic(alias);
        const existing = index.get(key);
        if (existing !== undefined && existing !== term.id) {
          throw new Error(
            `"${alias}" of ${facet.id}:${term.id} is also used by ${existing}`,
          );
        }
        index.set(key, term.id);
      }
    }
  }
  return index;
}

function check(packageDir: string, topicIndex: Map<string, string>): string[] {
  const pkg = readPackageJson(packageDir);
  const theme = pkg.vivliostyle?.theme;
  if (!theme) {
    return ['`vivliostyle.theme` is missing'];
  }
  const problems: string[] = [];

  if (!theme.author) {
    problems.push('`vivliostyle.theme.author` is missing');
  }

  if (theme.category !== undefined && !CATEGORIES.includes(theme.category)) {
    problems.push(
      `category "${theme.category}" is not one of ${CATEGORIES.join(', ')}`,
    );
  }

  if (pkg.description && JAPANESE.test(pkg.description)) {
    problems.push(
      '`description` should be in English; put the Japanese one in `vivliostyle.theme.i18n.ja.description`',
    );
  }
  for (const [locale, texts] of Object.entries(theme.i18n ?? {})) {
    if (
      !isRecord(texts) ||
      Object.values(texts).some((text) => typeof text !== 'string')
    ) {
      problems.push(
        `\`vivliostyle.theme.i18n.${locale}\` has non-string values`,
      );
    }
  }

  const topics = theme.topics ?? [];
  const normalized = [
    ...new Set(
      topics.map((topic) => {
        const key = normalizeTopic(topic);
        return topicIndex.get(key) ?? key;
      }),
    ),
  ];
  if (normalized.join('\n') !== topics.join('\n')) {
    problems.push(`topics should be written as ${JSON.stringify(normalized)}`);
  }
  for (const topic of normalized) {
    if (!TOPIC.test(topic)) {
      problems.push(
        `topic "${topic}" should be in lowercase kebab-case English`,
      );
    }
  }

  for (const [id, template] of Object.entries(
    pkg.vivliostyle?.template ?? {},
  )) {
    if (!template.source.startsWith('./')) {
      continue;
    }
    const dir = path.resolve(packageDir, template.source);
    if (
      !dir.startsWith(`${packageDir}${path.sep}`) ||
      !fs.existsSync(dir) ||
      !fs.statSync(dir).isDirectory()
    ) {
      problems.push(`template "${id}": ${template.source} is not a directory`);
      continue;
    }
    const [top] = path.relative(packageDir, dir).split(path.sep);
    if (pkg.files && !pkg.files.includes(top)) {
      problems.push(`template "${id}": "${top}" is missing in \`files\``);
    }
  }

  return problems;
}

const topicIndex = indexVocabulary(readVocabulary());
const args = process.argv.slice(2);
const packages =
  args.length > 0 ? args.map((dir) => path.resolve(dir)) : listThemePackages();
let failed = false;
for (const packageDir of packages) {
  const problems = check(packageDir, topicIndex);
  for (const problem of problems) {
    console.error(`${path.basename(packageDir)}: ${problem}`);
  }
  failed ||= problems.length > 0;
}
if (failed) {
  process.exitCode = 1;
} else {
  console.log(`Checked ${packages.length} themes`);
}
