# Citation

Citation numbering and cross-references.

```css
@import '@vivliostyle/theme-base/citation';

/* Configuration examples */
:root {
  --vs-citation--marker-content: counter(vs-counter-cite) '.';
}
```

- Bibliography entries (list items in `ol.cite-items` or a `role="doc-bibliography"` section) count `vs-counter-cite` and are prefixed with the resolved number
- An empty in-text call `<a data-ref="cite" href="#id"></a>` is filled with the resolved number
- Name of CSS variable starts with `--vs-citation--`

The shared cross-reference settings (numbering style, chapter prefixes, anchor treatment, the `:lang(ja)` defaults) are part of the basic stylesheet. See the [package README](../../README.md#cross-reference).
