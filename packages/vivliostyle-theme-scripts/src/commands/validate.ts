import { join } from 'node:path';

import chalk from 'chalk';
import { Command } from 'commander';

import { validatePackage } from '../index.js';

function validate(): void {
  const pkgJsonPath = join(process.cwd(), 'package.json');
  const result = validatePackage(pkgJsonPath);
  if (result.length === 0) {
    console.log(chalk.bold.blue('Your package is valid'));
    return;
  }

  for (const res of result) {
    const label =
      res.type === 'error' ? chalk.red('[error]') : chalk.yellow('[warning]');
    console.log(`${label} ${res.message}`);
  }

  if (result.some((res) => res.type === 'error')) {
    process.exit(1);
  }
}

export default function makeCommand(): InstanceType<typeof Command> {
  const command = new Command('validate');
  command.description('validate package.json').action(validate);
  return command;
}
