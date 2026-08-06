// @ts-check
import { defineConfig } from '@vivliostyle/cli';

import alice from './config/alice/vivliostyle.config.js';
import fang from './config/fang/vivliostyle.config.js';
import sherlock from './config/sherlock/vivliostyle.config.js';

// defineConfig returns BuildTask | BuildTask[], so flatten before nesting the
// per-book configs into one array.
export default defineConfig([alice, fang, sherlock].flat());
