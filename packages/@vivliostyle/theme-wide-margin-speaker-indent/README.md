# @vivliostyle/theme-wide-margin-speaker-indent

A single-column theme for technical doujinshi. It sets interview pages with hanging indents under speaker names, and pull quotes between thin rules and code blocks can be placed among the remarks.

## Usage

```css
@import '@vivliostyle/theme-wide-margin-speaker-indent';
```

## Writing the manuscript

- Put one chapter in one file, and write `class: chapter` in the frontmatter. The chapter number comes from the base document counter `vs-counter-chapter` and appears before `# Chapter title {#id}`. Do not write it in files other than chapters (the cover, contents, introduction and colophon).
- The running head shows the `title` in the frontmatter of each file, and page numbers run through the whole book. There is no need to add the chapter number to `title`.
- Write an interview as paragraphs of `<span class="speaker">Speaker</span>Remark` inside `<div class="dialogue">`. Write editorial notes in `<div class="note">`, and pull quotes as blockquotes (`>`). From the second paragraph on, a pull quote is treated as its source and set small, outside the corner brackets.
- Code blocks, lists and tables inside an interview are indented to the start of the remarks, and those outside an interview take the full width of the text.
- Write a reference to a chapter as `<a href="04-night-1.html#id" data-ref="chap"></a>`. It appears as `1　Chapter title`. For the number alone, use `data-ref="chap-num"`. A reference to a section with `data-ref="sec"` shows the heading text, taken with `target-text()`.
- Let the CLI generate the table of contents. Put `{ rel: 'contents', path: '<contents manuscript>' }` in `entry` of the config, and write an empty `<nav role="doc-toc"></nav>` in that manuscript. Set the heading with `toc.title`, and to list sections as well, set `toc.sectionDepth: 2`. Chapter entries get chapter numbers.

## Customization

Override the following variables on `:root` to customize the theme.

| Variable                                                     | Default | Description                                                                                                                        |
| ------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `--vs-theme-wide-margin-speaker-indent--speaker-size-inline` | `6rem`  | Width of the speaker name column in interviews. Remarks and code blocks, lists and tables in interviews are indented by this width |

### Syntax highlighting

`theme.css` imports `layout.css`, which holds the theme itself, and `highlight.css`, which styles the Prism tokens (`.token.keyword` and so on) in code blocks. To use your own highlighting, import `layout.css` instead of the whole theme and add your rules after it.

```css
@import '@vivliostyle/theme-wide-margin-speaker-indent/layout.css';

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
      specifier: '@vivliostyle/theme-wide-margin-speaker-indent',
      import: 'layout.css',
    },
    'my-highlight.css',
  ],
};
```
