---
"@vivliostyle/theme-base": major
---

Fixed the resetting behavior for `vs-counter-sec-*` counters. These are now reset by parent sections.

BREAKING CHANGE: If your theme relies on the previous behavior of `vs-counter-sec-*`, you must define custom counters manually:

```css
/* Create custom counters `non-reset-* */
:root {
  --vs-document-root-counter-reset: non-reset-h1 non-reset-h2 non-reset-h3;
  --vs-section--h2-marker-content: counter(non-reset-h2);
  --vs-section--h3-marker-content: counter(non-reset-h2) '.' counter(non-reset-h3);
}
/* Override the default counter-increment */
section:has(> h2:first-child) {
  counter-increment: vs-counter-sections vs-counter-sec-h2 non-reset-h2;
}
section:has(> h3:first-child) {
  counter-increment: vs-counter-sections vs-counter-sec-h3 non-reset-h3;
}
```
