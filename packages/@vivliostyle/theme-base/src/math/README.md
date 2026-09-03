# Math

Styles for math output of VFM's `$…$` syntax, covering both the `mathml` (temml) and `mathjax` renderers: a math font stack, display math centering and page-break control, and `\tag{}` number placement.

```css
@import '@vivliostyle/theme-base/math';

/* Configuration examples */
:root {
  --vs-math--font-family: 'Latin Modern Math', math;
  --vs-math--display-margin-block: 1rem;
}
```

- Name of CSS variable starts with `--vs-math--`
