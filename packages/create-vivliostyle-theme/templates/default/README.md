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

Run `vivliostyle-theme-scripts preview` to preview your `theme.css`.

```bash
vivliostyle-theme-scripts preview theme.css
```

You can specify layout file with `--layout` flag:

```bash
vivliostyle-theme-scripts preview theme.css --layout example/default.md
```

Run `vivliostyle-theme-scripts validate` before publishing your package.

```bash
vivliostyle-theme-scripts validate
```
