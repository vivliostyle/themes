import fs from 'node:fs';
import path from 'node:path';

export interface ThemeI18n {
  name?: string;
  description?: string;
}

export interface ThemeTemplate {
  name?: string;
  description?: string;
  source: string;
  [key: string]: unknown;
}

export interface ThemePackageJson {
  [key: string]: unknown;
  name: string;
  author?: string | { name?: string; email?: string };
  description?: string;
  style?: string;
  main?: string;
  files?: string[];
  vivliostyle?: {
    [key: string]: unknown;
    theme?: {
      [key: string]: unknown;
      name?: string;
      author?: string;
      style?: string;
      category?: string;
      topics?: string[];
      i18n?: Record<string, ThemeI18n>;
    };
    template?: Record<string, ThemeTemplate>;
  };
}

export interface VocabularyTerm {
  id: string;
  label: Record<string, string>;
  aliases: string[];
}

export interface Vocabulary {
  version: number;
  facets: {
    id: string;
    label: Record<string, string>;
    terms: VocabularyTerm[];
  }[];
}

export const ROOT = path.join(import.meta.dirname, '..');
export const PACKAGES_DIR = path.join(ROOT, 'packages/@vivliostyle');

// Keep in sync with THEME_CATEGORIES of vivliostyle-cli, which validates the
// category of themes it scaffolds against this list.
export const CATEGORIES = ['novel', 'magazine', 'journal', 'report', 'misc'];

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function readPackageJson(packageDir: string): ThemePackageJson {
  const manifestPath = path.join(packageDir, 'package.json');
  const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!isRecord(parsed) || typeof parsed.name !== 'string') {
    throw new Error(`${manifestPath} has no name field`);
  }
  return { ...parsed, name: parsed.name };
}

export function writePackageJson(
  packageDir: string,
  pkg: ThemePackageJson,
): void {
  fs.writeFileSync(
    path.join(packageDir, 'package.json'),
    `${JSON.stringify(pkg, null, 2)}\n`,
  );
}

export function listThemePackages(): string[] {
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

export function readVocabulary(): Vocabulary {
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
export function normalizeTopic(value: string): string {
  return value.normalize('NFKC').trim().toLowerCase().replaceAll(/\s+/gv, '-');
}

export function indexVocabulary(vocabulary: Vocabulary): Map<string, string> {
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
