<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Spec of Vivliostyle Theme](#spec-of-vivliostyle-theme)
  - [Theme Name](#theme-name)
  - [Styles to Include in the Theme](#styles-to-include-in-the-theme)
  - [Directory Structure](#directory-structure)
  - [package.json](#packagejson)
    - [`keywords` Property](#keywords-property)
    - [`vivliostyle.theme` Property](#vivliostyletheme-property)
      - [`style` Property](#style-property)
      - [`author` Property](#author-property)
      - [`category` Property](#category-property)
      - [`topics` Property](#topics-property)
  - [example/](#example)
  - [theme.css](#themecss)
  - [vivliostyle.config.js](#vivliostyleconfigjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Spec of Vivliostyle Theme

If you want to publish your theme as an npm package, please follow the specification below. You can use [create-vivliostyle-theme][] to quickly create a theme that follows this specification.

## Theme Name

The name of the theme can be free. However, it is recommended to follow some points:

- If the purpose is clear, include a concise term that represents it.
- Avoid terms related to modifiable styles.
  - For example, publication size and layout direction are expected to be easily changeable by users in the future with tools like Vivliostyle Pub. Therefore, avoid using terms related to these modifiable styles.
  - Examples of names to avoid: vivliostyle-theme-a4book, vivliostyle-theme-tategaki, etc.

## Styles to Include in the Theme

A theme should encompass styles for the entire publication, rather than focusing on specific elements (e.g., only figures or footnotes).

Below are the typical styles that should be included in a theme. The theme template generated with [create-vivliostyle-theme][] includes these styles.

- Page (margin, running header/footer, etc.)
- Heading
- Paragraph
- Math expression
- Figure and caption
- Table and caption
- Source code
- Footnote
- Ruby

## Directory Structure

```
vivliostyle-theme-mybook/
├── LICENSE
├── README.md
├── package.json
├── example/
│   ├── ...
│   └── default.md
├── theme.css
└── vivliostyle.config.js
```

When you create a theme template using [create-vivliostyle-theme][], the essential files mentioned above will be generated automatically. The details of some typical files are described in the following sections.

## package.json

```json
{
  "name": "vivliostyle-theme-mybook",
  "author": "John Doe <john@example.com>",
  "main": "theme.css",
  "keywords": [
    // described below
    "vivliostyle",
    "vivliostyle-theme"
  ],
  "vivliostyle": {
    // described below
    "theme": {
      "style": "./theme.css",
      "name": "Mybook",
      "author": "John Doe",
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

### `keywords` Property

Optional.

Including `"vivliostyle-theme"` in this property's value will list your theme among the available options when creating a publication using [Create Book][]. Ensure your theme is published as an npm package for it to appear.

Since a theme is an npm package related to Vivliostyle, it is advisable to include `"vivliostyle"`.

### `vivliostyle.theme` Property

#### `style` Property

Required. This property specifies the main CSS file in the theme.

You can also use the `style` or `main` properties at the top level of `package.json`. These properties serve the same purpose as `vivliostyle.theme.style`, but the priority order is `vivliostyle.theme.style` > `style` > `main`.

```json
{
  "main": "theme.css",
  "style": "theme.css"
}
```

#### `author` Property

Required.

#### `category` Property

Optional. This property provides a hint to users about the primary use of your theme when they use it for the first time.

Choose the category that best fits your theme from the following list:

- `"novel"`
- `"magazine"`
- `"journal"`
- `"report"`
- `"misc"`

Note that this list may be updated in the future.

#### `topics` Property

Optional. If you want more specific descriptions of the theme's use than the `category` property, you can list and describe them here.

## example/

The example directory should contain at least one Markdown file, a straightforward example of a theme. The name of the file is arbitrary.

In Markdown files, you can use [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm).

## theme.css

Include the stylesheet that defines the theme's styles. You can optionally use extended stylesheets like SCSS to create complex themes, but ensure to include the compiled CSS result in the actual npm package.

A theme can include multiple stylesheets. For example, besides the default `theme.css`, you can provide stylesheets for specific purposes as shown below:

- `theme_print.css`: Defines styles for outputting as PDF or viewing with Vivliostyle Viewer.
- `theme_screen.css`: Defines styles for outputting in webpub format such as HTML.

To specify a stylesheet other than the default with Vivliostyle CLI, set the `specifier` and `import` properties as follows:

```js
theme: {
  specifier: 'vivliostyle-theme-mybook',
  import: 'theme_print.css',
},
```

## vivliostyle.config.js

```js
/** @type {import('@vivliostyle/cli').VivliostyleConfigSchema} */
module.exports = {
  language: 'en',
  theme: ['node_modules/@vivliostyle/theme-base', '.'],
  entry: ['example/default.md'],
  workspaceDir: '.vivliostyle',
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
```

This is a configuration file for generating publications from Markdown files in example. It is used by developers to develop themes and by theme's users to generate sample publications.

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme
[create book]: https://github.com/vivliostyle/create-book
