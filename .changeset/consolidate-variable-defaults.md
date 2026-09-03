---
"@vivliostyle/theme-base": major
---

Flattened the stylesheet layout and moved every variable default into a single stylesheet, `css/define.css`.

The `css/common/` and `css/partial/` directories are gone: each stylesheet now sits directly under `css/`. At the same time the defaults, which used to be spread across `css/common/meta-properties.css` and a `:root` block at the top of every partial, are collected in `css/define.css`. The values themselves are unchanged, and the package entry imports the new stylesheet, so nothing changes if you load the theme through it.

BREAKING CHANGE: If you import individual stylesheets instead of the package entry, drop the `common/` and `partial/` path segments and import the defaults (`define`) first. `css/common/meta-properties.css` no longer exists.

```css
/* Before */
@import url('@vivliostyle/theme-base/css/common/meta-properties.css');
@import url('@vivliostyle/theme-base/css/common/reset.css');
@import url('@vivliostyle/theme-base/css/partial/section.css');

/* After */
@import '@vivliostyle/theme-base/reset';
@import '@vivliostyle/theme-base/define';
@import '@vivliostyle/theme-base/section';
```

The syntax highlighting themes keep their own values and their `prism/` subpath, since only one of them is meant to be loaded at a time.
