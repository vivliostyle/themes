---
"@vivliostyle/theme-base": patch
---

Fix `pre > code` applying the `--vs--monospace-*` variables on top of `pre`. The code in a code block now inherits its typography from `pre`, so a relative `--vs--monospace-font-size` is no longer applied twice and the `--vs--pre-*` variables reach the code text.
