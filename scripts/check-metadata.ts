#!/usr/bin/env node
// Checks the metadata of the official themes against docs/spec.md, beyond
// what `vivliostyle theme validate` checks.
//   node scripts/check-metadata.ts [--fix] [<package-dir>...]
//
// --fix rewrites topics to the ids of the vocabulary, fills in
// `vivliostyle.theme.author` and copies a Japanese description to
// `vivliostyle.theme.i18n.ja`. English descriptions have to be written by hand.

import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

import {
  CATEGORIES,
  indexVocabulary,
  listThemePackages,
  normalizeTopic,
  readPackageJson,
  readVocabulary,
  writePackageJson,
  type ThemePackageJson,
} from './theme-metadata.ts';

const TOPIC = /^[a-z0-9]+(?:-[a-z0-9]+)*$/v;
const JAPANESE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/v;

function formatAuthor(author: ThemePackageJson['author']): string | undefined {
  if (typeof author === 'string' || author === undefined) {
    return author;
  }
  return author.email ? `${author.name} <${author.email}>` : author.name;
}

function check(
  packageDir: string,
  topicIndex: Map<string, string>,
  fix: boolean,
): string[] {
  const pkg = readPackageJson(packageDir);
  const theme = pkg.vivliostyle?.theme;
  if (!theme) {
    return ['`vivliostyle.theme` is missing'];
  }
  const problems: string[] = [];
  let changed = false;

  const author = theme.author ? undefined : formatAuthor(pkg.author);
  if (!theme.author && !(fix && author)) {
    problems.push('`vivliostyle.theme.author` is missing');
  }

  if (theme.category !== undefined && !CATEGORIES.includes(theme.category)) {
    problems.push(
      `category "${theme.category}" is not one of ${CATEGORIES.join(', ')}`,
    );
  }

  if (pkg.description && JAPANESE.test(pkg.description)) {
    if (fix && !theme.i18n?.ja?.description) {
      theme.i18n = {
        ...theme.i18n,
        ja: { ...theme.i18n?.ja, description: pkg.description },
      };
      changed = true;
    }
    problems.push(
      '`description` should be in English; put the Japanese one in `vivliostyle.theme.i18n.ja.description`',
    );
  }
  for (const [locale, texts] of Object.entries(theme.i18n ?? {})) {
    if (
      typeof texts !== 'object' ||
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
    if (fix) {
      theme.topics = normalized;
      changed = true;
    } else {
      problems.push(
        `topics should be written as ${JSON.stringify(normalized)}`,
      );
    }
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

  if (fix && author) {
    const { name, ...rest } = theme;
    pkg.vivliostyle = {
      ...pkg.vivliostyle,
      theme: { ...(name !== undefined && { name }), author, ...rest },
    };
    changed = true;
  }
  if (changed) {
    writePackageJson(packageDir, pkg);
  }
  return problems;
}

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { fix: { type: 'boolean', default: false } },
});
const topicIndex = indexVocabulary(readVocabulary());
const packages =
  positionals.length > 0
    ? positionals.map((dir) => path.resolve(dir))
    : listThemePackages();
let failed = false;
for (const packageDir of packages) {
  const problems = check(packageDir, topicIndex, values.fix);
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
