# @vivliostyle/theme-base

## 2.1.0

### Minor Changes

- [`b266db7`](https://github.com/vivliostyle/themes/commit/b266db7f306d1eba76b80772cb02fe1af70e543a) Thanks [@spring-raining](https://github.com/spring-raining)! - Support --vs-document-first-page-counter-reset variable

## 2.0.0

### Major Changes

- [#132](https://github.com/vivliostyle/themes/pull/132) [`2c59a27`](https://github.com/vivliostyle/themes/commit/2c59a27b14b3f7c721ba1f4a9bf78e3f1fea4e10) Thanks [@spring-raining](https://github.com/spring-raining)! - Update the displaying content of ToC markers

  - The default value of `--vs-toc--marker-content` has been changed
  - Added `--vs-toc--marker-padding-inline-end` to replace `--vs-toc--anchor-text-indent`

- [#132](https://github.com/vivliostyle/themes/pull/132) [`f7ff164`](https://github.com/vivliostyle/themes/commit/f7ff164f1df5c077c12a644c0b591631cafc4f41) Thanks [@spring-raining](https://github.com/spring-raining)! - The default value of `--vs-section--call-content` has been changed in the Japanese language environment

### Minor Changes

- [#133](https://github.com/vivliostyle/themes/pull/133) [`18ed51a`](https://github.com/vivliostyle/themes/commit/18ed51aea1248c440d1d77b2fab46450844dbbfd) Thanks [@spring-raining](https://github.com/spring-raining)! - Add variables to override the initial counter value at the document root.

  The following CSS variables are supported:

  - `--vs-crossref--root-counter-{fig|tbl|cite}`
  - `--vs-footnote--root-counter-footnote`
  - `--vs-section--root-counter-{sections|sec-h1|sec-h2|sec-h3|sec-h4|sec-h5|sec-h6}`

### Patch Changes

- [#133](https://github.com/vivliostyle/themes/pull/133) [`22b8286`](https://github.com/vivliostyle/themes/commit/22b8286ea5b28532a1cacd4a49a4aff2a886e9ee) Thanks [@spring-raining](https://github.com/spring-raining)! - Fix cases where both the chapter and part page counters are set

- [#132](https://github.com/vivliostyle/themes/pull/132) [`3d61446`](https://github.com/vivliostyle/themes/commit/3d614466d159744f05beed15f9164c036c841934) Thanks [@spring-raining](https://github.com/spring-raining)! - Update the CSS selector that specifies particular languages

- [#133](https://github.com/vivliostyle/themes/pull/133) [`fc5f428`](https://github.com/vivliostyle/themes/commit/fc5f428477a74e52614e9201148df2046ddc8d8b) Thanks [@spring-raining](https://github.com/spring-raining)! - Don't increment `vs-counter-doc` for ToC/cover documents

## 1.0.1

### Patch Changes

- [#122](https://github.com/vivliostyle/themes/pull/122) [`f5563ff`](https://github.com/vivliostyle/themes/commit/f5563ff9930cc5184070e9fd2ccdb16c6dd19ae5) Thanks [@spring-raining](https://github.com/spring-raining)! - Add a `main` property for package.json.
  This is useful for use with third-party libraries that are expected to have a `main` field in package.json.

## [1.0.0](https://github.com/vivliostyle/themes/compare/@vivliostyle/theme-base@1.0.0-beta.1...@vivliostyle/theme-base@1.0.0) (2023-08-10)

### Bug Fixes

- **theme-base:** Add a missing CSS variable ([6f06fff](https://github.com/vivliostyle/themes/commit/6f06fffc1e590d471f2a6a3f81c226e3d3aca9aa))

### Features

- **theme-base:** Update variables of CSS columns ([a75b3a8](https://github.com/vivliostyle/themes/commit/a75b3a8fda8a4bee073163926e0e1d35e23ffc0f))

## 1.0.0-beta.1 (2023-03-18)

- Release @vivliostyle/them-base
