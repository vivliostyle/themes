import { Command } from 'commander';
import chalk from 'chalk';
import { join } from 'path';
import { validatePackage } from '..';

async function validate() {
  const pkgJsonPath = join(process.cwd(), 'package.json');
  const result = validatePackage(pkgJsonPath);
  if (result.length > 0) {
    result.map((res) =>
      console.log(
        `${
          res.type === 'error'
            ? chalk.red('[error]')
            : chalk.yellow('[warning]')
        } ${res.message}`,
      ),
    );

    if (result.some((res) => res.type === 'error')) {
      process.exit(1);
    }
  } else {
    console.log(chalk.bold.blue('Your package is valid'));
  }
}

export default function makeCommand() {
  const command = new Command('validate');
  command.description('validate package.json').action(validate);
  return command;
}
