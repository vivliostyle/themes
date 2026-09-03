# Developing Themes

## Creating a Theme

### Scaffolding with create-vivliostyle-theme

Use the `create-vivliostyle-theme` CLI to generate a theme project scaffold.

```bash
npm create vivliostyle-theme <theme-name>
```

You will be prompted to enter the following:

| Field         | Description                                                           |
| ------------- | --------------------------------------------------------------------- |
| `description` | Theme description                                                     |
| `author`      | Author name                                                           |
| `email`       | Email address                                                         |
| `license`     | License (MIT, Apache-2.0, etc.)                                       |
| `category`    | Theme category (`novel` / `magazine` / `journal` / `report` / `misc`) |

After completion, a `vivliostyle-theme-<theme-name>` directory is created.

### Generated File Structure

```
vivliostyle-theme-<name>/
├── .gitignore
├── package.json          # Package definition (includes vivliostyle.theme config)
├── README.md             # Theme description and usage
├── theme.css             # Main theme CSS
├── vivliostyle.config.js # Configuration for previewing
└── example/
    └── default.md        # Sample manuscript (VFM format)
```

File roles:

| File                    | Role                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `package.json`          | Theme metadata. The `vivliostyle.theme` property defines the theme name, author, main CSS, and category         |
| `theme.css`             | The main style definition. Pre-configured with theme-base `@import` and CSS variable customizations             |
| `vivliostyle.config.js` | Used with `vivliostyle preview` to check the theme. Entry points to `example/default.md`                        |
| `example/default.md`    | Sample Markdown demonstrating theme application. Supports [VFM](https://vivliostyle.github.io/vfm/#/vfm) syntax |

## Customizing the Scaffold

### Editing theme.css

The generated `theme.css` includes theme-base module imports and CSS variable customization examples.

```css
/* Import the basic modules of theme-base */
@import '@vivliostyle/theme-base';

/* Import feature modules */
@import '@vivliostyle/theme-base/appendix';
@import '@vivliostyle/theme-base/citation';
@import '@vivliostyle/theme-base/endnote';
@import '@vivliostyle/theme-base/equation';
@import '@vivliostyle/theme-base/figure';
@import '@vivliostyle/theme-base/footnote';
@import '@vivliostyle/theme-base/listing';
@import '@vivliostyle/theme-base/math';
@import '@vivliostyle/theme-base/page';
@import '@vivliostyle/theme-base/section';
@import '@vivliostyle/theme-base/sidenote';
@import '@vivliostyle/theme-base/table';
@import '@vivliostyle/theme-base/theorem';
@import '@vivliostyle/theme-base/toc';

/* Add code highlighting (Prism) */
@import '@vivliostyle/theme-base/prism';
@import '@vivliostyle/theme-base/prism/theme-okaidia';

:root {
  /* Basic styles */
  --vs-font-family: 'Times New Roman', serif;
  --vs-font-size: 12px;
  --vs--heading-line-height: 1.3;
  --vs--h1-font-size: 2.5em;

  /* Footnotes */
  --vs-footnote--call-content: '[' counter(footnote) ']';

  /* Page layout */
  --vs-page--mbox-bottom-center-content: counter(page);
  --vs-page--mbox-top-left-content: env(doc-title);

  /* Table of contents */
  --vs-toc--marker-margin-inline: 8rem;
}
```

Add your own styles at the end of this file. For example, to set the page size:

```css
@page {
  size: A5;
  margin: 20mm 15mm;
}
```

### Using theme-base Modules

theme-base is divided into functional modules. The package entry contains only the basic modules, so keep just the feature module imports you need.

```css
/* Basic modules only */
@import '@vivliostyle/theme-base';

/* Add required feature modules */
@import '@vivliostyle/theme-base/toc';
@import '@vivliostyle/theme-base/footnote';
```

Available modules (imported as `@vivliostyle/theme-base/<subpath>`):

| Subpath                                                                     | Contents                                            | CSS Variable Prefix       |
| --------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------- |
| (package entry)                                                             | CSS reset, variable defaults, basic HTML tag styles | `--vs-`, `--vs--`         |
| `figure`                                                                    | Figure numbering and cross-references               | `--vs-figure--`           |
| `table`                                                                     | Table numbering and cross-references                | `--vs-table--`            |
| `citation`                                                                  | Citation numbering and cross-references             | `--vs-citation--`         |
| `listing`                                                                   | Code listing numbering and cross-references         | `--vs-listing--`          |
| `equation`                                                                  | Equation numbering and cross-references             | `--vs-equation--`         |
| `theorem`                                                                   | Theorem numbering and cross-references              | `--vs-theorem--`          |
| `appendix`                                                                  | Appendix lettering and cross-references             | `--vs-appendix--`         |
| `endnote`                                                                   | Endnotes                                            | `--vs-endnote--`          |
| `footnote`                                                                  | Footnotes                                           | `--vs-footnote--`         |
| `footnote/external-links`                                                   | Footnotes for external links                        | `--vs-footnote--`         |
| `page`                                                                      | Paged media                                         | `--vs-page--`             |
| `section`                                                                   | Heading counters and section references             | `--vs-section--`          |
| `toc`                                                                       | Table of contents                                   | `--vs-toc--`              |
| `math`                                                                      | Math (MathML / MathJax) display                     | `--vs-math--`             |
| `sidenote`                                                                  | Numbered sidenotes                                  | `--vs-sidenote--`         |
| `prism`                                                                     | Code highlighting base                              | `--vs-prism--`            |
| `prism/theme-prism`                                                         | Prism default theme                                 | `--vs-prism--`            |
| `prism/theme-okaidia`                                                       | Okaidia theme                                       | `--vs-prism--`            |

For details, see the [theme-base README](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-base#available-modules-and-css-variables).

### Overriding CSS Variables

You can customize themes by overriding CSS variables exposed by theme-base and individual themes in `:root`.

```css
:root {
  /* Font settings */
  --vs-font-family: 'Noto Serif JP', serif;
  --vs-font-size: 10.5pt;

  /* Headings */
  --vs--h1-font-size: 2em;
  --vs--heading-line-height: 1.4;

  /* Shared cross-reference counter style */
  --vs-counter-style: upper-roman;

  /* Page header/footer */
  --vs-page--mbox-top-left-content: env(pub-title);
  --vs-page--mbox-top-right-content: env(doc-title);
  --vs-page--mbox-bottom-center-content: counter(page);
}
```

As a practical example, [theme-techbook](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-techbook) exposes theme-specific CSS variables (`--vs-theme--*`):

```css
:root {
  --vs-theme--anchor-color-body: #3498db;
  --vs-theme--blockquote-color-bg: #ecf0f1;
  --vs-theme--inline-code-color-bg: #ecf0f1;
  --vs-theme--image-resolution-for-figure-image: 300dpi;
}
```

### Editing the example/ Directory

Place sample Markdown files in `example/` to demonstrate theme application.

- At least one Markdown file is required
- [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm) syntax is supported
- It is recommended to cover the major styles your theme supports (headings, code blocks, footnotes, images, math equations, etc.)

Preview for verification:

```bash
npm run example:preview
```

## Publishing a Theme

### Pre-publish Validation

Run `vivliostyle-theme-scripts validate` before publishing to verify your package.

```bash
npm run validate
```

Validation checks:

| Check         | Severity | Description                                                      |
| ------------- | -------- | ---------------------------------------------------------------- |
| Style locator | Error    | One of `vivliostyle.theme.style`, `style`, or `main` must be set |
| Author info   | Warning  | `vivliostyle.theme.author` or `author` should be set             |

### Preview Check

```bash
npm run example:preview
```

Based on the `vivliostyle.config.js` configuration, a preview with the theme applied to the sample manuscripts in `example/` will be displayed.

### Required package.json Fields

```json
{
  "name": "vivliostyle-theme-<name>",
  "main": "theme.css",
  "keywords": ["vivliostyle", "vivliostyle-theme"],
  "vivliostyle": {
    "theme": {
      "name": "Theme Display Name",
      "author": "Author Name",
      "style": "theme.css",
      "category": "misc",
      "topics": []
    }
  }
}
```

| Field                        | Required | Description                                                      |
| ---------------------------- | -------- | ---------------------------------------------------------------- |
| `vivliostyle.theme.style`    | ✅       | Path to the main CSS file                                        |
| `vivliostyle.theme.author`   | ✅       | Theme author name                                                |
| `vivliostyle.theme.name`     | —        | Theme display name                                               |
| `vivliostyle.theme.category` | —        | `novel` / `magazine` / `journal` / `report` / `misc`             |
| `vivliostyle.theme.topics`   | —        | Array of topics describing the theme's use cases                 |
| `keywords`                   | —        | Recommended to include `"vivliostyle"` and `"vivliostyle-theme"` |

See the [Spec of Vivliostyle Theme](./spec.md) for the full specification.

### Publishing to npm

```bash
npm publish
```

After publishing, your theme can be found at:

- [GitHub Topics: vivliostyle-theme](https://github.com/topics/vivliostyle-theme)
- [npm: vivliostyle-theme](https://www.npmjs.com/search?q=keywords%3Avivliostyle-theme)

### Proposing as an Official Theme

You can propose your theme as an official Vivliostyle theme. See [Adoption of the Official Theme](./official.md) for details.
