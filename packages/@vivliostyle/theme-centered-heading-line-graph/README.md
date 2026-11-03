# @vivliostyle/theme-centered-heading-line-graph

A two-column theme for English textbooks. It typesets data-heavy pages with centered numbered headings, tables with colored headers, and line graphs.

## Usage

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-centered-heading-line-graph',
};
```

Writing the manuscript:

- Put one chapter in one file, and write `class: chapter` and the chapter title (`title`) in the frontmatter. Chapter numbers (in headings, figure and table numbers, and running heads) come from the base document counter `vs-counter-chapter`. The left running head shows the chapter title (`env(doc-title)`), and the right one shows the book title (`env(pub-title)`, i.e. `title` in the config).
- Write a section as `## Section title {#id}`. For an unnumbered heading, add closing `#`s as in `## Heading ##`; it does not become a section, so it does not consume a number. End-of-chapter summaries and exercises have to stay sections because columns are applied per section, so write `## Section title {.closing}` to drop only the number.
- Write a figure as `![Caption](fig.svg){#id}`, and wrap a table and its `<figcaption>` in `<figure class="tbl" id="id">`. Counters assign the numbers (`Figure 7.1` / `Table 7.1`).
- Write a reference as `<a href="#id" data-ref="fig|tbl|sec"></a>`.
- Set `vfm: { disableFormatHtml: true }` in the config. The HTML formatting of VFM drops whitespace right after an empty element, so without it a reference runs into the following word, as in `Figure 7.1plots`.
- Add the `wide` class to a figure or table that spans both columns. Wrap a chart without a figure number in `<div class="chart">`, and a framed graph in `<div class="panel">`.

## Customization

Override the following variables on `:root` to customize the theme.

| Variable | Default | Description |
| --- | --- | --- |
| `--vs-theme-centered-heading-line-graph--color-accent` | `var(--vs-color-foreground-alt)` | Color of heading numbers, table headers, and cross-references |
| `--vs-theme-centered-heading-line-graph--color-panel-bg` | `color-mix(in oklab, var(--vs-color-foreground-alt), var(--vs-color-background) 95%)` | Background color of graph panels |
