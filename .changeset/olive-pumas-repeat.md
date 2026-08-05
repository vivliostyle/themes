---
'@vivliostyle/theme-academic': patch
'@vivliostyle/theme-base': patch
'@vivliostyle/theme-bunko': patch
'@vivliostyle/theme-epub3j': patch
'@vivliostyle/theme-gutenberg': patch
'@vivliostyle/theme-slide': patch
'@vivliostyle/theme-techbook': patch
'create-vivliostyle-theme': patch
'vivliostyle-theme-scripts': patch
---

Modernize the internal code. The packages are now ESM, and `vivliostyle.config.js` is written with `defineConfig` from `@vivliostyle/cli`. The published styles and CLI behavior are unchanged.
