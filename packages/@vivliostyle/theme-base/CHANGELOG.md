# @vivliostyle/theme-base

## 3.0.0

### Major Changes

- [#156](https://github.com/vivliostyle/themes/pull/156) [`766befe`](https://github.com/vivliostyle/themes/commit/766befe586f4160db52b13e0ca6e5e29611e9fa7) Thanks [@spring-raining](https://github.com/spring-raining)! - Renamed custom properties so that their names match the CSS property they control.

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
  | `--vs-prism--color`          | `--vs-prism--text-color`           |

  The per-token variables of the syntax highlighting themes follow the same rule, with the token name moving in front of the property name: `--vs-prism--color-comment` → `--vs-prism--comment-text-color`, `--vs-prism--color-class-name` → `--vs-prism--class-name-text-color`, and so on for all 30 tokens from `atrule` to `variable`.

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

- [#156](https://github.com/vivliostyle/themes/pull/156) [`53dc860`](https://github.com/vivliostyle/themes/commit/53dc8606dcf0e424487f1663b9a7eb375dc111cc) Thanks [@spring-raining](https://github.com/spring-raining)! - Flattened the stylesheet layout and moved every variable default into a single stylesheet, `css/define.css`.

  The `css/common/` and `css/partial/` directories are gone: each stylesheet now sits directly under `css/`. At the same time the defaults, which used to be spread across `css/common/meta-properties.css` and a `:root` block at the top of every partial, are collected in `css/define.css`. The values themselves are unchanged, and `theme-all.css` and `theme-basic.css` import the new stylesheet, so nothing changes if you load the theme through either of them.

  BREAKING CHANGE: If you import individual stylesheets instead of an entry point, drop the `common/` and `partial/` path segments and import `css/define.css` first. `css/common/meta-properties.css` no longer exists.

  ```css
  /* Before */
  @import url("@vivliostyle/theme-base/css/common/meta-properties.css");
  @import url("@vivliostyle/theme-base/css/common/reset.css");
  @import url("@vivliostyle/theme-base/css/partial/section.css");

  /* After */
  @import url("@vivliostyle/theme-base/css/reset.css");
  @import url("@vivliostyle/theme-base/css/define.css");
  @import url("@vivliostyle/theme-base/css/section.css");
  ```

  The syntax highlighting themes keep their own values and their `css/lib/prism/` path, since only one of them is meant to be loaded at a time.

- [#156](https://github.com/vivliostyle/themes/pull/156) [`766befe`](https://github.com/vivliostyle/themes/commit/766befe586f4160db52b13e0ca6e5e29611e9fa7) Thanks [@spring-raining](https://github.com/spring-raining)! - Removed the `-on-screen` / `-on-print` / `-on-hover` variable suffixes. Instead of providing a dedicated variable per medium and state, the base variable is now redefined inside a media query or state selector.

  BREAKING CHANGE: The following variables no longer exist. Override the base variable in the corresponding context instead:

  | Removed                                                                                   | Use instead                             |
  | ----------------------------------------------------------------------------------------- | --------------------------------------- |
  | `--vs-font-size-on-screen`, `--vs-font-size-on-print`                                     | `--vs-font-size`                        |
  | `--vs--pre-white-space-on-screen`, `--vs--pre-white-space-on-print`                       | `--vs--pre-white-space`                 |
  | `--vs--table-container-overflow-x-on-screen`, `--vs--table-container-overflow-x-on-print` | `--vs--table-container-overflow-x`      |
  | `--vs--anchor-text-decoration-on-hover`                                                   | `--vs--anchor-text-decoration`          |
  | `--vs-crossref--anchor-text-decoration-on-hover`                                          | `--vs-crossref--anchor-text-decoration` |
  | `--vs-crossref--call-fig-content-on-screen`                                               | `--vs-crossref--call-fig-content`       |
  | `--vs-crossref--call-tbl-content-on-screen`                                               | `--vs-crossref--call-tbl-content`       |
  | `--vs-crossref--call-cite-content-on-screen`                                              | `--vs-crossref--call-cite-content`      |
  | `--vs-endnote--anchor-text-decoration-on-hover`                                           | `--vs-endnote--anchor-text-decoration`  |
  | `--vs-endnote--backlink-display-on-print`                                                 | `--vs-endnote--backlink-display`        |
  | `--vs-section--anchor-text-decoration-on-hover`                                           | `--vs-section--anchor-text-decoration`  |
  | `--vs-toc--anchor-text-decoration-on-hover`                                               | `--vs-toc--anchor-text-decoration`      |

  For media-specific overrides, wrap `:root` in the media query:

  ```css
  /* Before */
  :root {
    --vs--pre-white-space-on-print: pre-wrap;
  }

  /* After */
  @media print {
    :root {
      --vs--pre-white-space: pre-wrap;
    }
  }
  ```

  For hover overrides, redefine the variable on the hovered element:

  ```css
  /* Before */
  :root {
    --vs-toc--anchor-text-decoration-on-hover: underline;
  }

  /* After */
  @media (hover: hover) {
    :is(#toc, [role="doc-toc"]) li > a:hover {
      --vs-toc--anchor-text-decoration: underline;
    }
  }
  ```

  Note that hover styles are now applied only where `@media (hover: hover)` matches, so they no longer take effect on touch-only devices.

- [#148](https://github.com/vivliostyle/themes/pull/148) [`8071192`](https://github.com/vivliostyle/themes/commit/8071192d39dba27d1dd7130031a0247858e276c7) Thanks [@MurakamiShinyu](https://github.com/MurakamiShinyu)! - Fixed the resetting behavior for `vs-counter-sec-*` counters. These are now reset by parent sections.

  BREAKING CHANGE: If your theme relies on the previous behavior of `vs-counter-sec-*`, you must define custom counters manually:

  ```css
  /* Create custom counters `non-reset-* */
  :root {
    --vs-document-root-counter-reset: non-reset-h1 non-reset-h2 non-reset-h3;
    --vs-section--h2-marker-content: counter(non-reset-h2);
    --vs-section--h3-marker-content: counter(non-reset-h2) "." counter(
        non-reset-h3
      );
  }
  /* Override the default counter-increment */
  section:has(> h2:first-child) {
    counter-increment: vs-counter-sections vs-counter-sec-h2 non-reset-h2;
  }
  section:has(> h3:first-child) {
    counter-increment: vs-counter-sections vs-counter-sec-h3 non-reset-h3;
  }
  ```

- [#156](https://github.com/vivliostyle/themes/pull/156) [`766befe`](https://github.com/vivliostyle/themes/commit/766befe586f4160db52b13e0ca6e5e29611e9fa7) Thanks [@spring-raining](https://github.com/spring-raining)! - Raised the `@vivliostyle/cli` peer dependency to `>=11` (previously `>=7`, or `>=8` for `@vivliostyle/theme-epub3j`). The scaffold generated by `create-vivliostyle-theme` declares the same range.

  BREAKING CHANGE: `@vivliostyle/cli` 10 and earlier are no longer supported. The published stylesheets now use CSS Nesting, which requires a newer Vivliostyle Core than those releases ship.

### Minor Changes

- [#154](https://github.com/vivliostyle/themes/pull/154) [`9ded683`](https://github.com/vivliostyle/themes/commit/9ded683a396ac9f6c32e7bef8c27ab620a1160bc) Thanks [@MurakamiShinyu](https://github.com/MurakamiShinyu)! - Change `@-adapt-footnote-area` to `@footnote`

- [#156](https://github.com/vivliostyle/themes/pull/156) [`53dc860`](https://github.com/vivliostyle/themes/commit/53dc8606dcf0e424487f1663b9a7eb375dc111cc) Thanks [@spring-raining](https://github.com/spring-raining)! - Added a machine-readable description of every custom property the theme defines, published as `@vivliostyle/theme-base/css-variables.json`. It is generated from the stylesheets, so it stays in step with them.

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
      "anchor-text-decoration": {
        "_syntax": "*",
        "_property": "text-decoration"
      }
    }
  }
  ```

  `_syntax` falls back to `*` where the accepted values cannot be written as an `@property` syntax, and `_define` is absent for variables the theme leaves undefined so that a `var()` fallback can take over.

  This is the first `exports` field on the package; every subpath that resolved before still resolves.

### Patch Changes

- [#156](https://github.com/vivliostyle/themes/pull/156) [`766befe`](https://github.com/vivliostyle/themes/commit/766befe586f4160db52b13e0ca6e5e29611e9fa7) Thanks [@spring-raining](https://github.com/spring-raining)! - Fixed broken variable fallback chains.

  - `--vs-footnote--font-stretch` fell back to itself, so `--vs-font-stretch` was never applied to footnotes. It now falls back to `--vs-font-stretch`.
  - The `text-spacing` of `h3` fell back to `--vs--heading-letter-spacing` instead of `--vs--heading-text-spacing`.
  - The screen-only placeholder for `a[data-ref='cite']::before` (`[???]`) was defined but never referenced, so cross-references to citations rendered nothing on screen media.

- [#156](https://github.com/vivliostyle/themes/pull/156) [`766befe`](https://github.com/vivliostyle/themes/commit/766befe586f4160db52b13e0ca6e5e29611e9fa7) Thanks [@spring-raining](https://github.com/spring-raining)! - Removed the unused `--vs-page--cover-break-before` and `--vs-page--cover-break-after` variables. They were declared on `:root` but never read by any rule, so setting them never had any effect and there is nothing to migrate. To control page breaks around a cover, set `break-before` / `break-after` on the cover element itself.

## 2.1.1

### Patch Changes

- [#152](https://github.com/vivliostyle/themes/pull/152) [`60fe785`](https://github.com/vivliostyle/themes/commit/60fe785352f4e6424382d40f542ab271cbf58097) Thanks [@spring-raining](https://github.com/spring-raining)! - Modernize the internal code. The packages are now ESM, and `vivliostyle.config.js` is written with `defineConfig` from `@vivliostyle/cli`. The published styles and CLI behavior are unchanged.

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
