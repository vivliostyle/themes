---
"@vivliostyle/theme-base": minor
---

Added a machine-readable description of every custom property the theme defines, published as `@vivliostyle/theme-base/css-variables.json`. It is generated from the stylesheets, so it stays in step with them.

Variables are grouped by their namespace, and each entry records the CSS property it feeds, the `@property` syntax its values must match, and its default:

```json
{
  "_meta-properties": {
    "font-size": {
      "_syntax": "large | larger | math | medium | small | smaller | x-large | x-small | xx-large | xx-small | xxx-large | <length-percentage>",
      "_property": "font-size",
      "_define": "100%"
    }
  },
  "section": {
    "anchor-text-decoration": { "_syntax": "*", "_property": "text-decoration" }
  }
}
```

`_syntax` falls back to `*` where the accepted values cannot be written as an `@property` syntax, and `_define` is absent for variables the theme leaves undefined so that a `var()` fallback can take over.

This is the first `exports` field on the package; every subpath that resolved before still resolves.
