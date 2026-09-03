# Table

Table numbering and cross-references.

```css
@import '@vivliostyle/theme-base/table';

/* Configuration examples */
:root {
  --vs-table--counter-style: upper-roman;
  --vs-table--marker-display: none;
}
```

- A table with a `<caption>` counts `vs-counter-tbl` and prefixes the caption with the resolved number
- An empty in-text call `<a data-ref="tbl" href="#id"></a>` is filled with the resolved number
- A Markdown table (or any block) without a `<caption>` can be numbered by placing a `<p class="tbl-caption">` paragraph next to it
- Name of CSS variable starts with `--vs-table--`

The shared cross-reference settings (numbering style, chapter prefixes, anchor treatment, the `:lang(ja)` defaults) are part of the basic stylesheet. See the [package README](../../README.md#cross-reference).
