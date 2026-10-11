---
"@vivliostyle/theme-base": patch
---

Fixed `pre` inheriting its parent's font and line height instead of the monospace ones. `--vs--pre-font-family` and `--vs--pre-line-height` had no defaults, so the `pre` rule overrode the monospace values of the earlier `code, kbd, pre, samp` rule. They now default to `--vs--monospace-font-family` and `--vs--monospace-line-height`.
