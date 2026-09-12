# @vivliostyle/theme-slide

## 3.0.0

### Major Changes

- [#158](https://github.com/vivliostyle/themes/pull/158) [`e3bb168`](https://github.com/vivliostyle/themes/commit/e3bb1681c72df4d869c54813ffdbb0ca4d2c83c6) Thanks [@spring-raining](https://github.com/spring-raining)! - Vivliostyle Themes v3: the official themes are rebuilt on `@vivliostyle/theme-base` 3.0, importing it by npm package name and configuring running heads with its page variables. See the [migration guide](https://github.com/vivliostyle/themes/blob/main/docs/migration-v3.md) ([日本語](https://github.com/vivliostyle/themes/blob/main/docs/ja/migration-v3.md)) for the full list of changes, including the renamed `--vs-*` variables of `theme-base` that these themes expose.

  BREAKING CHANGE: `@vivliostyle/cli` **11.3.1 or later** is required (previously `>=7`, or `>=8` for `theme-epub3j`). The stylesheets use CSS Nesting and import `@vivliostyle/theme-base` by its npm package name through the package `exports` field, which CLI 11.3.0 added.

  BREAKING CHANGE: `theme-bunko`, `theme-techbook` and `theme-gutenberg` configure running heads and page numbers with the page variables of `theme-base`. `inside` / `outside` in `--vs-page--mbox-<box>-content` resolve to the left or right box per page side, so the themes no longer need `@page :left` / `@page :right` mirrors. Their own variables are removed:

  | Theme             | Removed                                                                                                      | Replacement                                                                                                                                                            |
  | :---------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `theme-bunko`     | `--vs-theme--page-top-left-content`, `--vs-theme--page-top-right-content`                                    | `--vs-page--mbox-top-outside-content` (`counter(page)`; left pages override it with `counter(page) '　' env(doc-title)` in `@page :left`)                              |
  | `theme-techbook`  | `--vs-theme--page-top-left-content`, `--vs-theme--page-top-right-content`, `--vs-theme--page-bottom-content` | `--vs-page--mbox-top-outside-content` (`env(doc-title)`; `env(pub-title)` on left pages via `@page :left`), `--vs-page--mbox-bottom-outside-content` (`counter(page)`) |
  | `theme-gutenberg` | `--vs-theme--page-top-content`, `--vs-theme--page-top-color-body`, `--vs-theme--page-bottom-content`         | `--vs-page--mbox-top-center-content` (`env(pub-title)`), `--vs-page--mbox-text-color` (`gray`), `--vs-page--mbox-bottom-outside-content` (`counter(page)`)             |

  BREAKING CHANGE: Theme-specific variables that can be set with the variables of `theme-base` are removed.

  | Theme            | Removed                                                                                        | Replacement                                                                                                                            |
  | :--------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
  | `theme-academic` | `--vs-theme--figure-img-max-height`, `--vs-theme--figure-img-max-width`                        | `--vs--figure-item-max-size-block` (`8cm`), `--vs--figure-item-max-size-inline` (`10cm`)                                               |
  | `theme-bunko`    | `--vs-theme--subsection-text-indent`, `--vs-theme--anchor-color-body`                          | `--vs--heading-text-indent` (`3rem`; `--vs--h1-text-indent` stays `0`), `--vs--anchor-text-color` (`darkblue`, set in `@media screen`) |
  | `theme-slide`    | `--vs-theme--color-bg`, `--vs-theme--color-body`                                               | `--vs-color-background`, `--vs-color-foreground` (`#000`; `--vs-theme--color-bg` had no effect)                                        |
  | `theme-slide`    | `--vs-theme--h1-color`, `--vs-theme--h2-color`, `--vs-theme--h3-color`, `--vs-theme--h4-color` | `--vs--h1-text-color` (`#212057`), `--vs--h2-text-color`, `--vs--h3-text-color`, `--vs--h4-text-color` (`#e84e39`)                     |
  | `theme-slide`    | `--vs-theme--anchor-color`                                                                     | `--vs--anchor-text-color` (`#3498db`)                                                                                                  |
  | `theme-techbook` | `--vs-theme--anchor-color-body`                                                                | `--vs--anchor-text-color` (`#3498db`, set in `@media screen`)                                                                          |
  | `theme-techbook` | `--vs-theme--blockquote-color-bg`, `--vs-theme--blockquote-color-body`                         | `--vs--blockquote-background-color` (`#ecf0f1`), `--vs--blockquote-text-color` (`#34495e`)                                             |

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

### Patch Changes

- Updated dependencies [[`e3bb168`](https://github.com/vivliostyle/themes/commit/e3bb1681c72df4d869c54813ffdbb0ca4d2c83c6)]:
  - @vivliostyle/theme-base@3.0.0

## 2.0.2

### Patch Changes

- [#152](https://github.com/vivliostyle/themes/pull/152) [`60fe785`](https://github.com/vivliostyle/themes/commit/60fe785352f4e6424382d40f542ab271cbf58097) Thanks [@spring-raining](https://github.com/spring-raining)! - Modernize the internal code. The packages are now ESM, and `vivliostyle.config.js` is written with `defineConfig` from `@vivliostyle/cli`. The published styles and CLI behavior are unchanged.

- Updated dependencies [[`60fe785`](https://github.com/vivliostyle/themes/commit/60fe785352f4e6424382d40f542ab271cbf58097)]:
  - @vivliostyle/theme-base@2.1.1

## 2.0.1

### Patch Changes

- [#143](https://github.com/vivliostyle/themes/pull/143) [`fe266b3`](https://github.com/vivliostyle/themes/commit/fe266b3bf4e3cb53a684fec3dd9d9acdb7894bc5) Thanks [@spring-raining](https://github.com/spring-raining)! - Use exact version of the base theme

- Updated dependencies [[`b266db7`](https://github.com/vivliostyle/themes/commit/b266db7f306d1eba76b80772cb02fe1af70e543a)]:
  - @vivliostyle/theme-base@2.1.0

## 2.0.0

### Major Changes

- [`0de1a1f`](https://github.com/vivliostyle/themes/commit/0de1a1fd702250a54c03831acd4050e45e0416ea) Thanks [@spring-raining](https://github.com/spring-raining)! - Update @vivliostyle/theme-base to v2.0.0

### Patch Changes

- Updated dependencies [[`22b8286`](https://github.com/vivliostyle/themes/commit/22b8286ea5b28532a1cacd4a49a4aff2a886e9ee), [`3d61446`](https://github.com/vivliostyle/themes/commit/3d614466d159744f05beed15f9164c036c841934), [`fc5f428`](https://github.com/vivliostyle/themes/commit/fc5f428477a74e52614e9201148df2046ddc8d8b), [`18ed51a`](https://github.com/vivliostyle/themes/commit/18ed51aea1248c440d1d77b2fab46450844dbbfd), [`2c59a27`](https://github.com/vivliostyle/themes/commit/2c59a27b14b3f7c721ba1f4a9bf78e3f1fea4e10), [`f7ff164`](https://github.com/vivliostyle/themes/commit/f7ff164f1df5c077c12a644c0b591631cafc4f41)]:
  - @vivliostyle/theme-base@2.0.0

## 1.0.1

### Patch Changes

- [#122](https://github.com/vivliostyle/themes/pull/122) [`f5563ff`](https://github.com/vivliostyle/themes/commit/f5563ff9930cc5184070e9fd2ccdb16c6dd19ae5) Thanks [@spring-raining](https://github.com/spring-raining)! - Add a `main` property for package.json.
  This is useful for use with third-party libraries that are expected to have a `main` field in package.json.
- Updated dependencies [[`f5563ff`](https://github.com/vivliostyle/themes/commit/f5563ff9930cc5184070e9fd2ccdb16c6dd19ae5)]:
  - @vivliostyle/theme-base@1.0.1

## [1.0.0](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@1.0.0-beta.1...@vivliostyle/theme-slide@1.0.0) (2023-08-10)

**Note:** Version bump only for package @vivliostyle/theme-slide

## [1.0.0-beta.1](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@0.5.1...@vivliostyle/theme-slide@1.0.0-beta.1) (2023-03-21)

### Feature

- Rewrite the theme with @vivliostyle/theme-base

## [0.5.1](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@0.5.0...@vivliostyle/theme-slide@0.5.1) (2022-04-20)

**Note:** Version bump only for package @vivliostyle/theme-slide

## [0.5.0](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@0.4.1...@vivliostyle/theme-slide@0.5.0) (2021-11-07)

### Features

- update cli version to v4.3.2 ([5be7268](https://github.com/vivliostyle/themes/commit/5be72685499e73826def6859e04f6645c859391e))

## [0.4.1](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@0.4.0...@vivliostyle/theme-slide@0.4.1) (2021-06-19)

**Note:** Version bump only for package @vivliostyle/theme-slide

## [0.4.0](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@0.3.0...@vivliostyle/theme-slide@0.4.0) (2021-04-08)

### Features

- **@vivliostyle/theme-slide:** follow create-vivliostyle-theme v0.3.0 ([ab4f2aa](https://github.com/vivliostyle/themes/commit/ab4f2aab46430dcf9bd39cefe9619cc30c673a43))

## [0.3.0](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@0.2.2...@vivliostyle/theme-slide@0.3.0) (2020-08-28)

### Features

- include scss and example files to packages ([d9694af](https://github.com/vivliostyle/themes/commit/d9694afea56d95569f707c19106b42ba56c28964))

## [0.2.2](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@0.2.1...@vivliostyle/theme-slide@0.2.2) (2020-07-02)

### Bug Fixes

- update example to use latest vfm syntax ([64bcb45](https://github.com/vivliostyle/themes/commit/64bcb45c27f4878b171c586597f031f5612002a7))

## [0.2.1](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-slide@0.2.0...@vivliostyle/theme-slide@0.2.1) (2020-07-01)

### Bug Fixes

- **@vivliostyle/theme-slide:** new style ([ae36878](https://github.com/vivliostyle/themes/commit/ae368782fd1cc68dfb1e06344a9ca9588b1f37dd))

## 0.2.0 (2020-07-01)

### Features

- vivliostyle-theme-scripts ([4bd3dfd](https://github.com/vivliostyle/themes/commit/4bd3dfd66ec47029e8bdf1b73ac3b2eae147a851))
