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
├── template/
│   └── default/
│       ├── ...
│       ├── manuscript.md
│       └── vivliostyle.config.json
├── theme.css
└── vivliostyle.config.js
```

When you create a theme template using [create-vivliostyle-theme][], the essential files mentioned above will be generated automatically, with the sample in `example/` instead of `template/`; see [template/](#template) to turn it into a template. The details of some typical files are described in the following sections.

## package.json

```json
{
  "name": "vivliostyle-theme-mybook",
  "description": "Theme for paperback novels",
  "author": "John Doe <john@example.com>",
  "main": "theme.css",
  "files": ["*.css", "template"],
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
      "topics": ["literature", "vertical-writing", "paperback"],
      "i18n": {
        "ja": { "description": "文庫本の小説向けのテーマ" }
      }
    },
    "template": {
      "default": {
        "name": "Mybook sample",
        "source": "./template/default"
      }
    }
  }
}
```

You can use the `theme validate` command of [Vivliostyle CLI](https://github.com/vivliostyle/vivliostyle-cli) to check that the package.json of your theme conforms to the specification.

```bash
$ vivliostyle theme validate
```

### `description` Property

Recommended. Write it in English: npm and [theme.vivliostyle.org](https://theme.vivliostyle.org) show it as the summary of your theme. Translations go in [`vivliostyle.theme.i18n`](#i18n-property).

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

Note that this list may be updated in the future. Describe the use more specifically, such as the genre, with `topics`.

#### `topics` Property

Optional. Keywords that describe the theme more specifically than the `category` property. [theme.vivliostyle.org](https://theme.vivliostyle.org) shows them as tags to filter themes by.

- Write each topic in lowercase kebab-case English, such as `two-column`.
- Prefer the terms of the controlled vocabulary in [`vocabulary/topics.json`](https://github.com/vivliostyle/themes/blob/main/vocabulary/topics.json), and write a term by its `id`. The vocabulary has facets for the columns, the writing mode, the typeface, the genre and the mood. The `aliases` of a term are other spellings, which are accepted but normalized to the `id`.
- Other topics are shown as free tags.

The official themes in this repository are checked with `pnpm run validate`, and `node scripts/check-metadata.ts --fix` normalizes their topics.

#### `i18n` Property

Optional. Translations of the `name` of the theme and of the `description` of the package, keyed by a language code. theme.vivliostyle.org shows them on the pages in that language, and falls back to the untranslated values.

```json
"i18n": {
  "ja": {
    "name": "マイブック",
    "description": "文庫本の小説向けのテーマ"
  }
}
```

### `vivliostyle.template` Property

Optional, but recommended. Templates of projects that use the theme, keyed by a template ID. Vivliostyle CLI offers them in `vivliostyle create` after the theme is chosen, and theme.vivliostyle.org renders them for the thumbnail (the first template) and the previews of the theme. Without templates, both use the `basic` template of Vivliostyle CLI.

| Field         | Required | Description                                       |
| ------------- | -------- | ------------------------------------------------- |
| `name`        |          | Name shown when choosing a template               |
| `description` |          | Short description shown with the name             |
| `source`      | ✔        | Location of the template files                    |
| `prompt`      |          | Additional questions asked when creating projects |

`source` is either a path inside the theme package that starts with `./`, or a source in the [giget](https://github.com/unjs/giget) format such as `gh:user/repo/template`. Prefer a path inside the package: it is read from the same version of the package as the chosen theme, so the template always matches the theme, while a source in the giget format follows a branch of the repository. Paths inside the package require Vivliostyle CLI 11.5.0 or later.

See [the templates guide of Vivliostyle CLI](https://github.com/vivliostyle/vivliostyle-cli/blob/main/docs/templates.md) for `prompt` and the variables available in templates.

## template/

Put each template in its own directory under `template/`, and include `template` in the `files` of package.json. A template contains a `vivliostyle.config.json` and at least one Markdown file that shows off the theme. In Markdown files, you can use [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm).

`vivliostyle create` copies the files into the new project and fills in the [Handlebars](https://handlebarsjs.com/) expressions in every text file. The `vivliostyle.config.json` of the template uses them to take the values entered by the user. Write it in JSON, not JavaScript: Vivliostyle Pub does not run JavaScript configs.

```json
{
  "title": {{json (proper title)}},
  "author": {{json author}},
  "language": "en",
  "theme": {{#if theme}}{{json theme}}{{else}}"vivliostyle-theme-mybook"{{/if}},
  "entry": ["manuscript.md"]
}
```

`theme` is the chosen package with its version range, such as `"vivliostyle-theme-mybook@^1.0.0"`. To use another stylesheet of the package, write `{ "specifier": {{json theme}}, "import": "theme_print.css" }`.

Write `\{{` for a `{{` that should stay as it is, for example in a code block of the sample text.

The official themes in this repository were converted from `example/` with `node scripts/example-to-template.ts <package-dir>`.

## theme.css

Include the stylesheet that defines the theme's styles. Using CSS custom properties (CSS variables) is recommended so that users can flexibly customize the theme's styles.

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
  theme: '.',
  entry: ['template/default/manuscript.md'],
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

This is a configuration file for building the Markdown files of a template with the stylesheet under development, without creating a project. Handlebars does not fill in the files in this case, so a `\{{` in a code block keeps its backslash.

[create-vivliostyle-theme]: https://www.npmjs.com/package/create-vivliostyle-theme
[create book]: https://github.com/vivliostyle/create-book
