# @vivliostyle/theme-mono-hanging-number-sidenote

A theme for university textbooks set entirely in monospace. It features hanging section numbers and numbered sidenotes lined up in a band along the outer margin.

## Usage

```css
@import '@vivliostyle/theme-mono-hanging-number-sidenote';
```

## Writing the manuscript

- Put one chapter in one file, and write `class: chapter` in the frontmatter. Chapter numbers (in `Chapter N`, at the head of section numbers, and in running heads) come from the base document counter `vs-counter-chapter`.
- Write the chapter title as `# Chapter title` and a section as `## Section title {#id}`. For an unnumbered heading (such as end-of-chapter exercises), add closing `#`s as in `## Heading ##`.
- Write a reference to a section as `<a href="#id" data-ref="sec"></a>`. It appears as `§4.2`.
- Wrap the lead text right after the chapter title in `<div class="chapter-lead">`. A list of section references alone inside `<nav class="chapter-toc">` becomes a table of contents for the chapter, showing section numbers and titles.
- Write a sidenote as `<aside class="sidenote" id="sn-1">` and its reference in the text as `<a href="#sn-1" data-ref="sidenote"></a>`. Both are numbered automatically.
- Place a sidenote right after the paragraph or list that refers to it. The sidenote lines up with the top of that block in the band along the outer margin. A paragraph or list with a sidenote does not break across pages, and when the block after it does not fit on the page, it moves to the next page along with its sidenote.
- Write headings in a sidenote with `###` to `######`. All levels look the same and do not advance section numbers.
- Code fences get line numbers automatically. For code that needs no numbers, such as grammars and sample output, set the language to `text` (a fence without a language is also `text`). Code does not break across pages, so keep each block short enough to fit on one page.
- Set `vfm: { disableFormatHtml: true }` in the config. The HTML formatting of VFM drops whitespace right after an empty element, so without it a reference runs into the following word, as in `§4.2encodes`.

## Customization

Override the following variables on `:root` to customize the theme.

| Variable                                                             | Default                                                                           | Description                                        |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| `--vs-theme-mono-hanging-number-sidenote--color-lineno`              | `color-mix(in oklab, var(--vs-color-foreground), var(--vs-color-background) 60%)` | Color of line numbers in code                      |
| `--vs-theme-mono-hanging-number-sidenote--lineno-display`            | `block`                                                                           | Display of line numbers in code. `none` hides them |
| `--vs-theme-mono-hanging-number-sidenote--section-hang-size-inline`  | `14mm`                                                                            | Width of the space section numbers hang into       |
| `--vs-theme-mono-hanging-number-sidenote--sidenote-band-size-inline` | `46mm`                                                                            | Width of the sidenote band                         |

### Syntax highlighting

`theme.css` imports `layout.css`, which holds the theme itself, and `highlight.css`, which styles the Prism tokens (`.token.keyword` and so on) in code blocks. To use your own highlighting, import `layout.css` instead of the whole theme and add your rules after it.

```css
@import '@vivliostyle/theme-mono-hanging-number-sidenote/layout.css';

.token.keyword {
  color: #0077aa;
}
```

To do the same in the config, import `layout.css` from the theme package and add your CSS file after it.

```js
// vivliostyle.config.js
export default {
  theme: [
    {
      specifier: '@vivliostyle/theme-mono-hanging-number-sidenote',
      import: 'layout.css',
    },
    'my-highlight.css',
  ],
};
```
