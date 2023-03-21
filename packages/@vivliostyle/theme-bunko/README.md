# Bunko

[![](https://img.shields.io/npm/v/@vivliostyle/theme-bunko.svg)](https://npmjs.com/package/@vivliostyle/theme-bunko)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-bunko)](https://npmjs.com/package/@vivliostyle/theme-bunko)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-bunko)

A simple and stylish theme for Vivliostyle.

文庫用のテーマ。

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-bunko@beta',
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
   *  Content to be displayed in the upper left/upper right corner of the page spread
   */
  --vs-theme--page-top-left-content: counter(page) '　' env(doc-title);
  --vs-theme--page-top-right-content: counter(page);
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

## License

CC0 1.0

> Original author: Vivliostyle project team
