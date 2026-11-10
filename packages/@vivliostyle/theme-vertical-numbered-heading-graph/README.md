# @vivliostyle/theme-vertical-numbered-heading-graph

A theme for academic nonfiction. It sets the text in a single column of vertical Mincho with section headings numbered in kanji numerals, and places horizontal figures such as graphs at the bottom of the page as page floats, with the text flowing around them. Endnotes are supported.

## Usage

```css
@import '@vivliostyle/theme-vertical-numbered-heading-graph';
```

## Writing the manuscript

- Write a section heading as `## Heading` without a number. Headings are numbered automatically in kanji numerals. For an unnumbered heading, add closing `#`s as in `## Heading ##`.
- Write a figure as `![Caption](fig.svg){#fig-id}`. Do not number the caption yourself (as in 図1), and refer to the figure from the text with `<a href="#fig-id" data-ref="fig"></a>`.
- Write notes with the VFM footnote syntax `[^1]`. The note calls in the text and the list of notes headed 注 at the end are numbered automatically.
- To set Arabic numerals upright in vertical text, add the `tcy` class, as in `<span class="tcy">21</span>`.
- The running head appears only on left pages and shows the `title` (the book title) in `vivliostyle.config.js`.
