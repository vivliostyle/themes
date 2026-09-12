# Techbook

[![](https://img.shields.io/npm/v/@vivliostyle/theme-techbook.svg)](https://npmjs.com/package/@vivliostyle/theme-techbook)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-techbook)](https://npmjs.com/package/@vivliostyle/theme-techbook)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-techbook)

A techbook (技術同人誌) theme for Vivliostyle.

Source: https://github.com/akabekobeko/env-create-book/tree/master/src/scss

![Screenshot of theme-techbook example](../../../docs/assets/captures/theme-techbook.webp)

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-techbook',
};
```

### Color theme of code blocks

This theme imports [`theme-okaidia`](../theme-base/src/prism/theme-okaidia.css) as a default color theme of code blocks. If you want to use other themes, please import the CSS like this.

```js
module.exports = {
  theme: [
    '@vivliostyle/theme-techbook',
    {
      specifier: '@vivliostyle/theme-base',
      import: 'prism/theme-prism',
    },
  ],
};
```

## Available theme CSS variables

```css
:root {
  --vs-theme-techbook--inline-code-color-bg: #ecf0f1;
  --vs-theme-techbook--inline-code-color-body: #34495e;
  --vs-theme-techbook--footnote-color-bg-on-screen: #e6f6d7;
  --vs-theme-techbook--crossref-anchor-color-bg-on-screen: rgba(255, 0, 0, 0.3);
  --vs-theme-techbook--crossref-anchor-color-body-on-screen: #e74c3c;
  /**
   *  Displaying image resolution of raster images
   */
  --vs-theme-techbook--image-resolution-for-figure-image: 300dpi;
}
```

The colors of blockquotes and links are the variables of the base theme (the link color applies to screen media only):

```css
:root {
  --vs--blockquote-background-color: #ecf0f1;
  --vs--blockquote-text-color: #34495e;
}
@media screen {
  :root {
    --vs--anchor-text-color: #3498db;
  }
}
```

The running head and the page number use the page variables of the base theme: the document title sits at the outer top corner and the page number at the outer bottom corner, and left pages show the publication title instead.

```css
:root {
  --vs-page--mbox-top-outside-content: env(doc-title);
  --vs-page--mbox-bottom-outside-content: counter(page);
}
@page :left {
  --vs-page--mbox-top-outside-content: env(pub-title);
}
```

## License

CC0 1.0
