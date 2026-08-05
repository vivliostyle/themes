#!/usr/bin/env node
// Table of Packages (ToP)

import fs from 'node:fs';
import { join } from 'node:path';

interface PackageJson {
  [index: string]: unknown;
  name: string;
  author?: string;
  description?: string;
  style?: string;
  main?: string;
  vivliostyle?: {
    theme?: {
      name?: string;
      author?: string;
      style?: string;
    };
  };
}

interface Package {
  path: string;
  meta: PackageJson;
}

function isTheme(pkg: PackageJson): boolean {
  return (
    typeof pkg?.vivliostyle?.theme?.style === 'string' ||
    pkg?.style?.endsWith('.css') === true ||
    pkg?.main?.endsWith('.css') === true
  );
}

function getTitle(pkg: Package): string {
  return pkg.meta?.vivliostyle?.theme?.name || pkg.meta?.name;
}

function getAuthor(pkg: Package): string | undefined {
  return pkg.meta?.vivliostyle?.theme?.author || pkg.meta.author;
}

function badge(name: string): string {
  return `[![](https://img.shields.io/npm/v/${name}.svg)](https://npmjs.com/package/${name})
[![npm: total downloads](https://flat.badgen.net/npm/dt/${name})](https://npmjs.com/package/${name})
![npm: license](https://flat.badgen.net/npm/license/${name})`;
}

function descFirst<T extends readonly [number, unknown]>(a: T, b: T) {
  return b[0] - a[0];
}

function listDirs(root: string): string[] {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(root, entry.name))
    .toSorted();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function downloadCount(pkgName: string): Promise<number> {
  const res = await fetch(
    `https://api.npmjs.org/downloads/point/last-month/${pkgName}`,
  );
  const body: unknown = await res.json();
  if (!isRecord(body) || typeof body.downloads !== 'number') {
    return 0;
  }
  return body.downloads;
}

function readPackageJson(dir: string): PackageJson {
  const manifestPath = join(dir, 'package.json');
  const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!isRecord(parsed) || typeof parsed.name !== 'string') {
    throw new Error(`${manifestPath} has no name field`);
  }
  return { ...parsed, name: parsed.name };
}

async function createToP(): Promise<string> {
  const packages: Package[] = listDirs('packages')
    .flatMap((p) => (p.endsWith('@vivliostyle') ? listDirs(p) : [p]))
    .map((p) => ({
      path: p,
      meta: readPackageJson(p),
    }));
  console.log(packages.map((pkg) => [pkg.meta.name, pkg.path]));
  const tools = packages.filter((pkg) => !isTheme(pkg.meta));
  const themes = packages.filter((pkg) => isTheme(pkg.meta));

  const themesWithDL = await Promise.all(
    themes.map(
      async (theme) =>
        [(await downloadCount(theme.meta.name)) || 0, theme] as const,
    ),
  );

  const themeTable = themesWithDL
    .toSorted(descFirst)
    .map(([, pkg]) => {
      const title = getTitle(pkg);
      const author = getAuthor(pkg);
      const {
        path,
        meta: { name, description },
      } = pkg;

      return `### [${title}](${path})

${description}

${badge(name)}

\`\`\`js
module.exports = {
  theme: '${pkg.meta.name}',
};
\`\`\`

${author && `> original author: \`${author}\``}`;
    })
    .join('\n\n');

  const toolsTable = tools
    .map(
      (pkg) => `### [${pkg.meta.name}](${pkg.path})

${badge(pkg.meta.name)}

${pkg.meta.description}`,
    )
    .join('\n\n');
  return `## Official Themes

${themeTable}

## Tools

${toolsTable}`;
}

const top = await createToP();
const md = fs.readFileSync('README.md', 'utf8');
const newMd = md.replace(
  /<!-- START top([\w\W]+?)<!-- END top.*\n/mv,
  `<!-- START top -->

${top}

<!-- END top -->\n`,
);
fs.writeFileSync('README.md', newMd);
