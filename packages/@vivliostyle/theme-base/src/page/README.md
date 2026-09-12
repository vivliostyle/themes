# Page

Styles about paged media.

```css
@import '@vivliostyle/theme-base/page';

/* Configuration examples */
:root {
  --vs-page--mbox-bottom-center-content: counter(page);
  /*
   * Vivliostyle.js provides env(doc-title) and env(pub-title)
   * https://docs.vivliostyle.org/#/supported-css-features#values
   */
  --vs-page--mbox-top-left-content: env(doc-title);
  --vs-page--mbox-top-right-content: string(section-title);
  /* `inside` / `outside` resolve to left or right depending on the page side */
  --vs-page--mbox-bottom-outside-content: counter(page);
}
/*
 * Setting named string
 * https://www.w3.org/TR/css-gcpm-3/#named-strings
 */
h1 {
  string-set: section-title content();
}
```

- Name of CSS variable starts with `--vs-page--`
- The margin-box `content` variables accept `inside` / `outside` in place of `left` / `right` (`--vs-page--mbox-bottom-outside-content`, `--vs-page--mbox-top-inside-corner-content`, `--vs-page--mbox-outside-middle-content`, …), which resolve to the physical box depending on the page side. The physical variable (e.g. `--vs-page--mbox-bottom-left-content`) takes precedence when both are set
- Page references ship with this module: an empty in-text call `<a data-ref="page" href="#id"></a>` resolves to the page number of the target (`target-counter(attr(href), page)`)
