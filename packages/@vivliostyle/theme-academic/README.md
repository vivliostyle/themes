# Academic

[![](https://img.shields.io/npm/v/@vivliostyle/theme-academic.svg)](https://npmjs.com/package/@vivliostyle/theme-academic)
[![npm: total downloads](https://flat.badgen.net/npm/dt/vivliostyle-theme-academic)](https://npmjs.com/package/vivliostyle-theme-academic)
![npm: license](https://flat.badgen.net/npm/license/vivliostyle-theme-academic)

An academic theme for Vivliostyle.

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '@vivliostyle/theme-academic@beta',
};
```

## Available theme CSS variables

```css
:root {
  /**
   *  Max width/height of figure img
   */
  --vs-theme--figure-img-max-height: 8cm;
  --vs-theme--figure-img-max-width: 10cm;
  /**
   *  Styles for frame elements
   */
  --vs-theme--frame-border: var(--vs-border-width) solid;
  --vs-theme--frame-box-decoration-break: slice;
  --vs-theme--frame-margin-block: var(--vs-spacing-rlh);
  --vs-theme--frame-margin-inline: 0;
  --vs-theme--frame-padding: 1rem;
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
