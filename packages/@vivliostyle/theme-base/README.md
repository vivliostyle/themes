# Vivliostyle Base Theme

[![npm: version](https://flat.badgen.net/npm/v/@vivliostyle/theme-base)](https://npmjs.com/package/@vivliostyle/theme-base)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-base)](https://npmjs.com/package/@vivliostyle/theme-base)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-base)

Base theme and CSS toolkit for Vivliostyle themes

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
| [Utility classes](#utility-classes)                   |      ✅       |        -        |
| [Prism (Code highlighting)](#prism-code-highlighting) |       -       |        -        |

### Basic

```css
@import url(@vivliostyle/theme-base/css/common/meta-properties.css);
@import url(@vivliostyle/theme-base/css/common/reset.css);
@import url(@vivliostyle/theme-base/css/common/basic.css);

/* Configuration examples */
:root {
  --vs-font-family: 'Times New Roman', serif;
  --vs-font-size: 12px;
  --vs--heading-line-height: 1.3;
  --vs--h1-font-size: 2.5em;
}
```

- [**meta-properties.css**](css/common/meta-properties.css) defines CSS variables that affect document-wide styles
  - Name of css variable starts with `--vs-`
- [**basic.css**](css/common/basic.css) defines styles of basic HTML tags
  - Name of css variable starts with `--vs--`

### Cross-reference

```css
@import url(@vivliostyle/theme-base/css/partial/crossref.css);

/* Configuration examples */
:root {
  --vs-crossref--counter-style: upper-roman;
  --vs-crossref--marker-cite-content: target-counter(attr(href), cite) '.';
}
```

- [**crossref.css**](css/partial/crossref.css) defines styles about cross-reference of figure, table and citation
  - Name of CSS variable starts with `--vs-crossref--`

### Endnotes

```css
@import url(@vivliostyle/theme-base/css/partial/endnote.css);

/* Configuration examples */
:root {
  --vs-endnote--call-font-size: 90%;
  --vs-endnote--section-ol-list-style-type: lower-latin;
}
```

- [**endnote.css**](css/partial/endnote.css) defines styles about endnotes
  - Name of CSS variable starts with `--vs-endnote--`

### Footnotes

```css
@import url(@vivliostyle/theme-base/css/partial/footnote.css);
@import url(@vivliostyle/theme-base/css/partial/footnote-external-link.css);

/* Configuration examples */
:root {
  --vs-footnote--call-content: '[' counter(footnote) ']';
  --vs-footnote--area-before-margin-inline: 0 80%;
}
```

- [**footnote.css**](css/partial/footnote.css) defines styles about footnotes
  - Name of CSS variable starts with `--vs-footnote--`
- [**footnote-external-link.css**](css/partial/footnote-external-link.css) adds footnotes for external links so that its URL can be recognized on print media

### Page layout

```css
@import url(@vivliostyle/theme-base/css/partial/page.css);

/* Configuration examples */
:root {
  --vs-page--mbox-content-bottom-center: counter(page);
  /*
   * Vivliostyle.js provides env(doc-title) and env(pub-title)
   * https://docs.vivliostyle.org/#/supported-css-features#values
   */
  --vs-page--mbox-content-top-left: env(doc-title);
  --vs-page--mbox-content-top-right: string(section-title);
}
/*
 * Setting named string
 * https://www.w3.org/TR/css-gcpm-3/#named-strings
 */
h1 {
  string-set: section-title content();
}
```

- [**page.css**](css/partial/page.css) defines styles about paged media
  - Name of CSS variable starts with `--vs-page--`

### Section references

```css
@import url(@vivliostyle/theme-base/css/partial/section.css);

/* Configuration examples */
:root {
  --vs-section--marker-display: inline;
  --vs-section--call-content: 'Sec. ' target-counters(attr(href), sections, '.');
}
```

- [**section.css**](css/partial/section.css) defines styles about heading counters and section reference
  - Name of CSS variable starts with `--vs-section--`

### Table of contents

```css
@import url(@vivliostyle/theme-base/css/partial/toc.css);

/* Configuration examples */
:root {
  --vs-toc--marker-margin-inline: 8rem;
}
```

- [**toc.css**](css/partial/toc.css) defines styles about table of contents (TOC) pages
  - Name of CSS variable starts with `--vs-toc--`

### Utility classes

```css
@import url(@vivliostyle/theme-base/css/partial/utility-classes.css);
```

- [**utility-classes.css**](css/partial/utility-classes.css) provides HTML utility classes related to page layout.

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
