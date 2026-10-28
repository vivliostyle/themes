---
"@vivliostyle/theme-base": patch
---

Fix `pre` ignoring the `--vs--monospace-*` variables. `--vs--pre-font-family`, `--vs--pre-font-size`, `--vs--pre-line-height` and `--vs--pre-word-break` now fall back to the matching `--vs--monospace-*` variable.
