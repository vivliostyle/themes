# Theme Design Guideline (Draft)

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Package config](#package-config)
  - [Directory structure](#directory-structure)
  - [Style locator (required)](#style-locator-required)
    - [`vivliostyle.theme.style` (recommended)](#vivliostylethemestyle-recommended)
    - [`style`](#style)
    - [`main`](#main)
  - [Keywords (recommended)](#keywords-recommended)
  - [Category (optional)](#category-optional)
  - [Topics (optional)](#topics-optional)
- [CSS](#css)
  - [VFM compatibility](#vfm-compatibility)
  - [Data URL for smaller images](#data-url-for-smaller-images)
  - [`role` first, then custom classes](#role-first-then-custom-classes)
    - [Example usage](#example-usage)
    - [Available roles](#available-roles)
  - [`<figure>` for captioned image](#figure-for-captioned-image)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Package config

### Directory structure

```bash
vivliostyle-theme-academic
├── LICENSE # optional
├── README.md # optional
├── package.json # required
└── theme.css # required (name and location is arbitrary)
```

```jsonc
{
  "name": "vivliostyle-theme-academic",
  "author": "John Doe <john@example.com>",
  "keywords": ["vivliostyle", "vivliostyle-theme"],
  "files": ["*.css"],
  "vivliostyle": {
    "theme": {
      "style": "./theme.css", // see below
      "name": "Academic Journal", // optional
      "author": "John Doe", // optional
      "category": "journal", // optional
      "topics": ["論文", "2カラム", "Academic"] // optional
    }
  }
}
```

### Style locator (required)

You must define **style file location** by adding one of the following style locators. If more than one is defined, only one will be selected according to the priority level. (`vivliostyle.theme.style` > `style` > `main`)

#### `vivliostyle.theme.style` (recommended)

```jsonc
{
  "vivliostyle": {
    "theme": {
      "style": "theme.css"
    }
  }
}
```

#### `style`

```jsonc
{
  "style": "theme.css"
}
```

#### `main`

```jsonc
{
  "main": "theme.css"
}
```

### Keywords (recommended)

We maintain the list of Vivliostyle themes by searching `vivliostyle-theme` keyword on npm. If you want your theme being listed, please make sure to add `vivliostyle-theme` to `keywords` field.

```jsonc
{
  "keywords": ["vivliostyle-theme"]
}
```

### Category (optional)

`category` should be one of the followings:

- novel
- magazine
- journal
- report
- misc

<!-- sync with packages/create-vivliostyle-theme/src/cli.ts -->

This list might be updated in the future.

### Topics (optional)

`topics` is an array of strings describing your theme.

## CSS

### VFM compatibility

Vivliostyle theme styles should be compatible with HTML structure coming from `@vivliostyle/vfm` compiler. See [VFM spec](https://vivliostyle.github.io/vfm/#/vfm) for further details.

> Vivliostyle CLI also generates HTML compiled with VFM backend.

### Data URL for smaller images

Data URL reduces the cost fetching external resources through HTTP connection.

```css
html {
  ...;
}

body: {
  background-image: url(data:...);
}
```

### `<figure>` for captioned image

```css
/* style for non-captioned images */
img {
  width: 100%;
}

/* style for images with caption */
figure {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
figure img {
  width: 50vw;
}
figure figcaption {
  font-size: 12px;
}
```
