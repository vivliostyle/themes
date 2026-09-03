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

The package entry ([theme.css](theme.css)) contains the basic modules: the CSS reset, the variable defaults and the styles of basic HTML tags. Every other module is opt-in and imported through its own subpath such as `@vivliostyle/theme-base/footnote`.

#### Import from vivliostyle.config.js

```js
module.exports = {
  theme: '@vivliostyle/theme-base',
};
```

#### Import from CSS

```css
/* Import the basic modules */
@import '@vivliostyle/theme-base';
/* Import feature modules as needed */
@import '@vivliostyle/theme-base/footnote';
@import '@vivliostyle/theme-base/page';
@import '@vivliostyle/theme-base/toc';
```

## Available modules and CSS variables

Each module is imported as `@vivliostyle/theme-base/<subpath>` and documented next to its source, in `src/<subpath>/README.md`. The basic modules are the package entry and need no subpath.

| Module                                                           | Description                                                                                       |
| :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| [Basic](#basic)                                                  | The package entry: CSS reset, variable defaults and basic HTML tag styles                          |
| [`figure`](src/figure/README.md)                                 | Figure numbering and cross-references                                                              |
| [`table`](src/table/README.md)                                   | Table numbering and cross-references                                                               |
| [`citation`](src/citation/README.md)                             | Citation numbering and cross-references                                                            |
| [`listing`](src/listing/README.md)                               | Code listing numbering and cross-references                                                        |
| [`equation`](src/equation/README.md)                             | Equation numbering and cross-references                                                            |
| [`theorem`](src/theorem/README.md)                               | Theorem numbering and cross-references                                                             |
| [`appendix`](src/appendix/README.md)                             | Appendix lettering and cross-references                                                            |
| [`endnote`](src/endnote/README.md)                               | Endnotes                                                                                           |
| [`footnote`](src/footnote/README.md)                             | Footnotes, with the optional `footnote/external-links` stylesheet that footnotes external links    |
| [`page`](src/page/README.md)                                     | Paged media: page margin boxes and page references                                                 |
| [`section`](src/section/README.md)                               | Heading counters and section references                                                            |
| [`toc`](src/toc/README.md)                                       | Table of contents (TOC) pages                                                                      |
| [`math`](src/math/README.md)                                     | Math (MathML / MathJax) display                                                                    |
| [`sidenote`](src/sidenote/README.md)                             | Numbered sidenotes floated to the inline-end side                                                  |
| [`prism`](src/prism/README.md)                                   | Prism code highlighting, with the color themes `prism/theme-prism` and `prism/theme-okaidia`       |

### Basic

```css
@import '@vivliostyle/theme-base';

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

Each reference type lives in its own module: [figure](src/figure/README.md), [table](src/table/README.md), [citation](src/citation/README.md), [listing](src/listing/README.md), [equation](src/equation/README.md), [theorem](src/theorem/README.md) and [appendix](src/appendix/README.md); page references ship with the [page](src/page/README.md) module. An empty in-text call `<a data-ref="…" href="#id"></a>` is filled with the resolved number, and per-type variables start with `--vs-figure--`, `--vs-table--`, `--vs-citation--`, `--vs-listing--`, `--vs-equation--`, `--vs-theorem--`, `--vs-appendix--`, `--vs-page--`.

The shared defaults are part of the basic stylesheet, so they need no separate import:

```css
/* Configuration examples */
:root {
  /* Shared numbering style; each type can override it with its own
     --vs-<type>--counter-style (figure, table, citation, listing, equation,
     theorem; appendix defaults to upper-alpha on its own). */
  --vs-counter-style: upper-roman;

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

- The shared knobs are `--vs-counter-style`, `--vs-crossref-{marker,call}-counter-prefix` and the `--vs--crossref-call-*` anchor settings
- All `a[data-ref]` anchors drop the default underline; the text color falls back to `--vs--anchor-text-color` and can be overridden with `--vs--crossref-call-text-color`
- Note: many defaults are also defined on `:root:lang(ja)` (Japanese wording). When overriding such variables on `:root` alone, the `:lang(ja)` defaults still win in Japanese documents. Override both `:root` and `:root:lang(ja)`, or set the variable on `:root:lang(ja)` as well

## License

CC0 1.0

> Original author: Vivliostyle project team
