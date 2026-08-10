---
"@vivliostyle/theme-base": major
"@vivliostyle/theme-techbook": patch
---

Filled the gaps in the element variables and removed the defaults that could not be overridden.

The additions come from migrating a large set of designs onto the theme and recording what still had to be written as a plain selector.

#### Declarations that ignored what you wrote

- **List indentation.** The top level of `ul` / `ol` was set with `max(var(--vs--ul-padding-inline-start), var(--vs--ul-minimum-inline-indent-size))`. Neither variable had a default, so the whole declaration was dropped and top-level lists were laid out with no indent at all, their markers hanging outside the text block. A value smaller than the minimum was silently clamped, and a unitless `0` invalidated the `max()`. The indent is now `--vs--ul-padding-inline-start` / `--vs--ol-padding-inline-start` on its own, falling back to `--vs--lists-padding-inline-start` (default `2rem`).
- **Table rules.** `tr:not(:last-child)` and `th:not(:last-child), td:not(:last-child)` outrank a plain `th, td { border-width }`, so rules written in a theme never took effect. Those selectors are now wrapped in `:where()`.
- **Figure contents.** `figure > :not(:is(picture, figcaption))` applied `padding-inline: min(2ch, 5vw)` to every child, including `pre`, `div` and `table`, and combined with `box-sizing: border-box` it changed the used size of an image given an explicit width. It now matches replaced elements only, and `--vs--figure-item-padding-inline` defaults to `0`.
- **Heading typeface.** `b`, `strong` and `th` fell back to `--vs--heading-font-family`, so setting one typeface for all headings also changed bold body text and table headers. They no longer do.
- **Footnotes.** Every unset `--vs-footnote--*` property fell back to the document default, which pinned footnote text to the document typeface and size no matter where the note was written. Unset properties are now inherited from the call site.
- **`hr` and table rule colors** are no longer routed through the `currentColor` keyword: `--vs-border-color` now defaults to `var(--vs-text-color)`.

#### New variables

