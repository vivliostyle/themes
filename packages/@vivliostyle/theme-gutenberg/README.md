# Vivliostyle Theme Gutenberg

[![npm: version](https://flat.badgen.net/npm/v/@vivliostyle/theme-gutenberg)](https://npmjs.com/package/@vivliostyle/theme-gutenberg)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-gutenberg)](https://npmjs.com/package/@vivliostyle/theme-gutenberg)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-gutenberg)

book theme for latin font

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: 'vivliostyle-theme-gutenberg',
};
```

theme-gutenberg also provides some extra theme files derived from the basic theme.

#### [alice.css](alice.css)

![Screenshot of theme-gutenberg example (alice.css)](../../../docs/assets/captures/theme-gutenberg-alice.webp)

```js
module.exports = {
  theme: {
    specifier: 'vivliostyle-theme-gutenberg',
    import: 'alice.css',
  },
};
```

#### [fang.css](fang.css)

![Screenshot of theme-gutenberg example (fang.css)](../../../docs/assets/captures/theme-gutenberg-fang.webp)

```js
module.exports = {
  theme: {
    specifier: 'vivliostyle-theme-gutenberg',
    import: 'fang.css',
  },
};
```

#### [sherlock.css](sherlock.css)

![Screenshot of theme-gutenberg example (sherlock.css)](../../../docs/assets/captures/theme-gutenberg-sherlock.webp)

```js
module.exports = {
  theme: {
    specifier: 'vivliostyle-theme-gutenberg',
    import: 'sherlock.css',
  },
};
```

## Available theme CSS variables

```css
:root {
  /**
   *  Styles for drop caps
   */
  --vs-theme--dropcap-font-size: 1.8em;
  --vs-theme--dropcap-font-weight: var(--vs-font-weight-bold);
  --vs-theme--dropcap-line-height: 1;
  --vs-theme--dropcap-text-indent: 0;
  /**
   *  Styles for page top/bottom contents
   */
  --vs-theme--page-top-content: env(pub-title);
  --vs-theme--page-top-color-body: gray;
  --vs-theme--page-bottom-content: counter(page);
}
```

## License

CC0 1.0

> Original author: Vivliostyle project team
