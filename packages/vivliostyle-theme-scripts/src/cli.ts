#!/usr/bin/env node

import { program } from 'commander';

import preview from './commands/preview';
import validate from './commands/validate';

program.addCommand(preview());
program.addCommand(validate());

program.parse(process.argv);
