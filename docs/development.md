# Developing Themes

## Creating a Theme

### Scaffolding with create-vivliostyle-theme

Use the `create-vivliostyle-theme` CLI to generate a theme project scaffold.

```bash
npm create vivliostyle-theme <theme-name>
```

You will be prompted to enter the following:

| Field | Description |
|---|---|
| `description` | Theme description |
| `author` | Author name |
| `email` | Email address |
| `license` | License (MIT, Apache-2.0, etc.) |
| `category` | Theme category (`novel` / `magazine` / `journal` / `report` / `misc`) |

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

| File | Role |
|---|---|
| `package.json` | Theme metadata. The `vivliostyle.theme` property defines the theme name, author, main CSS, and category |
| `theme.css` | The main style definition. Pre-configured with theme-base `@import` and CSS variable customizations |
| `vivliostyle.config.js` | Used with `vivliostyle preview` to check the theme. Entry points to `example/default.md` |
| `example/default.md` | Sample Markdown demonstrating theme application. Supports [VFM](https://vivliostyle.github.io/vfm/#/vfm) syntax |

## Customizing the Scaffold

### Editing theme.css

The generated `theme.css` includes theme-base module imports and CSS variable customization examples.

```css
/* Import all theme-base modules */
@import url(../@vivliostyle/theme-base/theme-all.css);

/* Add code highlighting (Prism) */
@import url(../@vivliostyle/theme-base/css/lib/prism/base.css);
@import url(../@vivliostyle/theme-base/css/lib/prism/theme-okaidia.css);

:root {
  /* Basic styles */
  --vs-font-family: 'Times New Roman', serif;
  --vs-font-size: 12px;
  --vs--heading-line-height: 1.3;
  --vs--h1-font-size: 2.5em;

  /* Footnotes */
  --vs-footnote--call-content: '[' counter(footnote) ']';

  /* Page layout */
  --vs-page--mbox-content-bottom-center: counter(page);
  --vs-page--mbox-content-top-left: env(doc-title);

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

theme-base is divided into functional modules. If you don't need all modules, you can import only the ones you need instead of `theme-all.css`.

```css
/* Basic modules only */
@import url(../@vivliostyle/theme-base/css/common/meta-properties.css);
@import url(../@vivliostyle/theme-base/css/common/reset.css);
@import url(../@vivliostyle/theme-base/css/common/basic.css);

/* Add required feature modules */
@import url(../@vivliostyle/theme-base/css/partial/toc.css);
@import url(../@vivliostyle/theme-base/css/partial/footnote.css);
```

Available modules:

| Category | Module | CSS Variable Prefix |
|---|---|---|
| common | `meta-properties.css` — Document-wide meta properties | `--vs-` |
| common | `reset.css` — CSS reset | — |
| common | `basic.css` — Basic HTML tag styles | `--vs--` |
| partial | `crossref.css` — Cross-reference for figures, tables, citations | `--vs-crossref--` |
| partial | `endnote.css` — Endnotes | `--vs-endnote--` |
| partial | `footnote.css` — Footnotes | `--vs-footnote--` |
| partial | `footnote-external-link.css` — Footnotes for external links | `--vs-footnote--` |
| partial | `page.css` — Paged media | `--vs-page--` |
| partial | `section.css` — Heading counters and section references | `--vs-section--` |
| partial | `toc.css` — Table of contents | `--vs-toc--` |
| partial | `utility-classes.css` — Utility classes | — |
| lib | `prism/base.css` — Code highlighting base | `--vs-prism--` |
| lib | `prism/theme-prism.css` — Prism default theme | — |
| lib | `prism/theme-okaidia.css` — Okaidia theme | — |

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

  /* Cross-reference counter style */
  --vs-crossref--counter-style: upper-roman;

  /* Page header/footer */
  --vs-page--mbox-content-top-left: env(pub-title);
  --vs-page--mbox-content-top-right: env(doc-title);
  --vs-page--mbox-content-bottom-center: counter(page);
}
```

As a practical example, [theme-techbook](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-techbook) exposes theme-specific CSS variables (`--vs-theme--*`):

```css
:root {
  --vs-theme--anchor-color-body: #3498db;
  --vs-theme--blockquote-color-bg: #ecf0f1;
  --vs-theme--inline-code-color-bg: #ecf0f1;
  --vs-theme--image-resolution-for-figure-image: 300dpi;
  --vs-theme--page-top-left-content: env(pub-title);
  --vs-theme--page-bottom-content: counter(page);
}
```

### Editing the example/ Directory

Place sample Markdown files in `example/` to demonstrate theme application.

- At least one Markdown file is required
- [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm) syntax is supported
- It is recommended to cover the major styles your theme supports (headings, code blocks, footnotes, images, math equations, etc.)

Preview for verification:

```bash
npm run preview
```

## Publishing a Theme

### Pre-publish Validation

Run `vivliostyle-theme-scripts validate` before publishing to verify your package.

```bash
npm run validate
```

Validation checks:

| Check | Severity | Description |
|---|---|---|
| Style locator | Error | One of `vivliostyle.theme.style`, `style`, or `main` must be set |
| Author info | Warning | `vivliostyle.theme.author` or `author` should be set |

### Preview Check

```bash
npm run preview
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

| Field | Required | Description |
|---|---|---|
| `vivliostyle.theme.style` | ✅ | Path to the main CSS file |
| `vivliostyle.theme.author` | ✅ | Theme author name |
| `vivliostyle.theme.name` | — | Theme display name |
| `vivliostyle.theme.category` | — | `novel` / `magazine` / `journal` / `report` / `misc` |
| `vivliostyle.theme.topics` | — | Array of topics describing the theme's use cases |
| `keywords` | — | Recommended to include `"vivliostyle"` and `"vivliostyle-theme"` |

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
