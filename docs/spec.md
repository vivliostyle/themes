# Spec

If you want to publish your theme as an npm package, please follow the specification below. You can use [create-vivliostyle-theme][] to quickly create a theme that follows this specification.

## Theme name

The name of the theme can be free. However, it is recommended to follow some points:

- If the purpose is clear, include a straightforward term that describes the purpose.
- Avoid terms related to variable style terms.
  - For example, the size and orientation of the publication will be easily changed by the user in Vivliostyle Pub in the future. Therefore, please avoid using terms related to these variable style terms.
  - Avoid theme names: vivliostyle-theme-a4book, vivliostyle-theme-tategaki, etc.

## Styles

A theme should include styles for the entire publication, not just for specific parts of the publication (e.g., figures, footnotes only, etc.).

The following are typical styles that should be included in a theme. The theme template created with [create-vivliostyle-theme][] contains these styles.

- Page (margin, running header/footer, etc.)
- Heading
- Paragraph
- Math expression
- Figure and caption
- Table and caption
- Source code
- Footnote
- Ruby

## Directory structure

```
vivliostyle-theme-mybook/
├── LICENSE
├── README.md
├── package.json           # required
├── example/               # required
│   ├── ...
│   └── default.md
├── scss/                  # required
│   ├── ...
│   ├── theme_common.scss
│   ├── theme_print.scss
│   └── theme_screen.scss
├── theme_common.css       # required
├── theme_print.css        # required
├── theme_screen.css       # required
└── vivliostyle.config.js  # required
```

When you create a theme template with [create-vivliostyle-theme][], the fundamental files like above will be generated automatically. The details of some typical files are described in the following sections.

## package.json

```json
{
  "name": "vivliostyle-theme-mybook",
  "author": "John Doe <john@example.com>",
  "keywords": [
    // described below
    "vivliostyle",
    "vivliostyle-theme"
  ],
  "files": ["*.css", "*.css.map", "scss", "example", "vivliostyle.config.js"],
  "vivliostyle": {
    // described below
    "theme": {
      "style": "./theme_print.css", // required
      "name": "Mybook",
      "author": "John Doe", // required
      "category": "novel",
      "topics": ["paperback"]
    }
  }
}
```

You can use [vivliostyle-theme-scripts](https://github.com/vivliostyle/themes/tree/master/packages/vivliostyle-theme-scripts) to check that the package.json of your theme conforms to the specification.

```bash
$ vivliostyle-theme validate
```

### `keywords` property

Optional.

Suppose you include `"vivliostyle-theme"` in the value of this property. In that case, your theme will appear in the list of available themes when you create a publication using [Create Book][]. However, you need to have published your theme as an npm package to do so.

Since a theme is an npm package related to Vivliostyle, it is a good idea to include `"vivliostyle"`.

### `vivliostyle.theme` property

#### `style` property

Required. This property specifies the main CSS file in the theme.

You can also use `style` or `main` properties at the top level of package.json. It has the same meaning as `vivliostyle.theme.style`, but the priority is `vivliostyle.theme.style` > `style` > `main`.

```json
{
  "style": "theme_print.css"
}
```

```json
{
  "main": "theme_print.css"
}
```

#### `author` property

Required.

#### `category` property

Optional. This property is a hint to users who use your theme for the first time as to the primary use.

Choose the best fit category to your theme from the following list:

- `"novel"`
- `"magazine"`
- `"journal"`
- `"report"`
- `"misc"`

Please note that this list may be updated in the future.

#### `topics` property

Optional. If you want more specific descriptions of the theme's use than the `category` property, you can list and describe them here.

## example/

The `example/' directory should contain at least one Markdown file, a straightforward example of a theme. The name of the file is arbitrary.

In Markdown files, you can use [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm).

## scss/

Include style sheets that define the style of the theme. The style definitions for typesetting are often complex, and users may edit the theme's style sheets to customize styles. For these reasons, we recommend using SCSS, which allows variables and mixins.

A theme can contain multiple stylesheets. See [issue (vivliostyle/vivliostyle-cli #143)](https://github.com/vivliostyle/vivliostyle-cli/issues/143#issuecomment-791990973) for details. For example, three different style sheets can be used for the following purposes:

- theme_print.scss: Defines the styles for output as a PDF or for viewing in Vivliostyle Viewer.
- theme_screen.scss: Defines the styles for output as HTML or other webpub formats.
- theme_common.scss: Defines the common styles of the above two.

## \*.css

A set of CSS files generated from the stylesheets are in the scss/ directory.

## vivliostyle.config.js

```js
module.exports = {
  language: 'en',
  theme: 'theme_print.css',
  entry: ['example/default.md'],
  output: [
    'book.pdf',
    {
      path: '. /book',
      format: 'webpub',
    },
  ],
};
```

This is a configuration file for generating publications from Markdown files in example/. It is used by developers to develop themes and by theme's users to generate sample publications.

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme
[create book]: https://github.com/vivliostyle/create-book
