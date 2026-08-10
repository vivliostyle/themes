---
"@vivliostyle/theme-base": patch
---

Changed the default of `--vs-accent-color` from `inherit` to `currentColor`, fixing anchors and `a[data-ref]` references rendering in the UA link blue.

Vivliostyle fails to resolve a CSS-wide keyword that reaches a property through two or more levels of `var()` substitution (`--vs-accent-color: inherit` → `--vs--anchor-text-color: var(--vs-accent-color)` → `color: var(--vs--anchor-text-color)`); the whole `color` declaration is discarded and the UA stylesheet's link color wins. `currentColor` passes through nested `var()` chains correctly and computes to the inherited text color, which is what the `inherit` default always intended. Affects `--vs--anchor-text-color` and `--vs--lists-marker-text-color`.
