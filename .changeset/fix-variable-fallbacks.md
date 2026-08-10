---
"@vivliostyle/theme-base": patch
---

Fixed broken variable fallback chains.

- `--vs-footnote--font-stretch` fell back to itself, so `--vs-font-stretch` was never applied to footnotes. It now falls back to `--vs-font-stretch`.
- The `text-spacing` of `h3` fell back to `--vs--heading-letter-spacing` instead of `--vs--heading-text-spacing`.
- The screen-only placeholder for `a[data-ref='cite']::before` (`[???]`) was defined but never referenced, so cross-references to citations rendered nothing on screen media.
