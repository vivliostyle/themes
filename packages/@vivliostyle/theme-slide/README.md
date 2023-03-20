# Slide

[![](https://img.shields.io/npm/v/@vivliostyle/theme-slide.svg)](https://npmjs.com/package/@vivliostyle/theme-slide)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-slide)](https://npmjs.com/package/@vivliostyle/theme-slide)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-slide)

A slide theme for Vivliostyle.

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-slide@beta',
};
```

### Color theme of code blocks

This theme imports [`theme-prism`](../theme-base/css/lib/prism/theme-prism.css) as a default color theme of code blocks. If you want to use other themes, please import the CSS like this.

```js
module.exports = {
  theme: [
    '@vivliostyle/theme-slide@beta',
    {
      specifier: '@vivliostyle/theme-base@beta',
      import: 'css/lib/prism/theme-okaidia.css',
    },
  ],
};
```

## Available theme CSS variables

```css
:root {
  --vs-theme--color-bg: #fff;
  --vs-theme--color-body: #000;
  --vs-theme--section-align-items: center;
  --vs-theme--section-justify-content: center;
  --vs-theme--h1-color: #212057;
  --vs-theme--h2-color: #e84e39;
  --vs-theme--h3-color: #e84e39;
  --vs-theme--h4-color: #e84e39;
  --vs-theme--anchor-color: #3498db;
  --vs-theme--blockquote-mark-color: #d6a;
  --vs-theme--table-heading-color-bg: rgb(0, 0, 0, 0.1);
  --vs-theme--page-ref-call-color: forestgreen;
  --vs-theme--page-ref-call-content: '(p.' target-counter(attr(href url), page) ')';
  --vs-theme--max-inline-size-on-screen: 40rem;
  /**
   *  Styles for cover pages
   */
  --vs-theme--cover-page-color-bg: #212057;
  --vs-theme--cover-page-color-body: #fff;
  --vs-theme--cover-page-align-items: center;
  --vs-theme--cover-page-justify-content: center;
  /**
   * Styles for image full pages
   */
  --vs-theme--image-full-page-margin: 0;
  --vs-theme--image-full-page-object-fit: cover;
}
```

### Cover page

`.cover` makes a special page that can be used for a cover slide.

```md
# Title of the slide {.cover}

## John doe

# About this slide

......
```

### Image full page

A paragraph with only one image will appear as an image covering the entire page.

```md
Look at the image on next page!

![](./fullscreen.png)
```

## License

CC0 1.0

> Original author: Vivliostyle project team
