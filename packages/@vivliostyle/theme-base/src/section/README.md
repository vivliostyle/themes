# Section

Styles about heading counters and section references.

```css
@import '@vivliostyle/theme-base/section';

/* Configuration examples */
:root {
  --vs-section--marker-display: inline;
  --vs-section--call-content: 'Sec. ' target-counters(attr(href), vs-counter-sections, '.');
}
```

- Name of CSS variable starts with `--vs-section--`
