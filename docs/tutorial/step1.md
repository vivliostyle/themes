<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Step 1. Generating a template](#step-1-generating-a-template)
  - [Files in the template](#files-in-the-template)
  - [Previewing the template](#previewing-the-template)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Step 1. Generating a template

Use the tool [create-vivliostyle-theme][] to create a theme template with `npm` or `yarn` (we will use `yarn` in this tutorial). create-vivliostyle-theme is a tool that can generate a helpful template for creating your own theme.

```bash
$ yarn create vivliostyle-theme my-doujin
? description awesome theme
? author name John Doe
? author email john@example.com
? license AGPL-3.0
? choose category novel

Success! Created vivliostyle-theme-my-doujin.

1. cd vivliostyle-theme-my-doujin
2. edit scss/*.scss
3. publish to npm ($ npm publish)

✨  Done in 46.57s.
```

## Files in the template

The following is the file list of the template of theme. The template contains the essential style files and sample manuscripts required for publication. The files marked with 🖋 are the ones we will be editing.

```bash
$ cd vivliostyle-theme-my-doujin
$ tree . -I node_modules
.
├── LICENSE
├── README.md
├── example/                 Sample manuscripts
│   └── default.md           🖋 Edit Markdown
├── package.json             🖋 Edit theme information
├── scss/                    Three style files by default
│   ├── ...
│   ├── theme_common.scss    🖋 Theme's common styles
│   ├── theme_print.scss     🖋 Printing (PDF, etc.) style
│   └── theme_screen.scss    🖋 Viewing (HTML, etc.) style
├── vivliostyle.config.js    🖋 Configuration file for theme preview
└── yarn.lock
```

In example/, we place a sample manuscripts that is an example of applying the theme. The sample manuscripts will be the default manuscripts when the user creates a new publication using [Create Book](https://github.com/vivliostyle/create-book).

scss/ is where you will put your styles. Vivliostyle Theme recommends using SCSS for typesetting. Three SCSS files are created by default, and their roles are as follows. Of course, you can add more SCSS files.

- theme_print.scss: The style to be applied when generating PDF publications. It is a good idea to define the style of trim marks (tombo) here.
- theme_screen.scss: A style to be applied when generating HTML publications. It is recommended to set `max-width` and adjust the font size to prevent the content from filling the screen width.
- theme_common.scss: A style commonly used in theme_print.scss and theme_screen.scss.

## Previewing the template

Before starting to create a theme, let's first check the style of the template. The following command will launch Vivliostyle Viewer (Chromium) and display the preview, or start the installation if Chromium is not installed.

```bash
$ yarn dev
```

The template already defines the basic styles to be used for typesetting. Here is a preview of what you will see. By default, scss/theme_print.scss is applied. This style file is defined to display the trim marks and the text ("theme_print") in the upper left corner. You are free to rewrite the styles defined in the template.

![preview screen of the template](/assets/theme-sample.png)

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme
