---
"@vivliostyle/theme-base": major
---

Removed `utility-classes.css`. The stylesheet shipped one class per value of `break-before`, `break-after`, `break-inside`, `writing-mode`, `text-orientation`, `text-combine-upright` and `font-variant-numeric` — a fixed, arbitrary slice of CSS wearing class names, which neither the base theme nor any theme built on it used. A theme names the elements it styles, and a document that needs one of these properties is better served by a selector or a class of its own.

BREAKING CHANGE: `css/utility-classes.css` no longer exists, and neither the base theme nor `@vivliostyle/theme-slide` imports it any more. Remove the import, and replace each class with a rule that declares the property.

```css
/* Before: <h2 class="break-before-page"> */

/* After */
h2 {
  break-before: page;
}
```
