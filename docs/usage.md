# Using Themes

Vivliostyle Theme is a style theme used for creating publications with Vivliostyle. Distributed as npm packages, themes can be applied to your publications simply by specifying them in `vivliostyle.config.js`.

## Installing a Theme

Install the desired theme via npm.

```bash
npm install @vivliostyle/theme-techbook
```

## Specifying a Theme

### Basic Usage

Set the package name in the `theme` property of `vivliostyle.config.js`.

```js
module.exports = {
  theme: '@vivliostyle/theme-techbook',
};
```

### Specifying a Particular CSS File

Some themes provide multiple CSS files. To use a CSS file other than the default, specify `specifier` and `import`.

```js
module.exports = {
  theme: {
    specifier: '@vivliostyle/theme-gutenberg',
    import: 'alice.css',
  },
};
```

### Combining Multiple Themes

By passing an array to the `theme` property, you can combine multiple themes. For example, to change the code block color scheme of a theme:

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

## Customizing with CSS Variables

Each theme exposes configuration values as CSS custom properties (CSS variables). You can adjust the theme's styles by overriding these variables in a custom CSS file.

### CSS Variable Naming Convention

| Prefix | Purpose | Examples |
|---|---|---|
| `--vs-` | Meta properties affecting the entire document | `--vs-font-family`, `--vs-font-size` |
| `--vs--` | Styles for basic HTML tags | `--vs--heading-line-height`, `--vs--h1-font-size` |
| `--vs-{module}--` | Module-specific settings | `--vs-crossref--counter-style`, `--vs-toc--marker-margin-inline` |
| `--vs-theme--` | Theme-specific settings | `--vs-theme--anchor-color-body`, `--vs-theme--page-bottom-content` |

### Customization Example

Create a custom CSS file that overrides the theme's CSS variables, then add it in `vivliostyle.config.js`.

**custom.css:**

```css
:root {
  --vs-theme--anchor-color-body: #e74c3c;
  --vs-theme--page-top-left-content: 'My Book Title';
  --vs-theme--page-bottom-content: counter(page);
}
```

**vivliostyle.config.js:**

```js
module.exports = {
  theme: [
    '@vivliostyle/theme-techbook',
    'custom.css',
  ],
};
```

Refer to each theme's README for a complete list of available CSS variables.

## Official Themes

### [@vivliostyle/theme-bunko](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-bunko)

Suitable for Japanese vertical novels (bunko). Supports ruby and horizontal-in-vertical text. Configurable lines/characters per page.

![Theme-bunko sample image. The manuscript is 'Night on the Galactic Railroad'.](./assets/captures/theme-bunko.webp)

### [@vivliostyle/theme-slide](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-slide)

Suitable for slide presentations. Supports cover page (`.cover`) and full-page image layouts.

![Theme-slide sample image. On the left is the cover page with a blue background, and on the right is the general page with a white background.](./assets/captures/theme-slide.webp)

### [@vivliostyle/theme-techbook](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-techbook)

Suitable for technical books. Supports margin adjustment, table of contents, and source code highlighting.

![Sample images from theme-techbook. In addition to text, it has a table and source code.](./assets/captures/theme-techbook.webp)

### [@vivliostyle/theme-academic](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-academic)

Suitable for reports and academic papers. Automatic chapter/section numbering and frame elements (`.frame`) are supported.

![Sample images from theme-academic. In addition to text, it contains diagrams and tables.](./assets/captures/theme-academic.webp)

### [@vivliostyle/theme-gutenberg](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-gutenberg)

Suitable for English books. Three CSS variations available: `alice.css`, `fang.css`, `sherlock.css`.

![Sample image from theme-gutenberg. The manuscript is 'Alice's Adventures in Wonderland'.](./assets/captures/theme-gutenberg-alice.webp)

### [@vivliostyle/theme-epub3j](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-epub3j)

Suitable for Japanese EPUB 3 publications. Compatible with the EBPAJ EPUB 3 File Creation Guide.

![Screenshot of theme-epub3j example.](./assets/captures/theme-epub3j.webp)

### [@vivliostyle/theme-base](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-base)

The CSS toolkit that serves as the foundation for other themes. Individual modules can be `@import`ed as needed.

![Sample image from theme-base.](./assets/captures/theme-base.webp)

See the [Vivliostyle Themes Gallery](./gallery.md) for more details on each theme.

## Using theme-base Directly

[@vivliostyle/theme-base](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-base) is the foundation for other themes. It can also be used as a toolkit for building custom themes.

### Presets

| Preset | Contents |
|---|---|
| `theme-all.css` | All modules (cross-reference, footnotes, page layout, TOC, etc.) |
| `theme-basic.css` | Basic modules only (CSS reset, basic styling) |

```js
// Using theme-all.css
module.exports = {
  theme: {
    specifier: '@vivliostyle/theme-base',
    import: 'theme-all.css',
  },
};
```

### Available Modules

| Module | theme-all.css | theme-basic.css | CSS Variable Prefix |
|---|:---:|:---:|---|
| Basic | ✅ | ✅ | `--vs-`, `--vs--` |
| Cross-reference | ✅ | - | `--vs-crossref--` |
| Endnotes | ✅ | - | `--vs-endnote--` |
| Footnotes | ✅ | - | `--vs-footnote--` |
| Page layout | ✅ | - | `--vs-page--` |
| Section references | ✅ | - | `--vs-section--` |
| Table of Contents | ✅ | - | `--vs-toc--` |
| Utility classes | ✅ | - | — |
| Prism (Code highlighting) | - | - | `--vs-prism--` |

Example of importing individual modules in CSS:

```css
@import url("../@vivliostyle/theme-base/css/common/meta-properties.css");
@import url("../@vivliostyle/theme-base/css/common/reset.css");
@import url("../@vivliostyle/theme-base/css/common/basic.css");
@import url("../@vivliostyle/theme-base/css/partial/toc.css");
@import url("../@vivliostyle/theme-base/css/partial/footnote.css");
```

For detailed CSS variables of each module, see the [theme-base README](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-base#available-modules-and-css-variables).
