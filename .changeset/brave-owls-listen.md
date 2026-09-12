---
"@vivliostyle/theme-academic": major
"@vivliostyle/theme-bunko": major
"@vivliostyle/theme-gutenberg": major
"@vivliostyle/theme-slide": major
"@vivliostyle/theme-techbook": major
"@vivliostyle/theme-epub3j": major
---

Vivliostyle Themes v3: the official themes are rebuilt on `@vivliostyle/theme-base` 3.0, importing it by npm package name and configuring running heads with its page variables. See the [migration guide](https://github.com/vivliostyle/themes/blob/main/docs/migration-v3.md) ([日本語](https://github.com/vivliostyle/themes/blob/main/docs/ja/migration-v3.md)) for the full list of changes, including the renamed `--vs-*` variables of `theme-base` that these themes expose.

BREAKING CHANGE: `@vivliostyle/cli` **11.3.1 or later** is required (previously `>=7`, or `>=8` for `theme-epub3j`). The stylesheets use CSS Nesting and import `@vivliostyle/theme-base` by its npm package name through the package `exports` field, which CLI 11.3.0 added.

BREAKING CHANGE: `theme-bunko`, `theme-techbook` and `theme-gutenberg` configure running heads and page numbers with the page variables of `theme-base`. `inside` / `outside` in `--vs-page--mbox-<box>-content` resolve to the left or right box per page side, so the themes no longer need `@page :left` / `@page :right` mirrors. Their own variables are removed:

| Theme             | Removed                                                                                                      | Replacement                                                                                                                                                             |
| :---------------- | :----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-bunko`     | `--vs-theme--page-top-left-content`, `--vs-theme--page-top-right-content`                                    | `--vs-page--mbox-top-outside-content` (`counter(page)`; left pages override it with `counter(page) '　' env(doc-title)` in `@page :left`)                               |
| `theme-techbook`  | `--vs-theme--page-top-left-content`, `--vs-theme--page-top-right-content`, `--vs-theme--page-bottom-content` | `--vs-page--mbox-top-outside-content` (`env(doc-title)`; `env(pub-title)` on left pages via `@page :left`), `--vs-page--mbox-bottom-outside-content` (`counter(page)`) |
| `theme-gutenberg` | `--vs-theme--page-top-content`, `--vs-theme--page-top-color-body`, `--vs-theme--page-bottom-content`         | `--vs-page--mbox-top-center-content` (`env(pub-title)`), `--vs-page--mbox-text-color` (`gray`), `--vs-page--mbox-bottom-outside-content` (`counter(page)`)             |

BREAKING CHANGE: Theme-specific variables that can be set with the variables of `theme-base` are removed.

| Theme            | Removed                                                                                          | Replacement                                                                                                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-academic` | `--vs-theme--figure-img-max-height`, `--vs-theme--figure-img-max-width`                          | `--vs--figure-item-max-size-block` (`8cm`), `--vs--figure-item-max-size-inline` (`10cm`)                                                                                    |
| `theme-bunko`    | `--vs-theme--subsection-text-indent`, `--vs-theme--anchor-color-body`                            | `--vs--heading-text-indent` (`3rem`; `--vs--h1-text-indent` stays `0`), `--vs--anchor-text-color` (`darkblue`, set in `@media screen`)                                      |
| `theme-slide`    | `--vs-theme--color-bg`, `--vs-theme--color-body`                                                 | `--vs-color-background`, `--vs-color-foreground` (`#000`; `--vs-theme--color-bg` had no effect)                                                                             |
| `theme-slide`    | `--vs-theme--h1-color`, `--vs-theme--h2-color`, `--vs-theme--h3-color`, `--vs-theme--h4-color`   | `--vs--h1-text-color` (`#212057`), `--vs--h2-text-color`, `--vs--h3-text-color`, `--vs--h4-text-color` (`#e84e39`)                                                          |
| `theme-slide`    | `--vs-theme--anchor-color`                                                                       | `--vs--anchor-text-color` (`#3498db`)                                                                                                                                       |
| `theme-techbook` | `--vs-theme--anchor-color-body`                                                                  | `--vs--anchor-text-color` (`#3498db`, set in `@media screen`)                                                                                                               |
| `theme-techbook` | `--vs-theme--blockquote-color-bg`, `--vs-theme--blockquote-color-body`                           | `--vs--blockquote-background-color` (`#ecf0f1`), `--vs--blockquote-text-color` (`#34495e`)                                                                                  |

BREAKING CHANGE: The theme-specific variables `--vs-theme--*` are renamed to `--vs-theme-<name>--*`.

```css
/* Before */
:root {
  --vs-theme--inline-code-color-bg: #ecf0f1;
}

/* After */
:root {
  --vs-theme-techbook--inline-code-color-bg: #ecf0f1;
}
```

BREAKING CHANGE: External links are no longer turned into footnotes. `theme-academic`, `theme-bunko`, `theme-gutenberg` and `theme-techbook` loaded `footnote-external-link.css` through `theme-all.css`, which no longer exists. Import `@vivliostyle/theme-base/footnote/external-links` in a custom stylesheet to keep the behavior.

BREAKING CHANGE: `theme-slide` no longer imports the utility classes (`break-before-page` and friends), which were removed from `theme-base`. Declare the property in a rule of your own instead:

```css
/* Before: <h2 class="break-before-page"> */

/* After */
h2 {
  break-before: page;
}
```

Every stylesheet now reads `@import '@vivliostyle/theme-base/…'`, so the `theme` array of `vivliostyle.config.js` no longer has to repeat the base stylesheets.
