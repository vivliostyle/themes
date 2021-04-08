# {{capital name space=true}}

[![npm: version](https://flat.badgen.net/npm/v/{{kebab name}})](https://npmjs.com/package/{{kebab name}})
[![npm: total downloads](https://flat.badgen.net/npm/dt/{{kebab name}})](https://npmjs.com/package/{{kebab name}})
![npm: license](https://flat.badgen.net/npm/license/{{kebab name}})

{{description}}

## Install

```bash
npm install --save {{kebab name}}
# or
yarn add {{kebab name}}
```

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '{{kebab name}}',
};
```

## Dev

### Files

```
{{kebab name}}
├── LICENSE
├── README.md
├── example
│   ├── default.html       // auto generated
│   └── default.md         // 🖋
├── package.json
├── scss                   // 🖋
│   ├── theme_common.scss
│   ├── theme_print.scss
│   └── theme_screen.scss
├── theme_common.css       // auto generated
├── theme_common.css.map   // auto generated
├── theme_print.css        // auto generated
├── theme_print.css.map    // auto generated
├── theme_screen.css       // auto generated
├── theme_screen.css.map   // auto generated
└── vivliostyle.config.js
```

**example**: Contain sample manuscripts using your theme.

**scss**: You can add files for specific use (print, screen, cover, toc, preface, ...) and apply them at `theme` `entry > theme` in vivliostyle.config.js. Partial files whose names begin with `_` will be ignored.


### Commands

Run `vivliostyle preview` to preview your `theme_*.css`.

To watch file changes, use `dev` script.

```bash
npm run dev
# or
yarn dev
```

You can specify your CSS file and manuscript file for preview in vivliostyle.config.js:

```js
module.exports = {
  language: 'en',
  theme: 'theme_print.css',
  // theme: 'theme_screen.css',
  entry: [
      'example/default.md',
      // and more...
  ],
}
```

Run `vivliostyle-theme-scripts validate` before publishing your package.

```bash
npm run validate
# or
yarn validate
```
