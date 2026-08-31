# Vivliostyle Base Theme

[![npm: version](https://flat.badgen.net/npm/v/@vivliostyle/theme-base)](https://npmjs.com/package/@vivliostyle/theme-base)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-base)](https://npmjs.com/package/@vivliostyle/theme-base)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-base)

Base theme and CSS toolkit for Vivliostyle themes

![Screenshot of theme-base example](../../../docs/assets/captures/theme-base.webp)

## Install

```bash
npm install --save @vivliostyle/theme-base
# or
yarn add @vivliostyle/theme-base
```

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-base',
};
```

This package is designed to be modular so that it can be referenced and used by other themes. Each setting is configured as a CSS variable so that it can be changed to suit your preferences.

There're several presets to import modules we recommend.

- [**theme-all.css**](theme-all.css): imports all modules, including typesetting-specific features (cross reference, footnote etc.)
- [**theme-basic.css**](theme-basic.css): imports basic modules such as css reset and basic styling

#### Import from vivliostyle.config.js

```js
// Import theme-all.css
module.exports = {
  theme: {
    specifier: '@vivliostyle/theme-academic',
    import: 'theme-all.css',
  },
};
// Import theme-basic.css
module.exports = {
  theme: {
    specifier: '@vivliostyle/theme-academic',
    import: 'theme-basic.css',
  },
};
```

#### Import from CSS

```css
/* Import theme-all.css */
@import url(@vivliostyle/theme-base/theme-all.css);
/* Import theme-basic.css */
@import url(@vivliostyle/theme-base/theme-basic.css);
```

## Available modules and CSS variables

| Modules                                               | theme-all.css | theme-basic.css |
| :---------------------------------------------------- | :-----------: | :-------------: |
| [Basic](#basic)                                       |      ✅       |       ✅        |
| [Cross-reference](#cross-reference)                   |      ✅       |        -        |
| [Endnotes](#endnotes)                                 |      ✅       |        -        |
| [Footnotes](#footnotes)                               |      ✅       |        -        |
| [Page layout](#page-layout)                           |      ✅       |        -        |
| [Section references](#section-references)             |      ✅       |        -        |
| [Table of Contents](#table-of-contents)               |      ✅       |        -        |
| [Prism (Code highlighting)](#prism-code-highlighting) |       -       |        -        |

### Basic

```css
@import url(@vivliostyle/theme-base/css/define.css);
@import url(@vivliostyle/theme-base/css/reset.css);
@import url(@vivliostyle/theme-base/css/basic.css);

/* Configuration examples */
:root {
  --vs-font-family: 'Times New Roman', serif;
  --vs-font-size: 12px;
  --vs--heading-line-height: 1.3;
  --vs--h1-font-size: 2.5em;
}
```

- [**define.css**](css/define.css) defines CSS variables that affect document-wide styles
  - Name of css variable starts with `--vs-`
- [**basic.css**](css/basic.css) defines styles of basic HTML tags
  - Name of css variable starts with `--vs--`

Every variable, including the ones without a default value, is listed in
[css-variables.yml](css-variables.yml) and published as
`@vivliostyle/theme-base/css-variables.json`.

#### Document-wide design tokens

A handful of `--vs-` variables carry a role rather than a single property, and
element variables fall back to them. Setting one of these changes every place
that role is used.

| Variable                     | Role                               | Used by                                                     |
| :--------------------------- | :--------------------------------- | :---------------------------------------------------------- |
| `--vs-text-color-muted`      | secondary text                     | `--vs--figcaption-text-color`, `--vs-page--mbox-text-color` |
| `--vs-accent-color`          | accent                             | `--vs--anchor-text-color`, `--vs--lists-marker-text-color`  |
| `--vs-background-color-alt`  | shaded panels                      | `--vs--th-background-color`, `--vs--pre-background-color`   |
| `--vs-border-color`          | rules and borders                  | every `*-border-color-*` variable                           |
| `--vs-border-style`          | rules and borders                  | every `*-border-style-*` variable                           |
| `--vs-font-family-secondary` | second typeface (captions, tables) | `--vs--figcaption-font-family`, `--vs--table-font-family`   |

```css
:root {
  --vs-text-color-muted: #666;
  --vs-accent-color: #0b6bcb;
  --vs-background-color-alt: #f2f4f7;
  --vs-font-family-secondary: 'Helvetica Neue', sans-serif;
}
```

#### Notes on writing values

- Lengths need a unit. `0` is a `<number>`, not a `<length>`, and a variable
  holding it is dropped wherever a length is required.
- Set `--vs--*` variables rather than re-declaring the property. Theme rules use
  logical properties, and a physical `margin` / `padding` shorthand does not
  reliably cancel them.
- Element variables are ordinary custom properties, so they can be set on any
  ancestor, not only `:root`:
  `.sidebar { --vs--p-font-size: 0.8rem; }`.

### Cross-reference

```css
@import url(@vivliostyle/theme-base/css/citation.css);
@import url(@vivliostyle/theme-base/css/equation.css);
@import url(@vivliostyle/theme-base/css/figure.css);
@import url(@vivliostyle/theme-base/css/listing.css);
@import url(@vivliostyle/theme-base/css/table.css);
@import url(@vivliostyle/theme-base/css/theorem.css);
@import url(@vivliostyle/theme-base/css/appendix.css);

/* Configuration examples */
:root {
  /* Shared numbering style; each type can override it with its own
     --vs-<type>--counter-style (figure, table, citation, listing, equation,
     theorem — appendix defaults to upper-alpha on its own). */
  --vs-counter-style: upper-roman;
  --vs-equation--counter-style: decimal;
  --vs-citation--marker-content: counter(vs-counter-cite) '.';

  /* Chapter-prefixed numbers such as "Figure 2.3". The prefix is prepended
     to every default marker/call content (fig, tbl, lst, eq, thm). */
  --vs-crossref-marker-counter-prefix: counter(vs-counter-chapter) '.';
  --vs-crossref-call-counter-prefix: target-counter(
      attr(href),
      vs-counter-chapter
    )
    '.';
}
```

- Each reference type lives in its own module: [figure.css](css/figure.css), [table.css](css/table.css), [citation.css](css/citation.css), [listing.css](css/listing.css), [equation.css](css/equation.css), [theorem.css](css/theorem.css) and [appendix.css](css/appendix.css); page references ship with [page.css](css/page.css). The shared defaults — the numbering style, the generic `a[data-ref]` anchor treatment and the number prefixes — are part of the basic stylesheet, so they need no separate import
  - Per-type variables start with `--vs-figure--`, `--vs-table--`, `--vs-citation--`, `--vs-listing--`, `--vs-equation--`, `--vs-theorem--`, `--vs-appendix--`, `--vs-page--`; the shared knobs are `--vs-counter-style`, `--vs-crossref-{marker,call}-counter-prefix` and the `--vs--crossref-call-*` anchor settings
- Available reference types (an empty `<a data-ref="…" href="#id"></a>` is filled with the resolved number):
  - `fig` / `tbl` / `cite` — figure, table and citation numbers
  - `lst` — code listings: a captioned code fence (VFM's `lang:title` syntax renders it as `figure > figcaption + pre`) or a `figure.lst` counts `vs-counter-lst` and prefixes the caption with `--vs-listing--marker-content` ("Listing N: "); hide it with `--vs-listing--marker-display: none`
  - `eq` — equations wrapped in `<div class="equation">…</div>` get a number at the inline-end (`--vs-equation--marker-content`); laid out with flex because grid cannot split across pages
  - `thm` — blocks with `<div class="theorem">` count `vs-counter-thm`; the label text is `--vs-theorem--label`, including the gap before the number (e.g. `.lemma { --vs-theorem--label: 'Lemma '; }`)
  - `appendix` — counts `vs-counter-appendix` (default `upper-alpha`, label `--vs-appendix--label`) and prefixes the heading with `--vs-appendix--marker-content`. Two forms: sections whose heading has `class="appendix"` (or `<section role="doc-appendix">`) count within the document, while a whole document classed `.appendix` / `role="doc-appendix"` on `html`/`body` letters **across documents** through the page counter (one document = one appendix; the two forms never double-count). Page counters read as 0 inside `string-set`, so running heads must write `counter()` in the margin box instead
  - `page` — resolves to the page number of the target (`target-counter(attr(href), page)`); defined in [page.css](css/page.css)
- A Markdown table (or any block) without a `<caption>` can be numbered by placing a `<p class="tbl-caption">` (or `.fig-caption` / `.lst-caption`) paragraph next to it
- All `a[data-ref]` anchors drop the default underline; the text color falls back to `--vs--anchor-text-color` and can be overridden with `--vs--crossref-call-text-color`
- Note: many defaults are also defined on `:root:lang(ja)` (Japanese wording). When overriding such variables on `:root` alone, the `:lang(ja)` defaults still win in Japanese documents — override both `:root` and `:root:lang(ja)`, or set the variable on `:root:lang(ja)` as well

### Endnotes

```css
@import url(@vivliostyle/theme-base/css/endnote.css);

/* Configuration examples */
:root {
  --vs-endnote--call-font-size: 90%;
  --vs-endnote--section-ol-list-style-type: lower-latin;
}

/* Counter-based numbering: generate note numbers with `vs-counter-endnote`
   instead of the ol's list markers. Useful e.g. in vertical writing mode,
   where list markers cannot be set upright (tate-chu-yoko). */
:root {
  --vs-endnote--section-ol-list-style-type: none;
  --vs-endnote--marker-content: '(' counter(vs-counter-endnote) ')';
  --vs-endnote--marker-text-combine-upright: all;
  /* Optionally regenerate the in-text note call as well, hiding the
     literal number in <sup>. `vs-counter-endnote-call` counts the calls
     in document order. */
  --vs-endnote--call-sup-display: none;
  --vs-endnote--call-content: '(' counter(vs-counter-endnote-call) ')';
  --vs-endnote--call-text-combine-upright: all;
}

/* Separator rule above the endnotes heading. The <hr> written by VFM comes
   after the section's ::before heading and cannot be reordered, so hide it
   and draw the section's own border instead. Width and color default to
   --vs-border-width / --vs-border-color and can be overridden with
   --vs-endnote--section-border-{width,color}-block-start; the other logical
   sides (block-end / inline-start / inline-end) have the same set of
   variables. */
:root {
  --vs-endnote--section-hr-display: none;
  --vs-endnote--section-border-style-block-start: solid;
}
```

- [**endnote.css**](css/endnote.css) defines styles about endnotes
  - Name of CSS variable starts with `--vs-endnote--`

### Footnotes

```css
@import url(@vivliostyle/theme-base/css/footnote.css);
@import url(@vivliostyle/theme-base/css/footnote-external-link.css);

/* Configuration examples */
:root {
  --vs-footnote--call-content: '[' counter(vs-counter-footnote) ']';
  --vs-footnote--area-before-margin-inline: 0 80%;
}
```

- [**footnote.css**](css/footnote.css) defines styles about footnotes
  - Name of CSS variable starts with `--vs-footnote--`
- [**footnote-external-link.css**](css/footnote-external-link.css) adds footnotes for external links so that its URL can be recognized on print media

### Page layout

```css
@import url(@vivliostyle/theme-base/css/page.css);

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

- [**page.css**](css/page.css) defines styles about paged media
  - Name of CSS variable starts with `--vs-page--`
  - The margin-box `content` variables accept `inside` / `outside` in place of `left` / `right` (`--vs-page--mbox-bottom-outside-content`, `--vs-page--mbox-top-inside-corner-content`, `--vs-page--mbox-outside-middle-content`, …), which resolve to the physical box depending on the page side. The physical variable (e.g. `--vs-page--mbox-bottom-left-content`) takes precedence when both are set

### Section references

```css
@import url(@vivliostyle/theme-base/css/section.css);

/* Configuration examples */
:root {
  --vs-section--marker-display: inline;
  --vs-section--call-content: 'Sec. ' target-counters(attr(href), vs-counter-sections, '.');
}
```

- [**section.css**](css/section.css) defines styles about heading counters and section reference
  - Name of CSS variable starts with `--vs-section--`

### Table of contents

```css
@import url(@vivliostyle/theme-base/css/toc.css);

/* Configuration examples */
:root {
  --vs-toc--marker-display: inline;
  --vs-toc--ol-indent-size: 1.5rem;
}
```

- [**toc.css**](css/toc.css) defines styles about table of contents (TOC) pages
  - Name of CSS variable starts with `--vs-toc--`

### Prism (Code highlighting)

```css
@import url(@vivliostyle/theme-base/css/lib/prism/base.css);
/* Use okaidia theme */
@import url(@vivliostyle/theme-base/css/lib/prism/theme-okaidia.css);
/* Use prism theme */
@import url(@vivliostyle/theme-base/css/lib/prism/theme-prism.css);

/* Configuration examples */
:root {
  --vs-prism--background: #aaa;
  --vs-prism--block-code-padding: 2rem 1rem;
}
```

- [**prism/base.css**](css/lib/prism/base.css) defines styles compatible with [Prism](https://prismjs.com/) (code highlighting library)
  - Name of CSS variable starts with `--vs-prism--`
- [**prism/theme-prism.css**](css/lib/prism/theme-prism.css) enables Prism.js default theme
  - Original theme: https://github.com/PrismJS/prism/blob/master/themes/prism.css

<img width="691" alt="Highlighting examples of Prism.js default theme" src="https://user-images.githubusercontent.com/1771005/210739391-32dfac1b-e9c7-405a-ba8b-8e6f659b4f78.png">

- [**prism/theme-okaidia.css**](css/lib/prism/theme-okaidia.css) enables okaidia theme
  - Original theme: https://github.com/PrismJS/prism/blob/master/themes/prism-okaidia.css

<img width="692" alt="Highlighting examples of okaidia theme" src="https://user-images.githubusercontent.com/1771005/210739448-19332a60-f24f-42d8-8e79-f028edab458e.png">

## License

CC0 1.0

> Original author: Vivliostyle project team
