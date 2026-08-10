---
"@vivliostyle/theme-bunko": major
"@vivliostyle/theme-techbook": major
"@vivliostyle/theme-gutenberg": major
---

Running heads and page numbers are now configured with the page variables of `@vivliostyle/theme-base` instead of theme-specific variables. The base theme resolves `inside` / `outside` in `--vs-page--mbox-<box>-content` to the left or right margin box depending on the page side, so the themes no longer need `@page :left` / `@page :right` rules to mirror them.

BREAKING CHANGE: The following variables are removed. Set the base variables instead.

| Theme             | Removed                                                                                                          | Replacement                                                                                                                                                             |
| :---------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-bunko`     | `--vs-theme--page-top-left-content`, `--vs-theme--page-top-right-content`                                        | `--vs-page--mbox-top-outside-content` (`counter(page)`; left pages override it with `counter(page) '　' env(doc-title)` in `@page :left`)                               |
| `theme-techbook`  | `--vs-theme--page-top-left-content`, `--vs-theme--page-top-right-content`, `--vs-theme--page-bottom-content`     | `--vs-page--mbox-top-outside-content` (`env(doc-title)`; `env(pub-title)` on left pages via `@page :left`), `--vs-page--mbox-bottom-outside-content` (`counter(page)`) |
| `theme-gutenberg` | `--vs-theme--page-top-content`, `--vs-theme--page-top-color-body`, `--vs-theme--page-bottom-content`             | `--vs-page--mbox-top-center-content` (`env(pub-title)`), `--vs-page--mbox-text-color` (`gray`), `--vs-page--mbox-bottom-outside-content` (`counter(page)`)               |
