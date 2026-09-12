# Academic

[![](https://img.shields.io/npm/v/@vivliostyle/theme-academic.svg)](https://npmjs.com/package/@vivliostyle/theme-academic)
[![npm: total downloads](https://flat.badgen.net/npm/dt/@vivliostyle/theme-academic)](https://npmjs.com/package/@vivliostyle/theme-academic)
![npm: license](https://flat.badgen.net/npm/license/@vivliostyle/theme-academic)

An academic theme for Vivliostyle.

![Screenshot of theme-academic example](../../../docs/assets/captures/theme-academic.webp)

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-academic',
};
```

## Available theme CSS variables

```css
:root {
  /**
   *  Styles for frame elements
   */
  --vs-theme-academic--frame-border: var(--vs-border-width) solid;
  --vs-theme-academic--frame-box-decoration-break: slice;
  --vs-theme-academic--frame-margin-block: var(--vs-spacing-rlh);
  --vs-theme-academic--frame-margin-inline: 0;
  --vs-theme-academic--frame-padding: 1rem;
}
```

The maximum size of figure images is the variables of the base theme:

```css
:root {
  --vs--figure-item-max-size-block: 8cm;
  --vs--figure-item-max-size-inline: 10cm;
}
```

### Cover page

`.cover` makes a special page that can be used for a document title.

```md
<div class="cover">
<h1>Title of the thesis</h1>
<div class="author">

- John doe

</div>
</div>

## Abstract

......
```

### Frame element

`.frame` can be used for framed elements.

```md
<div class="frame">

(Code blocks, figures or something)

</div>
```

## License

CC0 1.0
