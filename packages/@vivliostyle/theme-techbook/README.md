# Techbook

[![](https://img.shields.io/npm/v/@vivliostyle/theme-techbook.svg)](https://npmjs.com/package/@vivliostyle/theme-techbook)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-techbook)](https://npmjs.com/package/@vivliostyle/theme-techbook)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-techbook)

A techbook (技術同人誌) theme for Vivliostyle.

Source: https://github.com/akabekobeko/env-create-book/tree/master/src/scss

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-techbook',
};
```

### Color theme of code blocks

This theme imports [`theme-okaidia`](../theme-base/css/lib/prism/theme-okaidia.css) as a default color theme of code blocks. If you want to use other themes, please import the CSS like this.

```js
module.exports = {
  theme: [
    '@vivliostyle/theme-techbook',
    {
      specifier: '@vivliostyle/theme-base',
      import: 'css/lib/prism/theme-prism.css',
    },
  ],
};
```

## Available theme CSS variables

```css
:root {
  --vs-theme--anchor-color-body: #3498db;
  --vs-theme--blockquote-color-bg: #ecf0f1;
  --vs-theme--blockquote-color-body: #34495e;
  --vs-theme--inline-code-color-bg: #ecf0f1;
  --vs-theme--inline-code-color-body: #34495e;
  --vs-theme--footnote-color-bg-on-screen: #e6f6d7;
  --vs-theme--crossref-anchor-color-bg-on-screen: rgba(255, 0, 0, 0.3);
  --vs-theme--crossref-anchor-color-body-on-screen: #e74c3c;
  /**
   *  Displaying image resolution of raster images
   */
  --vs-theme--image-resolution-for-figure-image: 300dpi;
  /**
   *  Styles for page top/bottom contents
   */
  --vs-theme--page-top-left-content: env(pub-title);
  --vs-theme--page-top-right-content: env(doc-title);
  --vs-theme--page-bottom-content: counter(page);
}
```

## License

CC0 1.0
