# {{capital name space=true}}

[![npm: version](https://flat.badgen.net/npm/v/{{kebab name}})](https://npmjs.com/package/{{kebab name}})
[![npm: total downloads](https://flat.badgen.net/npm/dt/{{kebab name}})](https://npmjs.com/package/{{kebab name}})
![npm: license](https://flat.badgen.net/npm/license/{{kebab name}})

{{description}}

## Use

In `vivliostyle.config.js`:

```js
module.exports = {
  theme: '{{kebab name}}',
};
```

If you want to add your CSS:

```js
module.exports = {
  theme: [
    '{{kebab name}}',
    // add your CSS
  ],
};
```

## Dev

### Files

```
{{kebab name}}
├── LICENSE
├── README.md
├── example
│   ├── assets                            // auto generated
│   │   └── Logo (Mark + Type).png        // auto generated
│   └── default.md                        // 🖋
├── package.json
├── theme.css                             // 🖋
└── vivliostyle.config.js
```

**example**: Contain sample manuscripts using your theme.

### Commands

Run `vivliostyle preview` to preview your `theme.css`.

To watch file changes, use `example:preview` script.

```bash
npm run example:preview
# or
yarn example:preview
```

You can specify your CSS file and manuscript file for preview in vivliostyle.config.js:

```js
module.exports = {
  language: 'en',
  theme: ['node_modules/@vivliostyle/theme-base', '.'],
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
