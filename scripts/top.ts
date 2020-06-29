#!/usr/bin/env node
// Table of Packages (ToP)

import fs from 'fs';
import {join} from 'path';
import globby from 'globby';
import fetch from 'node-fetch';

function isTheme(pkg: any): boolean {
  return pkg?.vivliostyle?.theme ?? pkg?.style ?? pkg?.main?.endsWith('.css');
}

function getTitle(pkg: any) {
  return pkg.meta?.vivliostyle?.theme?.name || pkg.meta?.name;
}

function getAuthor(pkg: any) {
  return pkg.meta?.vivliostyle?.theme?.author || pkg.meta.author;
}

function badge(name: string) {
  return `[![](https://img.shields.io/npm/v/${name}.svg)](https://npmjs.com/package/${name})
[![npm: total downloads](https://flat.badgen.net/npm/dt/${name})](https://npmjs.com/package/${name})`;
}

function descFirst(a: any, b: any) {
  return b[0] - a[0];
}

async function downloadCount(pkgName: string) {
  const {downloads} = await fetch(
    `https://api.npmjs.org/downloads/point/last-month/${pkgName}`,
  ).then((res) => res.json());
  return downloads as number;
}

async function createToP(): Promise<string> {
  const packages = (await globby(['packages/*'], {onlyDirectories: true})).map(
    (p) => ({
      path: p,
      meta: JSON.parse(fs.readFileSync(join(p, 'package.json'), 'utf8')),
    }),
  );
  const tools = packages.filter((pkg) => !isTheme(pkg.meta));
  const themes = packages.filter((pkg) => isTheme(pkg.meta));

  const themesWithDL = await Promise.all(
    themes.map(
      async (theme) =>
        [(await downloadCount(theme.meta.name)) || 0, theme] as const,
    ),
  );

  const themeTable = themesWithDL
    .sort(descFirst)
    .map(([, pkg]) => {
      const title = getTitle(pkg);
      const author = getAuthor(pkg);
      const {
        path,
        meta: {name, description},
      } = pkg;

      return `### [${title}](${path})

${description}

${badge(name)}

\`\`\`bash
npm install --save ${pkg.meta.name}
# or
yarn add ${pkg.meta.name}
\`\`\`

> original author: \`${author}\``;
    })
    .join('\n\n');

  const toolsTable = tools
    .map(
      (pkg) => `### [${pkg.meta.name}](${pkg.path})

${pkg.meta.description}`,
    )
    .join('\n\n');
  return `## Official Themes

${themeTable}

## Tools

${toolsTable}`;
}

async function main() {
  const top = await createToP();
  const md = fs.readFileSync('README.md', 'utf8');
  const newMd = md.replace(
    /<!-- START top([\w\W]+?)<!-- END top.*\n/m,
    `<!-- START top -->

${top}

<!-- END top -->\n`,
  );
  fs.writeFileSync('README.md', newMd);
}

main();
