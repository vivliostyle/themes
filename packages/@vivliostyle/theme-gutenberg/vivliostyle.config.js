// @ts-check
import { defineConfig } from '@vivliostyle/cli';

import alice from './config/alice/vivliostyle.config.js';
import fang from './config/fang/vivliostyle.config.js';
import sherlock from './config/sherlock/vivliostyle.config.js';

export default defineConfig([alice, fang, sherlock]);
