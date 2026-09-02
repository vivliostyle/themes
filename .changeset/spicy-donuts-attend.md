---
"@vivliostyle/theme-base": major
---

Added the `css/lib/sidenote` module and turned the math styles into the `css/lib/math` module.

`css/lib/sidenote` floats elements with `class="sidenote"` to the inline-end side of the text and numbers them with the `vs-counter-sidenote` counter; an empty in-text call `<a data-ref="sidenote" href="#note-id"></a>` is filled with the number of the note it links to. The float position, size and gap are plain CSS variables (`--vs-sidenote--float`, `--vs-sidenote--size-inline`, `--vs-sidenote--margin-inline`), so a theme can pull the notes into the page margin or stack them in a reserved band.

`css/lib/math` carries the styles for VFM's `$…$` math output (both the `mathml` and `mathjax` renderers) that used to live in the basic stylesheet: the math font stack, display math centering and page-break control, and temml `\tag{}` number placement.

BREAKING CHANGE: Math is no longer styled by the basic stylesheet — import `css/lib/math` to keep it — and the `--vs--math-*` variables are renamed to `--vs-math--*`:

```css
@import url(@vivliostyle/theme-base/css/lib/math);

:root {
  /* Before: --vs--math-display-margin-block, --vs--math-font-family, … */
  --vs-math--display-margin-block: 1rem;
  --vs-math--font-family: 'Latin Modern Math', math;
}
```
