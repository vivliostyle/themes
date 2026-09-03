# Figure

Figure numbering and cross-references.

```css
@import '@vivliostyle/theme-base/figure';

/* Configuration examples */
:root {
  --vs-figure--counter-style: upper-roman;
  --vs-figure--marker-display: none;
}
```

- A figure with a caption counts `vs-counter-fig` and prefixes the caption with the resolved number
- An empty in-text call `<a data-ref="fig" href="#id"></a>` is filled with the resolved number
- A Markdown image (or any block) without a caption can be numbered by placing a `<p class="fig-caption">` paragraph next to it
- Name of CSS variable starts with `--vs-figure--`

The shared cross-reference settings (numbering style, chapter prefixes, anchor treatment, the `:lang(ja)` defaults) are part of the basic stylesheet. See the [package README](../../README.md#cross-reference).
