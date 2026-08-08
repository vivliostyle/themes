---
"@vivliostyle/theme-base": major
---

Renamed custom properties so that their names match the CSS property they control.

BREAKING CHANGE: Rename the following variables in your theme.

Color variables now use the property name (`color` → `text-color`, `background-color` → `background-color`) instead of the `color-body` / `color-bg` pair:

| Before                       | After                              |
| ---------------------------- | ---------------------------------- |
| `--vs-color-body`            | `--vs-text-color`                  |
| `--vs-color-bg`              | `--vs-background-color`            |
| `--vs--anchor-color`         | `--vs--anchor-text-color`          |
| `--vs-footnote--color-body`  | `--vs-footnote--text-color`        |
| `--vs-page--color-bg`        | `--vs-page--background-color`      |
| `--vs-page--mbox-color-bg`   | `--vs-page--mbox-background-color` |
| `--vs-page--mbox-color-body` | `--vs-page--mbox-text-color`       |

The remaining renames align each variable with the logical property it sets, and fix one misspelling:

| Before                                                                            | After                                                                                     |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `--vs--html-font-size`                                                            | `--vs-font-size`                                                                          |
| `--vs--hr-border-width`                                                           | `--vs--hr-border-width-block-start`                                                       |
| `--vs-endnote--section-hr-border-width`                                           | `--vs-endnote--section-hr-border-width-block-start`                                       |
| `--vs-footnote--area-before-border-style`                                         | `--vs-footnote--area-before-border-style-block-start`                                     |
| `--vs-footnote--area-before-border-color`                                         | `--vs-footnote--area-before-border-color-block-start`                                     |
| `--vs-footnote--area-before-border-width`                                         | `--vs-footnote--area-before-border-width-block-start`                                     |
| `--vs-footnote--font-synthesize`                                                  | `--vs-footnote--font-synthesis`                                                           |
| `--vs-section--marker-margin-inline`                                              | `--vs-section--marker-margin-inline-end`                                                  |
| `--vs-section--h1-marker-margin-inline` … `--vs-section--h6-marker-margin-inline` | `--vs-section--h1-marker-margin-inline-end` … `--vs-section--h6-marker-margin-inline-end` |

`--vs--html-font-size` was only an indirection for `--vs-font-size` and has been removed; set `--vs-font-size` directly.

Also added `--vs--lists-padding-inline-start` as a shared default for `ul` and `ol`. `--vs--ul-padding-inline-start` and `--vs--ol-padding-inline-start` still work for per-list overrides.
