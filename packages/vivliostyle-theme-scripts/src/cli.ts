#!/usr/bin/env node

import { program } from 'commander';

import preview from './commands/preview.js';
import validate from './commands/validate.js';

program.addCommand(preview());
program.addCommand(validate());

program.parse(process.argv);
