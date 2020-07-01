#!/usr/bin/env node

import { program } from 'commander';

import preview from './preview';
import validate from './validate';

program.addCommand(preview());
program.addCommand(validate());

program.parse(process.argv);
