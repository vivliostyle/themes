#!/usr/bin/env node

import chalk from 'chalk';
import {AfterHookOptions, create} from 'create-whatever';
import {resolve} from 'path';

const templateRoot = resolve(__dirname, '../templates');

const caveat = ({name}: AfterHookOptions) => `
${chalk.gray('1.')} cd ${chalk.bold.green(name)}
${chalk.gray('2.')} edit ${chalk.bold.green('theme.css')}
${chalk.gray('3.')} publish to npm (${chalk.cyan('$ npm publish')})
`;

create('create-vivliostyle-theme', {
  templateRoot,
  caveat,
});
