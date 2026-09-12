# Bunko

[![](https://img.shields.io/npm/v/@vivliostyle/theme-bunko.svg)](https://npmjs.com/package/@vivliostyle/theme-bunko)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-bunko)](https://npmjs.com/package/@vivliostyle/theme-bunko)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-bunko)

A simple and stylish theme for Vivliostyle.

文庫用のテーマ。

![Screenshot of theme-bunko example](../../../docs/assets/captures/theme-bunko.webp)

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-bunko',
};
```

## Available theme CSS variables

```css
:root {
  /**
   *  Number of lines per page/Number of characters per line
   */
  --vs-theme--num-of-line: 15;
  --vs-theme--num-of-character: 39;
  /**
   *  Indent size of subsection
   */
  --vs-theme--subsection-text-indent: 3rem;
  /**
   *  Color of anchor texts on screen media
   */
  --vs-theme--anchor-color-body: darkblue;
}
```

The running head uses the page variables of the base theme: the page number sits at the outer top corner of every page, and left pages add the document title.

```css
:root {
  --vs-page--mbox-top-outside-content: counter(page);
}
@page :left {
  --vs-page--mbox-top-outside-content: counter(page) '　' env(doc-title);
}
```

## License

CC0 1.0

> Original author: Vivliostyle project team
