---
"@vivliostyle/theme-base": patch
---

Fixed the default `--vs-*--call-content` of figure, table, listing, theorem, equation and appendix rendering as empty in Vivliostyle.

Vivliostyle drops the whole `content` declaration when a `var()` with an empty fallback (`var(--vs-crossref-call-counter-prefix,)`) substitutes to nothing in the same value as a `target-counter()`; `counter()`-based marker contents are unaffected, so captions were numbered while every in-text call stayed blank. The counter-prefix references in the default contents now fall back to an empty string (`var(--vs-crossref-call-counter-prefix, '')`), which substitutes to a valid token and leaves the rendering unchanged once a theme opts into the prefix.
