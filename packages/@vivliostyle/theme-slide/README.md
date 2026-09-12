# Slide

[![](https://img.shields.io/npm/v/@vivliostyle/theme-slide.svg)](https://npmjs.com/package/@vivliostyle/theme-slide)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-slide)](https://npmjs.com/package/@vivliostyle/theme-slide)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-slide)

A slide theme for Vivliostyle.

![Screenshot of theme-slide example](../../../docs/assets/captures/theme-slide.webp)

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-slide',
};
```

### Color theme of code blocks

This theme imports [`theme-prism`](../theme-base/src/prism/theme-prism.css) as a default color theme of code blocks. If you want to use other themes, please import the CSS like this.

```js
module.exports = {
  theme: [
    '@vivliostyle/theme-slide',
    {
      specifier: '@vivliostyle/theme-base',
      import: 'prism/theme-okaidia',
    },
  ],
};
```

## Available theme CSS variables

```css
:root {
  --vs-theme-slide--section-align-items: center;
  --vs-theme-slide--section-justify-content: center;
  --vs-theme-slide--blockquote-mark-color: #d6a;
  --vs-theme-slide--table-heading-color-bg: rgb(0, 0, 0, 0.1);
  --vs-theme-slide--page-ref-call-color: forestgreen;
  --vs-theme-slide--page-ref-call-content: '(p.' target-counter(attr(href url), page) ')';
  --vs-theme-slide--max-inline-size-on-screen: 40rem;
  /**
   *  Styles for cover pages
   */
  --vs-theme-slide--cover-page-color-bg: #212057;
  --vs-theme-slide--cover-page-color-body: #fff;
  --vs-theme-slide--cover-page-align-items: center;
  --vs-theme-slide--cover-page-justify-content: center;
  /**
   * Styles for image full pages
   */
  --vs-theme-slide--image-full-page-margin: 0;
  --vs-theme-slide--image-full-page-object-fit: cover;
}
```

The colors of the body text, headings and links are the variables of the base theme:

```css
:root {
  --vs-color-foreground: #000;
  --vs--h1-text-color: #212057;
  --vs--h2-text-color: #e84e39;
  --vs--h3-text-color: #e84e39;
  --vs--h4-text-color: #e84e39;
  --vs--anchor-text-color: #3498db;
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
