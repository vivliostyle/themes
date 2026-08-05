#!/usr/bin/env node

import { resolve } from 'node:path';

import chalk from 'chalk';
// create-create-app reads `require.main.filename`, so this entry point stays
// CommonJS even though the package itself is ESM.
import { type AfterHookOptions, create } from 'create-create-app';

const templateRoot = resolve(__dirname, '../templates');

const caveat = ({ name }: AfterHookOptions) => `
${chalk.gray('1.')} cd ${chalk.bold.green(name)}
${chalk.gray('2.')} edit ${chalk.bold.green('theme.css')}
${chalk.gray('3.')} publish to npm (${chalk.cyan('$ npm publish')})
`;

void create('create-vivliostyle-theme', {
  templateRoot,
  extra: {
    category: {
      type: 'list',
      describe: 'choose category',
      // sync with DESIGN.md
      choices: ['novel', 'magazine', 'journal', 'report', 'misc'],
    },
  },
  caveat,
  modifyName: (name) => `vivliostyle-theme-${name}`,
});
