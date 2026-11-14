---
"@vivliostyle/theme-base": patch
---

Keep the `--vs--pre-*` variables and a theme's `pre {}` working on code blocks when the `prism` module is loaded. The `--vs--pre-*` variables now take precedence over their `--vs-prism--*` counterparts.
