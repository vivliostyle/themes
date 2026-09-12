# Migrating to Vivliostyle Themes v3

Vivliostyle Themes v3 is a major rewrite of `@vivliostyle/theme-base`: the package became a set of opt-in modules imported by npm package name, the document-wide colors and typefaces were unified into role-based design tokens, and the custom properties were renamed to match the CSS property they control and extended to cover the parts of a design that used to need plain CSS. The official themes were rebuilt on top of it.

This guide lists every change that can affect an existing project or theme and shows how to update it. If your project does not render as expected after upgrading, look for the variable or stylesheet you use in the tables below.

The affected packages and their new versions:

| Package                                                                                         | Version       |
| :---------------------------------------------------------------------------------------------- | :------------ |
| `@vivliostyle/theme-base`                                                                       | 2.1.1 → 3.0.0 |
| `@vivliostyle/theme-academic`, `-bunko`, `-gutenberg`, `-slide`, `-techbook`                    | 2.0.2 → 3.0.0 |
| `@vivliostyle/theme-epub3j`                                                                     | 1.1.1 → 2.0.0 |
| `create-vivliostyle-theme`                                                                      | 1.0.2 → 11.3.1 (merged into Vivliostyle CLI, see [`create-vivliostyle-theme`](#step-9-create-vivliostyle-theme-and-vivliostyle-theme-scripts)) |
| `vivliostyle-theme-scripts`                                                                     | 0.3.7 → deprecated (merged into Vivliostyle CLI, see [`vivliostyle-theme-scripts`](#step-9-create-vivliostyle-theme-and-vivliostyle-theme-scripts)) |

## Who needs to do what

- If you use an official theme from `vivliostyle.config.js` and nothing else, upgrade Vivliostyle CLI ([step 1](#step-1-upgrade-vivliostyle-cli)). Then check the [official themes](#step-8-official-themes) section: external links are no longer turned into footnotes, and the running-head variables of `theme-bunko`, `theme-techbook` and `theme-gutenberg` were replaced.
- If you override `--vs-*` variables in a custom stylesheet, also rename the variables you set ([step 3](#step-3-rename-variables)), and check the [removed variables](#step-4-removed-variables) and the [changed defaults](#step-5-changed-defaults).
- If you build your own theme on `@vivliostyle/theme-base`, work through every step, starting with the [imports](#step-2-update-stylesheet-imports).

## Step 1. Upgrade Vivliostyle CLI

All packages now require `@vivliostyle/cli` 11.3.1 or later (previously `>=7`, or `>=8` for `theme-epub3j`).

- The stylesheets use CSS Nesting, which needs the Vivliostyle.js shipped with CLI 11.3.0.
- The stylesheets import `@vivliostyle/theme-base` by its npm package name and rely on the package `exports` field. CLI 11.3.0 added this resolution; earlier releases fail to load them.

```sh
npm install --save-dev @vivliostyle/cli@latest
```

`@vivliostyle/theme-base` must be installed in the project that imports it, including a theme package that depends on it (declare it in `dependencies`).

## Step 2. Update stylesheet imports

### The presets are gone

`theme-all.css` and `theme-basic.css` no longer exist, and neither do the `css/common/`, `css/partial/` and `css/lib/` directories. The package entry carries only the basic modules: the CSS reset, the variable defaults and the styles of basic HTML tags. Every other feature is a module imported by its own subpath.

| Before (v2)                                   | After (v3)                                                                        |
| :-------------------------------------------- | :-------------------------------------------------------------------------------- |
| `theme-basic.css`                             | `@vivliostyle/theme-base`                                                         |
| `theme-all.css`                               | `@vivliostyle/theme-base` plus the feature modules you use (see below)            |
| `css/common/meta-properties.css`              | `@vivliostyle/theme-base/define`                                                  |
| `css/common/reset.css`                        | `@vivliostyle/theme-base/reset`                                                   |
| `css/common/basic.css`                        | `@vivliostyle/theme-base/basic`                                                   |
| `css/partial/crossref.css`                    | `@vivliostyle/theme-base/figure`, `/table`, `/citation` (one module per type)     |
| `css/partial/endnote.css`                     | `@vivliostyle/theme-base/endnote`                                                 |
| `css/partial/footnote.css`                    | `@vivliostyle/theme-base/footnote`                                                |
| `css/partial/footnote-external-link.css`      | `@vivliostyle/theme-base/footnote/external-links`                                 |
| `css/partial/page.css`                        | `@vivliostyle/theme-base/page`                                                    |
| `css/partial/section.css`                     | `@vivliostyle/theme-base/section`                                                 |
| `css/partial/toc.css`                         | `@vivliostyle/theme-base/toc`                                                     |
| `css/partial/utility-classes.css`             | Removed, see [utility classes](#utility-classes)                                  |
| `css/lib/prism/base.css`                      | `@vivliostyle/theme-base/prism`                                                   |
| `css/lib/prism/theme-prism.css`               | `@vivliostyle/theme-base/prism/theme-prism`                                       |
| `css/lib/prism/theme-okaidia.css`             | `@vivliostyle/theme-base/prism/theme-okaidia`                                     |

Import the package by name rather than through a path relative to the themes directory such as `@import url(../theme-base/theme-all.css)`.

### In CSS

```css
/* Before */
@import url(@vivliostyle/theme-base/theme-all.css);

/* After: the entry, then the modules you use */
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

The list above reproduces what `theme-all.css` used to load, with two differences:

- `footnote-external-link.css` was part of `theme-all.css`. To keep turning external links into footnotes, add `@import '@vivliostyle/theme-base/footnote/external-links';`.
- `utility-classes.css` was removed; see [utility classes](#utility-classes).

New in v3, and worth adding if you use the corresponding markup: `listing`, `equation`, `theorem`, `appendix`, `math`, `sidenote`. See [What's new](#step-10-whats-new).

### In `vivliostyle.config.js`

The `import` option resolves the same subpaths. `import: 'theme-all.css'` and `import: 'theme-basic.css'` no longer resolve.

```js
// Before
export default {
  theme: { specifier: '@vivliostyle/theme-base', import: 'theme-all.css' },
};

// After: the entry is the package itself, each module is a separate import
export default {
  theme: [
    '@vivliostyle/theme-base',
    { specifier: '@vivliostyle/theme-base', import: 'footnote' },
    { specifier: '@vivliostyle/theme-base', import: 'page' },
  ],
};
```

Since Vivliostyle CLI 11.3.0 installs the Vivliostyle Themes imported from CSS automatically, a custom stylesheet with `@import` rules that the config points at is the shorter option.

## Step 3. Rename variables

Every rename below is mechanical: the value you set keeps working under the new name. Search your stylesheets for the names in the left column.

### Design tokens

The document-wide colors and typefaces are now eight role-based tokens. `-alt` tokens describe a secondary role (muted text, shaded panels, lighter rules, a second typeface) and default to the primary token, so a theme that sets none of them looks the same as before.

| Before                     | After                                                                         |
| :------------------------- | :---------------------------------------------------------------------------- |
| `--vs-color-body`          | `--vs-color-foreground`                                                       |
| `--vs-color-bg`            | `--vs-color-background`                                                       |
| `--vs-border-color`        | `--vs-color-border`                                                           |
| `--vs--html-font-size`     | `--vs-font-size` (the indirection is gone; set `--vs-font-size` directly)     |
| (new)                      | `--vs-color-foreground-alt`, `--vs-color-background-alt`, `--vs-color-border-alt` |
| (new)                      | `--vs-font-family-alt`, `--vs-font-family-monospace`                          |

The basic stylesheet does not use the `-alt` tokens as element defaults. To use them, point the element variables at them in your theme, e.g. `--vs--figcaption-text-color: var(--vs-color-foreground-alt)`.

### Names you can infer from the CSS property

Color variables use the property name (`text-color` for `color`, `background-color`), and the remaining renames spell out the logical side they apply to or fix a misspelling.

| Before                                                                            | After                                                                                     |
| :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `--vs--anchor-color`                                                              | `--vs--anchor-text-color`                                                                 |
| `--vs-footnote--color-body`                                                       | `--vs-footnote--text-color`                                                               |
| `--vs-page--color-bg`                                                             | `--vs-page--background-color`                                                             |
| `--vs-page--mbox-color-bg`                                                        | `--vs-page--mbox-background-color`                                                        |
| `--vs-page--mbox-color-body`                                                      | `--vs-page--mbox-text-color`                                                              |
| `--vs-prism--color`                                                               | `--vs-prism--text-color`                                                                  |
| `--vs-prism--color-<token>` (30 tokens, `atrule` … `variable`)                    | `--vs-prism--<token>-text-color`, e.g. `--vs-prism--comment-text-color`                   |
| `--vs--hr-border-width`                                                           | `--vs--hr-border-width-block-start`                                                       |
| `--vs-endnote--section-hr-border-width`                                           | `--vs-endnote--section-hr-border-width-block-start`                                       |
| `--vs-footnote--area-before-border-{style,color,width}`                           | `--vs-footnote--area-before-border-{style,color,width}-block-start`                       |
| `--vs-footnote--font-synthesize`                                                  | `--vs-footnote--font-synthesis`                                                           |
| `--vs-section--marker-margin-inline`                                              | `--vs-section--marker-margin-inline-end`                                                  |
| `--vs-section--h1-marker-margin-inline` … `--vs-section--h6-marker-margin-inline` | `--vs-section--h1-marker-margin-inline-end` … `--vs-section--h6-marker-margin-inline-end` |

### Page margins and margin boxes

The per-box variables read `--vs-page--mbox-<box>-<property>`, and variables for pages that mirror between left and right were added.

| Before                                                              | After                                                                                                                         |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| `--vs-page--mbox-content-<box>` (16 boxes, `top-left-corner` … `bottom-right-corner`) | `--vs-page--mbox-<box>-content`, e.g. `--vs-page--mbox-top-left-content`                                          |
| `--vs-page--margin-inner`, `--vs-page--margin-outer`                | `--vs-page--margin-inside`, `--vs-page--margin-outside`                                                                       |
| `--vs-page--margin-top`, `--vs-page--margin-bottom`                 | Unchanged, but they now fall back to the new `--vs-page--margin` (default `18mm`, see [changed defaults](#step-5-changed-defaults)) |
| `--vs-page--mbox-padding-{top,bottom,left,right}-{inner,outer}`     | Per-edge `--vs-page--mbox-{top,bottom,left,right}-padding-*` and per-box `--vs-page--mbox-<box>-padding-*`                    |

Running heads that differ between left and right pages no longer need `@page :left` / `@page :right`: the variables named `inside` / `outside`, such as `--vs-page--mbox-top-outside-content` and `--vs-page--mbox-bottom-inside-content`, resolve to the left or right box depending on the page side.

```css
/* Before */
@page :left {
  --vs-page--mbox-content-top-left: counter(page);
}
@page :right {
  --vs-page--mbox-content-top-right: counter(page);
}

/* After */
:root {
  --vs-page--mbox-top-outside-content: counter(page);
}
```

### The `-on-screen` / `-on-print` / `-on-hover` suffixes are gone

Instead of a dedicated variable per medium and state, redefine the base variable inside a media query or on the hovered element.

| Removed                                                                                   | Use instead                            |
| :---------------------------------------------------------------------------------------- | :------------------------------------- |
| `--vs-font-size-on-screen`, `--vs-font-size-on-print`                                     | `--vs-font-size`                       |
| `--vs--pre-white-space-on-screen`, `--vs--pre-white-space-on-print`                       | `--vs--pre-white-space`                |
| `--vs--table-container-overflow-x-on-screen`, `--vs--table-container-overflow-x-on-print` | `--vs--table-container-overflow-x`     |
| `--vs--anchor-text-decoration-on-hover`                                                   | `--vs--anchor-text-decoration`         |
| `--vs-crossref--anchor-text-decoration-on-hover`                                          | `--vs--crossref-call-text-decoration`  |
| `--vs-crossref--call-fig-content-on-screen`                                               | `--vs-figure--call-content`            |
| `--vs-crossref--call-tbl-content-on-screen`                                               | `--vs-table--call-content`             |
| `--vs-crossref--call-cite-content-on-screen`                                              | `--vs-citation--call-content`          |
| `--vs-endnote--anchor-text-decoration-on-hover`                                           | `--vs-endnote--anchor-text-decoration` |
| `--vs-endnote--backlink-display-on-print`                                                 | `--vs-endnote--backlink-display`       |
| `--vs-section--anchor-text-decoration-on-hover`                                           | `--vs--crossref-call-text-decoration`  |
| `--vs-toc--anchor-text-decoration-on-hover`                                               | `--vs-toc--anchor-text-decoration`     |

```css
/* Before */
:root {
  --vs--pre-white-space-on-print: pre-wrap;
  --vs-toc--anchor-text-decoration-on-hover: underline;
}

/* After */
@media print {
  :root {
    --vs--pre-white-space: pre-wrap;
  }
}
@media (hover: hover) {
  :is(#toc, [role='doc-toc']) li > a:hover {
    --vs-toc--anchor-text-decoration: underline;
  }
}
```

### Cross-references: one module and namespace per type

`crossref.css` was split into the `figure`, `table` and `citation` modules (plus the new `listing`, `equation`, `theorem`, `appendix` and page references). The `--vs-crossref--` namespace is gone: per-type variables moved into their own namespaces, and the shared defaults became root-level variables that ship with the basic stylesheet.

| Before                                                          | After                                                                                          |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `--vs-crossref--anchor-text-decoration`                         | `--vs--crossref-call-text-decoration`                                                          |
| `--vs-crossref--call-text-color`                                | `--vs--crossref-call-text-color`                                                               |
| `--vs-crossref--call-margin-inline`                             | `--vs--crossref-call-margin-inline`                                                            |
| `--vs-crossref--call-display`                                   | `--vs--crossref-call-display`, or per type (`--vs-figure--call-display`, …)                    |
| `--vs-crossref--counter-style`                                  | `--vs-counter-style` (shared), `--vs-<type>--counter-style` (per type)                          |
| `--vs-crossref--marker-counter-prefix`                          | `--vs-crossref-marker-counter-prefix`                                                          |
| `--vs-crossref--call-counter-prefix`                            | `--vs-crossref-call-counter-prefix`                                                            |
| `--vs-crossref--call-{fig,tbl,cite}-content`                    | `--vs-figure--call-content`, `--vs-table--call-content`, `--vs-citation--call-content`         |
| `--vs-crossref--marker-{fig,tbl,cite}-content`                  | `--vs-figure--marker-content`, `--vs-table--marker-content`, `--vs-citation--marker-content`   |
| `--vs-crossref--marker-{fig,tbl,cite}-margin-inline`            | `--vs-figure--marker-margin-inline`, `--vs-table--…`, `--vs-citation--…`                       |
| `--vs-crossref--marker-display`, `--vs-crossref--marker-margin-inline` | Per type: `--vs-figure--marker-display`, `--vs-table--marker-margin-inline`, …          |
| `--vs-crossref--root-counter-{fig,tbl,cite}`                    | `--vs-figure--root-counter-fig`, `--vs-table--root-counter-tbl`, `--vs-citation--root-counter-cite` |
| `--vs-crossref--root-counter-reset`                             | `--vs-<type>--root-counter-reset`, per type                                                    |
| `--vs-section--anchor-text-decoration`, `--vs-section--call-margin-inline` | Section references share the generic `--vs--crossref-call-*` defaults               |

```css
/* Before */
@import url(@vivliostyle/theme-base/css/partial/crossref.css);
:root {
  --vs-crossref--counter-style: upper-roman;
  --vs-crossref--marker-fig-content: 'Fig. ' counter(vs-counter-fig) ' ';
  --vs-crossref--marker-display: none;
}

/* After */
@import '@vivliostyle/theme-base/figure';
@import '@vivliostyle/theme-base/table';
@import '@vivliostyle/theme-base/citation';
:root {
  --vs-counter-style: upper-roman;
  --vs-figure--marker-content: 'Fig. ' counter(vs-counter-fig) ' ';
  --vs-figure--marker-display: none;
  --vs-table--marker-display: none;
  --vs-citation--marker-display: none;
}
```

## Step 4. Removed variables

These have no one-to-one replacement.

| Removed                                                                      | What to do                                                                                                                    |
| :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `--vs--ul-minimum-inline-indent-size`, `--vs--ol-minimum-inline-indent-size` | Set the indent directly with `--vs--ul-padding-inline-start` / `--vs--ol-padding-inline-start`, or the shared `--vs--lists-padding-inline-start` |
| `--vs-page--cover-break-before`, `--vs-page--cover-break-after`              | They were never read by any rule. Set `break-before` / `break-after` on the cover element itself                              |
| `--vs-theme--page-*` of the official themes                                  | See [official themes](#step-8-official-themes)                                                                                |

## Step 5. Changed defaults

| Variable                           | Before                            | After                                            |
| :--------------------------------- | :-------------------------------- | :----------------------------------------------- |
| `--vs-page--margin-top`, `--vs-page--margin-bottom` | `22mm`           | `18mm` (via the new `--vs-page--margin`); set them explicitly to keep `22mm` |
| `--vs--lists-padding-inline-start` | `var(--vs-spacing-inline-indent)` | `2rem`, and top-level lists are now indented at all (see [lists](#list-indentation)) |
| `--vs--blockquote-margin-inline`   | `var(--vs-spacing-inline-indent)` | `var(--vs-spacing-inline-indent) 0`              |
| `--vs--figure-item-padding-inline` | `var(--vs-spacing-inline-indent)` | `0`, and it applies to replaced elements only    |
| `--vs--pre-overflow-x`             | `auto`                            | `auto` on screen, `visible` on print             |
| `--vs--p-hanging-punctuation`      | `var(--vs-hanging-punctuation)`   | No default, so an ancestor can set it            |
| `--vs--anchor-text-color`          | `inherit` (as `--vs--anchor-color`) | `var(--vs-color-foreground)`                   |
| `--vs-page--mbox-text-color`       | `inherit` (as `--vs-page--mbox-color-body`) | `var(--vs-color-foreground)`           |

## Step 6. Behavior changes

### List indentation

The top level of `ul` / `ol` used to be laid out with `max(var(--vs--ul-padding-inline-start), var(--vs--ul-minimum-inline-indent-size))`. Neither variable had a default, so the declaration was dropped and top-level lists had no indent, with their markers hanging outside the text block. Lists are now indented by `--vs--lists-padding-inline-start` (default `2rem`). Set it to `0` to keep the old rendering.

### Rules a theme writes now take effect

- `th, td { border-width: … }` in a theme was outranked by `tr:not(:last-child)` and `th:not(:last-child), td:not(:last-child)`. Those selectors are now wrapped in `:where()`.
- `figure > *` no longer receives `padding-inline` unless it is a replaced element (`img`, `video`, …), so the used size of `pre`, `div` and `table` inside a figure no longer changes.
- `b`, `strong` and `th` no longer fall back to `--vs--heading-font-family`. Setting one typeface for all headings no longer changes bold body text or table headers.
- Unset `--vs-footnote--*` properties are inherited from the call site instead of being pinned to the document default.

### Named pages are assigned on `html` or `body`

Named pages for document roles (`chapter`, `part`, `appendix`, `toc`, `cover`, `bibliography`, `colophon`, …) are matched with `:is(html, body):is(.<name>, [role='doc-<name>'])`. A `role="doc-*"` attribute on an element inside the document no longer switches the named page: put the class or the role on `html` or `body` (for example through VFM frontmatter). A mid-document cover keeps its element-level hook (`.cover`, `section:has(> .cover:first-child)`). The DPUB-ARIA roles `doc-chapter` and `doc-part` now drive the chapter / part counters in addition to the classes, and the `toc` / `cover` detectors match `html` as well as `body`.

### Heading counters reset under their parent section

`vs-counter-sec-h2` … `vs-counter-sec-h6` are now reset by the parent section, so the first `h3` under every `h2` counts from 1. Themes that relied on the counters running through the whole document must define their own counters:

```css
:root {
  --vs-document-root-counter-reset: non-reset-h2 non-reset-h3;
  --vs-section--h2-marker-content: counter(non-reset-h2);
  --vs-section--h3-marker-content: counter(non-reset-h2) '.' counter(non-reset-h3);
}
section:has(> h2:first-child) {
  counter-increment: vs-counter-sections vs-counter-sec-h2 non-reset-h2;
}
section:has(> h3:first-child) {
  counter-increment: vs-counter-sections vs-counter-sec-h3 non-reset-h3;
}
```

### Hover styles only where hovering exists

Hover styles (anchor underline, table-of-contents and note links) apply only where `@media (hover: hover)` matches, so they no longer take effect on touch-only devices.

### Cross-reference calls

- Every `a[data-ref]`, including theme-defined types, drops the default underline. Restore it with `--vs--crossref-call-text-decoration: underline`.
- The screen-only placeholder `[???]` for citation references was defined but never used, so `a[data-ref='cite']` rendered nothing on screen. It now renders.
- The default `--vs-<type>--call-content` values were rendering as empty in Vivliostyle because the counter-prefix `var()` had an empty fallback. They now render.

### External links are no longer footnoted by default

`footnote-external-link.css` was part of `theme-all.css`. In v3 the stylesheet is the `footnote/external-links` module and is not imported by the entry or by any official theme. Add `@import '@vivliostyle/theme-base/footnote/external-links';` to keep it.

### Utility classes

`utility-classes.css`, which provided one class per value of `break-before`, `break-after`, `break-inside`, `writing-mode`, `text-orientation`, `text-combine-upright` and `font-variant-numeric`, was removed. Declare the property in a rule of your own instead:

```css
/* Before: <h2 class="break-before-page"> */

/* After */
h2 {
  break-before: page;
}
```

### The footnote area rule

The footnote area is styled with the standard `@footnote` at-rule instead of the Vivliostyle-specific `@-adapt-footnote-area`. Custom rules that targeted `@-adapt-footnote-area` should use `@footnote`.

## Step 7. Building a theme on `theme-base`

- Import the entry first, then the modules; the variable defaults (`define`) ship with the entry.
- Variable defaults are now spread over the stylesheets and aggregated into `css/define.css`. Every variable, including the ones without a default, is described in the generated `@vivliostyle/theme-base/css-variables.json` (its CSS property, `@property` syntax and default).
- Lengths need a unit: `0` is a `<number>`, and a variable holding it is dropped wherever a length is required.
- Set `--vs--*` variables rather than re-declaring the property. The rules use logical properties, and a physical `margin` / `padding` shorthand does not reliably cancel them.

## Step 8. Official themes

All official themes require `@vivliostyle/cli` 11.3.1 or later. Their stylesheets import `@vivliostyle/theme-base` by package name, so the `theme` array of `vivliostyle.config.js` no longer needs to list the base stylesheets (`@vivliostyle/theme-base` comes with them as a dependency).

### Running heads and page numbers

`theme-bunko`, `theme-techbook` and `theme-gutenberg` configure running heads and page numbers with the page variables of `theme-base`. Their theme-specific variables are removed:

| Theme             | Removed                                                                                                      | Replacement                                                                                                                                                             |
| :---------------- | :----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-bunko`     | `--vs-theme--page-top-left-content`, `--vs-theme--page-top-right-content`                                    | `--vs-page--mbox-top-outside-content` (`counter(page)`; left pages override it with `counter(page) '　' env(doc-title)` in `@page :left`)                               |
| `theme-techbook`  | `--vs-theme--page-top-left-content`, `--vs-theme--page-top-right-content`, `--vs-theme--page-bottom-content` | `--vs-page--mbox-top-outside-content` (`env(doc-title)`; `env(pub-title)` on left pages via `@page :left`), `--vs-page--mbox-bottom-outside-content` (`counter(page)`) |
| `theme-gutenberg` | `--vs-theme--page-top-content`, `--vs-theme--page-top-color-body`, `--vs-theme--page-bottom-content`         | `--vs-page--mbox-top-center-content` (`env(pub-title)`), `--vs-page--mbox-text-color` (`gray`), `--vs-page--mbox-bottom-outside-content` (`counter(page)`)             |

### Other changes

- `theme-academic`, `theme-bunko`, `theme-gutenberg` and `theme-techbook` loaded `theme-all.css`, so external links were footnoted. They no longer are; add the `footnote/external-links` import in a custom stylesheet to restore it.
- `theme-slide` no longer imports the utility classes (`break-before-page` and friends). See [utility classes](#utility-classes).
- The variables of `theme-base` that the official themes expose follow the renames above.

## Step 9. `create-vivliostyle-theme` and `vivliostyle-theme-scripts`

`create-vivliostyle-theme` and `vivliostyle-theme-scripts` were merged into Vivliostyle CLI and replaced by the `vivliostyle theme` command.

- The `create-vivliostyle-theme` package is still published. It now works as an alias of the `vivliostyle theme create` command.
- The `vivliostyle-theme-scripts` package is deprecated. If you use it, switch to the following commands:
  - `vivliostyle-theme preview` is replaced by the preview of Vivliostyle CLI (`vivliostyle preview`).
  - `vivliostyle-theme validate` is replaced by `vivliostyle theme validate`.

## Step 10. What's new

Beyond the changes above, v3 adds the following features.

- Modules: `listing` (code listings, `lst`), `equation` (`eq`), `theorem` (`thm`), `appendix` (`appendix`), page references (`page`, in the `page` module), `math` (VFM math output for the `mathml` and `mathjax` renderers) and `sidenote` (numbered notes floated to the inline end). Each cross-reference type has `--vs-<type>--label`, `--vs-<type>--counter-style` and its own `root-counter-*` variables; `--vs-crossref-{marker,call}-counter-prefix` prepends a chapter number to every default marker and call.
- Endnotes: counter-based numbering for layouts where `ol` markers fall short (`--vs-endnote--marker-*`, `--vs-endnote--call-content`), variables for the endnotes section box (`--vs-endnote--section-*`), and the typography of calls and markers.
- Citation list: `--vs-citation--items-*`, `--vs-citation--item-*` and `--vs-citation--marker-text-color`.
- Element variables filling the gaps that used to need plain CSS: headings (color, background, padding, borders, `string-set`), captions, tables (borders per part, row striping, cell typography), lists (`--vs--li-*`, `li::marker`), `pre`, `blockquote`, inline elements (`sup`, `sub`, `ruby`, `cite`), paragraphs (`--vs--p-first-text-indent`), `hr`, page borders (`--vs-page--border-*`), spread-aware page margins (`--vs-page--{margin,padding}-{inside,outside}`) and margin boxes.
- `css-variables.json`: a machine-readable description of every variable, published as `@vivliostyle/theme-base/css-variables.json`.

The module documentation lives in [`src/<module>/README.md`](https://github.com/vivliostyle/themes/tree/main/packages/%40vivliostyle/theme-base/src), and the [package README](https://github.com/vivliostyle/themes/tree/main/packages/%40vivliostyle/theme-base#readme) lists them all.

## Checklist

1. `@vivliostyle/cli` is 11.3.1 or later.
2. No stylesheet imports `theme-all.css`, `theme-basic.css`, `css/common/`, `css/partial/`, `css/lib/` or a path relative to the themes directory.
3. `footnote/external-links` is imported if external links should become footnotes.
4. No `--vs-color-body`, `--vs-color-bg`, `--vs-border-color`, `--vs--html-font-size`, `-color-body`, `-color-bg`, `-on-screen`, `-on-print`, `-on-hover`, `--vs-crossref--` or `--vs-page--mbox-content-` remains in your stylesheets.
5. Page margins, list indent and blockquote margins look as intended after the default changes.
6. Named pages are set on `html` / `body`, and heading counters number the way you expect.