| Area                     | Added                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headings                 | `color`, `background-color`, `padding-block` / `padding-inline`, `border-{width,style,color}-{block,inline}-{start,end}`, `font-style`, `text-transform`, `string-set`                                                                                                                                                                                                                                                                                                |
| `figcaption` / `caption` | `color`, `line-height`, `font-family`, `font-weight`, `font-style`, `letter-spacing`, `text-transform`, `writing-mode`, `display`, `order`, and the whole set again for `<caption>` as `--vs--caption-*`                                                                                                                                                                                                                                                              |
| Tables                   | `--vs--table-{background-color,border-collapse,font-family,font-variant-numeric,letter-spacing,line-height,size-inline,max-size-*,table-layout,text-color}`, per-part `--vs--table-border-{color,style}-*` matching the existing widths, `--vs--table-row-{odd,even}-background-color`, and `--vs--{th,td,table-cell}-{background-color,line-height,vertical-align,white-space,min-size-block,letter-spacing,text-color,text-transform,padding-block,padding-inline}` |
| Lists                    | `--vs--li-*`, `--vs--lists-marker-*` (`li::marker`), `--vs--{ul,ol}-list-style-position`, `--vs--dl-margin-*`                                                                                                                                                                                                                                                                                                                                                         |
| `pre`                    | `background-color`, `color`, `border-*`, `border-radius`, `line-height`, `font-family`, `break-inside`, `size-inline`, plus `--vs--monospace-font-variant-ligatures`                                                                                                                                                                                                                                                                                                  |
| `blockquote`             | `background-color`, `border-*`, `border-radius`, `padding-*`, `line-height`, `text-align`, `color`, `font-family`, `break-inside`, and `--vs--blockquote-p-*` to exempt quoted paragraphs from the `--vs--p-*` settings                                                                                                                                                                                                                                               |
| Inline                   | `--vs--sup-*` / `--vs--sub-*` (`color`, `font-family`, `font-weight`, `letter-spacing`, `line-height`, `margin-inline`, `vertical-align`, `text-combine-upright`), `--vs--rt-*`, `--vs--ruby-*`, `--vs--cite-*`, `--vs--bold-{text-color,line-height,margin-inline}`                                                                                                                                                                                                  |
| Paragraphs               | `--vs--p-{font-size,padding-block,padding-inline}` and `--vs--p-first-text-indent` for the opening paragraph of a block                                                                                                                                                                                                                                                                                                                                               |
| Math                     | `--vs--math-*` and `--vs--math-display-*`; `math` defaults to a math typeface (`'STIX Two Math', 'Cambria Math', 'Latin Modern Math', math`) and is upright inside italic text. VFM's MathJax output (`span.math.display`) becomes a block and shares `--vs--math-display-break-inside` / `-margin-block` with `math[display='block']`, so both renderers space display math the same way                                                                             |
| `hr`                     | `--vs--hr-size-inline`, `--vs--hr-border-style-block-start`                                                                                                                                                                                                                                                                                                                                                                                                           |
| Document                 | `--vs-text-color-muted`, `--vs-accent-color`, `--vs-background-color-alt`, `--vs-font-family-secondary`, `--vs-border-style`, `--vs-column-rule-{width,style,color}`, `--vs-font-variant-numeric`                                                                                                                                                                                                                                                                     |
| Page                     | `--vs-page--border-{width,style,color}` and the per-side `--vs-page--border-{width,style,color}-{top,bottom,left,right}` for rules around the page area, `--vs-page--mbox-{border-*,size-inline,line-height,vertical-align}`, the per-edge groups `--vs-page--mbox-{top,bottom,left,right}-*` (including `vertical-align` and the margin / padding towards the page area), the per-box `--vs-page--mbox-<box>-padding-*`, the spread-aware `--vs-page--mbox-{top,bottom}-{inside,outside}[-corner]-content` and `--vs-page--mbox-{inside,outside}-{top,middle,bottom}-content` that resolve to the left or right box depending on the page side (the physical `--vs-page--mbox-<box>-content` wins when both are set), the spread-aware `--vs-page--{margin,padding}-{inside,outside}` that set the page margins and paddings towards the gutter and the fore edge per page side, and `--vs-page--{margin,padding}-{left,right}` for physical per-side values (the physical variable wins when both are set) |
| Endnotes                 | `--vs-endnote--section-heading-*`, `--vs-endnote--item-*`, `--vs-endnote--section-hr-{display,size-inline,margin-*}`, `--vs-endnote--call-sup-font-size`                                                                                                                                                                                                                                                                                                              |
| Footnotes                | `--vs-footnote--{call,marker}-{text-color,font-family,font-weight,line-height}`, `--vs-footnote--marker-font-size`, `--vs-footnote--area-before-size-inline`                                                                                                                                                                                                                                                                                                          |

`utility-classes.css` gains `writing-mode-*`, `text-orientation-*`, `text-combine-upright-*` (tate-chu-yoko) and `font-variant-numeric-*`.

BREAKING CHANGE: `--vs--ul-minimum-inline-indent-size` and `--vs--ol-minimum-inline-indent-size` are gone. Set the indent directly.

```css
/* Before */
--vs--ul-minimum-inline-indent-size: 1rem;
/* After */
--vs--ul-padding-inline-start: 1rem;
```

BREAKING CHANGE: these defaults changed.

| Variable                           | Before                            | After                                 |
| :--------------------------------- | :-------------------------------- | :------------------------------------ |
| `--vs-border-color`                | `currentColor`                    | `var(--vs-text-color)`                |
| `--vs--anchor-text-color`          | `inherit`                         | `var(--vs-accent-color)`              |
| `--vs--blockquote-margin-inline`   | `var(--vs-spacing-inline-indent)` | `var(--vs-spacing-inline-indent) 0`   |
| `--vs--figure-item-padding-inline` | `var(--vs-spacing-inline-indent)` | `0`                                   |
| `--vs--lists-padding-inline-start` | `var(--vs-spacing-inline-indent)` | `2rem`                                |
| `--vs--pre-font-size`              | `100%`                            | `var(--vs--monospace-font-size)`      |
| `--vs--pre-overflow-x`             | `auto`                            | `auto`, `visible` on print media      |
| `--vs-page--mbox-text-color`       | `inherit`                         | `var(--vs-text-color-muted)`          |
| `--vs--p-hanging-punctuation`      | `var(--vs-hanging-punctuation)`   | no default, so an ancestor can set it |
