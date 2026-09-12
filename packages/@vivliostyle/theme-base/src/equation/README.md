# Equation

Equation numbering and cross-references.

```css
@import '@vivliostyle/theme-base/equation';

/* Configuration examples */
:root {
  --vs-equation--counter-style: decimal;
}
```

- Equations wrapped in `<div class="equation">…</div>` count `vs-counter-eq` and get a number at the inline-end (`--vs-equation--marker-content`); the row is laid out with flex because grid cannot split across pages
- An empty in-text call `<a data-ref="eq" href="#id"></a>` is filled with the resolved number
- Name of CSS variable starts with `--vs-equation--`

The shared cross-reference settings (numbering style, chapter prefixes, anchor treatment, the `:lang(ja)` defaults) are part of the basic stylesheet. See the [package README](../../README.md#cross-reference).
