---
"@vivliostyle/theme-base": major
---

Removed the `-on-screen` / `-on-print` / `-on-hover` variable suffixes. Instead of providing a dedicated variable per medium and state, the base variable is now redefined inside a media query or state selector.

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
  :is(#toc, [role='doc-toc']) li > a:hover {
    --vs-toc--anchor-text-decoration: underline;
  }
}
```

Note that hover styles are now applied only where `@media (hover: hover)` matches, so they no longer take effect on touch-only devices.
