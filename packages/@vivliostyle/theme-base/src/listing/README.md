# Listing

Code listing numbering and cross-references.

```css
@import '@vivliostyle/theme-base/listing';

/* Configuration examples */
:root {
  --vs-listing--counter-style: decimal-leading-zero;
  --vs-listing--marker-display: none;
}
```

- A captioned code fence (VFM's `lang:title` syntax renders it as `figure > figcaption + pre`) or a `figure.lst` counts `vs-counter-lst` and prefixes the caption with `--vs-listing--marker-content` ("Listing N: "); hide it with `--vs-listing--marker-display: none`
- An empty in-text call `<a data-ref="lst" href="#id"></a>` is filled with the resolved number
- A code block without a caption can be numbered by placing a `<p class="lst-caption">` paragraph next to it
- Name of CSS variable starts with `--vs-listing--`

The shared cross-reference settings (numbering style, chapter prefixes, anchor treatment, the `:lang(ja)` defaults) are part of the basic stylesheet. See the [package README](../../README.md#cross-reference).
