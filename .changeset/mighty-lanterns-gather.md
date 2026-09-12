---
"@vivliostyle/theme-base": major
---

Vivliostyle Themes v3: `@vivliostyle/theme-base` becomes a set of opt-in modules imported by npm package name, and its custom properties are renamed to match the CSS properties they control and extended to cover what used to need plain CSS.

The [migration guide](https://github.com/vivliostyle/themes/blob/main/docs/migration-v3.md) ([日本語](https://github.com/vivliostyle/themes/blob/main/docs/ja/migration-v3.md)) walks through every step with before/after examples. The summary below lists what breaks and what is new.

#### Requirements

BREAKING CHANGE: `@vivliostyle/cli` 11.3.1 or later is required (previously `>=7`). The stylesheets use CSS Nesting and are imported by npm package name through the package `exports` field, which CLI 11.3.0 added. `@vivliostyle/theme-base` must be installed in the project that imports it.

#### Stylesheet layout and imports

BREAKING CHANGE: `theme-all.css`, `theme-basic.css` and the `css/common/`, `css/partial/` and `css/lib/` directories no longer exist. The package entry (`@vivliostyle/theme-base`) carries the basic modules only (CSS reset, variable defaults, basic HTML tag styles); every other feature is a module imported by its own subpath. Paths relative to the themes directory (`../theme-base/theme-all.css`) stop working as well.

```css
/* Before */
@import url(@vivliostyle/theme-base/theme-all.css);

/* After */
@import '@vivliostyle/theme-base';
@import '@vivliostyle/theme-base/figure';
@import '@vivliostyle/theme-base/table';
@import '@vivliostyle/theme-base/citation';
@import '@vivliostyle/theme-base/endnote';
@import '@vivliostyle/theme-base/footnote';
@import '@vivliostyle/theme-base/page';
@import '@vivliostyle/theme-base/section';
@import '@vivliostyle/theme-base/toc';
```

| Before                                   | After                                                                        |
| :--------------------------------------- | :--------------------------------------------------------------------------- |
| `theme-basic.css`                        | `@vivliostyle/theme-base`                                                    |
| `theme-all.css`                          | `@vivliostyle/theme-base` plus the modules above                             |
| `css/common/{meta-properties,reset,basic}.css` | `@vivliostyle/theme-base/{define,reset,basic}`                         |
| `css/partial/crossref.css`               | `@vivliostyle/theme-base/figure`, `/table`, `/citation`                      |
| `css/partial/<module>.css`               | `@vivliostyle/theme-base/<module>`                                           |
| `css/partial/footnote-external-link.css` | `@vivliostyle/theme-base/footnote/external-links` (no longer loaded by default) |
| `css/partial/utility-classes.css`        | Removed                                                                      |
| `css/lib/prism/base.css`                 | `@vivliostyle/theme-base/prism`                                              |
| `css/lib/prism/theme-{prism,okaidia}.css` | `@vivliostyle/theme-base/prism/theme-{prism,okaidia}`                       |

The `import` option of `vivliostyle.config.js` resolves the same subpaths (`import: 'footnote'`); `import: 'theme-all.css'` does not resolve any more.

#### Renamed variables

BREAKING CHANGE: The document-wide colors and typefaces are eight role-based tokens, and every other variable is named after the CSS property it sets. The renames are mechanical; the values you set keep working under the new names.

| Before                                                         | After                                                                                |
| :------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `--vs-color-body`, `--vs-color-bg`, `--vs-border-color`        | `--vs-color-foreground`, `--vs-color-background`, `--vs-color-border`                |
| `--vs--html-font-size`                                         | `--vs-font-size`                                                                     |
| `--vs--anchor-color`                                           | `--vs--anchor-text-color`                                                            |
| `--vs-footnote--color-body`                                    | `--vs-footnote--text-color`                                                          |
| `--vs-page--color-bg`, `--vs-page--mbox-color-bg`, `--vs-page--mbox-color-body` | `--vs-page--background-color`, `--vs-page--mbox-background-color`, `--vs-page--mbox-text-color` |
| `--vs-prism--color`, `--vs-prism--color-<token>`               | `--vs-prism--text-color`, `--vs-prism--<token>-text-color`                           |
| `--vs-page--mbox-content-<box>`                                | `--vs-page--mbox-<box>-content`                                                      |
| `--vs-page--margin-{inner,outer}`                              | `--vs-page--margin-{inside,outside}`                                                 |
| `--vs-page--mbox-padding-<edge>-{inner,outer}`                 | `--vs-page--mbox-<edge>-padding-*`, `--vs-page--mbox-<box>-padding-*`                |
| `--vs--hr-border-width`, `--vs-endnote--section-hr-border-width` | `…-border-width-block-start`                                                       |
| `--vs-footnote--area-before-border-{style,color,width}`        | `…-block-start`                                                                      |
| `--vs-footnote--font-synthesize`                               | `--vs-footnote--font-synthesis`                                                      |
| `--vs-section--{,h1-…h6-}marker-margin-inline`                 | `…-marker-margin-inline-end`                                                         |
| `*-on-screen`, `*-on-print`, `*-on-hover`                      | Removed; redefine the base variable inside `@media print` / `@media (hover: hover)` and on the hovered element |
| `--vs-crossref--*`                                             | Removed; per-type `--vs-figure--*`, `--vs-table--*`, `--vs-citation--*`, shared `--vs-counter-style`, `--vs--crossref-call-*`, `--vs-crossref-{marker,call}-counter-prefix` |

New tokens: `--vs-color-{foreground,background,border}-alt`, `--vs-font-family-alt`, `--vs-font-family-monospace`. They default to the primary token and are not wired into element defaults; a theme points element variables at them explicitly.

#### Removed variables

BREAKING CHANGE: `--vs--{ul,ol}-minimum-inline-indent-size` (set `--vs--{ul,ol}-padding-inline-start` or `--vs--lists-padding-inline-start` instead) and `--vs-page--cover-break-{before,after}` (never read by any rule) are gone.

#### Changed defaults

BREAKING CHANGE:

| Variable                                            | Before                            | After                                                    |
| :-------------------------------------------------- | :-------------------------------- | :------------------------------------------------------- |
| `--vs-page--margin-top`, `--vs-page--margin-bottom` | `22mm`                            | `18mm`, via the new `--vs-page--margin`                  |
| `--vs--lists-padding-inline-start`                  | `var(--vs-spacing-inline-indent)` | `2rem`, and it is applied (see below)                    |
| `--vs--blockquote-margin-inline`                    | `var(--vs-spacing-inline-indent)` | `var(--vs-spacing-inline-indent) 0`                      |
| `--vs--figure-item-padding-inline`                  | `var(--vs-spacing-inline-indent)` | `0`, and it applies to replaced elements only            |
| `--vs--pre-overflow-x`                              | `auto`                            | `auto` on screen, `visible` on print                     |
| `--vs--p-hanging-punctuation`                       | `var(--vs-hanging-punctuation)`   | No default, so an ancestor can set it                    |

#### Changed behavior

BREAKING CHANGE:

- **Top-level lists are indented.** The `max()` indent of `ul` / `ol` referenced two variables without defaults and was dropped, so top-level lists had no indent. They are now indented by `--vs--lists-padding-inline-start`.
- **Theme rules take effect.** Table rules (`th, td { border-width }`) are no longer outranked by `:not(:last-child)` selectors; `figure` children other than replaced elements no longer get `padding-inline`; `b`, `strong` and `th` no longer fall back to the heading typeface; unset `--vs-footnote--*` properties inherit from the call site.
- **Named pages are assigned on `html` or `body`** with `:is(html, body):is(.<name>, [role='doc-<name>'])`. A `role="doc-*"` on an element inside the document no longer switches the named page; the `doc-chapter` / `doc-part` roles drive the chapter / part counters.
- **`vs-counter-sec-h2` … `h6` are reset by the parent section.** Define custom counters to keep them running through the document.
- **Hover styles apply only under `@media (hover: hover)`.**
- **Every `a[data-ref]` drops the default underline**; the screen placeholder for `a[data-ref='cite']` and the default `--vs-<type>--call-content` now render (both were empty in Vivliostyle).
- **External links are no longer footnoted by default.** `footnote-external-link.css` was part of `theme-all.css`; import `footnote/external-links` to keep it.
- **`utility-classes.css` is removed.** Declare `break-before: page` and friends in a rule of your own.
- **The footnote area uses the standard `@footnote` at-rule** instead of `@-adapt-footnote-area`.

#### New

- **Modules**: `listing` (`lst`), `equation` (`eq`), `theorem` (`thm`), `appendix` (upper-alpha, per section or per document), page references (`page`), `math` (VFM's `mathml` and `mathjax` output) and `sidenote` (numbered notes floated to the inline end). Every cross-reference type has `--vs-<type>--label`, `--vs-<type>--counter-style` and its own `root-counter-*` variables, an empty `<a data-ref="…" href="#id"></a>` is filled with the resolved number, and `--vs-crossref-{marker,call}-counter-prefix` prepends a chapter number to every default marker and call. A block without a `<caption>` can be numbered with a `.fig-caption` / `.tbl-caption` / `.lst-caption` paragraph next to it.
- **Endnotes**: counter-based numbering for layouts where `ol` markers fall short, notably vertical writing (`--vs-endnote--marker-*`, `--vs-endnote--call-content`, off by default); variables for the endnotes section box (`--vs-endnote--section-border-*`, `-padding-*`, `-ol-*`, heading and item typography); typography of calls and markers, including `text-combine-upright`, `text-orientation` and `vertical-align`.
- **Footnotes**: `--vs-footnote--{margin-block,padding-inline-start,text-indent,word-break}`, call and marker typography, `--vs-footnote--marker-{size-inline,text-indent}` for hanging numbers.
- **Citation list**: `--vs-citation--items-*` on the list, `--vs-citation--item-*` on the items, `--vs-citation--marker-{text-color,inset-inline-start}`.
- **Element variables** filling the gaps that used to need plain CSS: headings (color, background, padding, borders, `font-style`, `text-transform`, `string-set`), `figcaption` / `caption`, tables (per-part border color and style, row striping, `table-layout`, cell typography and padding), lists (`--vs--li-*`, `--vs--lists-marker-*`, `list-style-position`, `--vs--dl-margin-*`), `pre`, `blockquote` (and `--vs--blockquote-p-*`), inline elements (`--vs--sup-*`, `--vs--sub-*`, `--vs--rt-*`, `--vs--ruby-*`, `--vs--cite-*`, `--vs--bold-*`), paragraphs (`--vs--p-{font-size,padding-*}`, `--vs--p-first-text-indent`), `hr`, `--vs-column-rule-*`, `--vs-font-variant-numeric`.
- **Pages**: `--vs-page--border-*` around the page area, `--vs-page--{margin,padding}-{inside,outside}` and `-{left,right}`, per-edge `--vs-page--mbox-{top,bottom,left,right}-*` groups, per-box padding, and the spread-aware `--vs-page--mbox-{top,bottom}-{inside,outside}[-corner]-content` / `--vs-page--mbox-{inside,outside}-{top,middle,bottom}-content`.
- **`@vivliostyle/theme-base/css-variables.json`**: a generated, machine-readable description of every variable (its CSS property, `@property` syntax and default), the package's first `exports` entry.

#### License

The published files (`theme.css`, `css/`, `dist/`, `example/`, `vivliostyle.config.js`) stay under CC0 1.0. The source of the package (`src/`, `plugins/`, the build configuration) is now licensed under the Apache License 2.0, and the Prism color schemes `css/prism/theme-{prism,okaidia}.css` carry the MIT notice of the Prism themes they are derived from. `package.json` declares `(Apache-2.0 AND CC0-1.0 AND MIT)`, and `REUSE.toml` records the license of every file.

#### Fixes

- `--vs-footnote--font-stretch` fell back to itself, so `--vs-font-stretch` never reached footnotes; the `text-spacing` of `h3` fell back to `--vs--heading-letter-spacing`.
- The default `--vs-*--call-content` of figure, table and the other types rendered as empty in Vivliostyle because the counter-prefix `var()` had an empty fallback; the references now fall back to `''`.
- Anchors and `a[data-ref]` references no longer render in the UA link blue: the color chain no longer routes a CSS-wide keyword through nested `var()`, which Vivliostyle cannot resolve.
