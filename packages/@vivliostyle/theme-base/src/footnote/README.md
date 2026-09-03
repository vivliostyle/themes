# Footnote

Styles about footnotes.

```css
@import '@vivliostyle/theme-base/footnote';
/* Turn external links into footnotes as well */
@import '@vivliostyle/theme-base/footnote/external-links';

/* Configuration examples */
:root {
  --vs-footnote--call-content: '[' counter(vs-counter-footnote) ']';
  --vs-footnote--area-before-margin-inline: 0 80%;
}
```

- Name of CSS variable starts with `--vs-footnote--`
- [**footnote/external-links**](external-links.css) adds footnotes for external links so that their URLs can be recognized on print media
