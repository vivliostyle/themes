---
"@vivliostyle/theme-base": patch
---

Lower the specificity of the theorem label and of the external link footnotes, so that a theme can override them with `.theorem::before` or `a[href^='http']`. The conditions that choose where the theorem label goes, and the `:not(.footnote)` that skips the links inside footnotes, now sit in `:where()`.
