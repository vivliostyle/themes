---
"@vivliostyle/theme-base": major
---

Split the cross-reference stylesheet into one module per reference type, and added equations, theorems, code listings, appendices and page references.

`css/crossref.css` is gone. Each reference type lives in its own stylesheet with its own variable namespace: [figure.css](css/figure.css) (`--vs-figure--*`), [table.css](css/table.css), [citation.css](css/citation.css), [listing.css](css/listing.css), [equation.css](css/equation.css), [theorem.css](css/theorem.css) and [appendix.css](css/appendix.css), while page references ship with [page.css](css/page.css) (`--vs-page--call-*`). The shared defaults — the numbering style (`--vs-counter-style`), the generic `a[data-ref]` anchor treatment (`--vs--crossref-call-*`) and the chapter-prefix hooks (`--vs-crossref-{marker,call}-counter-prefix`) — are part of the basic stylesheet, so they need no separate import. `theme-all.css` imports every module.

New reference types, each with an empty `<a data-ref="…" href="#id"></a>` call filled with the resolved number:

- `lst` — a captioned code fence (VFM's `lang:title` syntax) or a `figure.lst` is numbered with `vs-counter-lst` ("Listing N: "); hide the label with `--vs-listing--marker-display: none`.
- `eq` — a display formula wrapped in `<div class="equation">` gets its number at the inline end, counted by `vs-counter-eq`. The row is laid out with flex because grid cannot split across pages.
- `thm` — `<div class="theorem">` numbers theorem-like blocks with `vs-counter-thm`. The label runs into a single-paragraph body, and per-type labels work as `.lemma { --vs-theorem--label: 'Lemma '; }`.
- `appendix` — a section whose heading has `class="appendix"` (or `<section role="doc-appendix">`) counts `vs-counter-appendix` (upper-alpha by default), and a whole document classed `.appendix` / `role="doc-appendix"` on `html` / `body` letters across documents through the page counter (one document = one appendix; the two forms never double-count).
- `page` — resolves to the page number of the target (`target-counter(attr(href), page)`).

Other additions:

- Every type has `--vs-<type>--label` and `--vs-<type>--counter-style` (falling back to the shared `--vs-counter-style`), and `--vs-crossref-{marker,call}-counter-prefix` prepends a chapter number to every default marker and call ("Figure 2.3").
- A Markdown table or any other block without a `<caption>` can be numbered by placing a `.fig-caption` / `.tbl-caption` / `.lst-caption` paragraph next to it.
- Citation calls also match `a[role='doc-biblioref']`, and every `a[data-ref]` — including theme-defined types — now drops the default underline; the text color can be cut with `--vs--crossref-call-text-color`.
- The lone paragraph of a raw-HTML `<figcaption>` is laid inline so the caption text shares the line with the generated number (`--vs--figcaption-p-display`).
- The hanging offset of citation numbers is now a variable, `--vs-citation--marker-inset-inline-start`.

BREAKING CHANGE: The `--vs-crossref--` namespace is gone. The per-type variables moved into their own namespaces, the shared defaults into root-level variables, and importing a single stylesheet no longer renders every number — import the per-type stylesheets you use (or `theme-all.css`, which imports them all).

| Before                                     | After                                            |
| :----------------------------------------- | :----------------------------------------------- |
| `--vs-crossref--anchor-text-decoration`    | `--vs--crossref-call-text-decoration`            |
| `--vs-crossref--call-text-color`           | `--vs--crossref-call-text-color`                 |
| `--vs-crossref--call-margin-inline`        | `--vs--crossref-call-margin-inline`              |
| `--vs-crossref--counter-style`             | `--vs-counter-style`                             |
| `--vs-crossref--marker-counter-prefix`     | `--vs-crossref-marker-counter-prefix`            |
| `--vs-crossref--call-counter-prefix`       | `--vs-crossref-call-counter-prefix`              |
| `--vs-crossref--call-fig-content`          | `--vs-figure--call-content`                      |
| `--vs-crossref--call-tbl-content`          | `--vs-table--call-content`                       |
| `--vs-crossref--call-cite-content`         | `--vs-citation--call-content`                    |
| `--vs-crossref--marker-fig-content`        | `--vs-figure--marker-content`                    |
| `--vs-crossref--marker-tbl-content`        | `--vs-table--marker-content`                     |
| `--vs-crossref--marker-cite-content`       | `--vs-citation--marker-content`                  |
| `--vs-crossref--marker-fig-margin-inline`  | `--vs-figure--marker-margin-inline`              |
| `--vs-crossref--marker-tbl-margin-inline`  | `--vs-table--marker-margin-inline`               |
| `--vs-crossref--marker-cite-margin-inline` | `--vs-citation--marker-margin-inline`            |
| `--vs-crossref--root-counter-fig` etc.     | `--vs-figure--root-counter-fig` etc. (per type)  |

There is no shared `marker-display` / `marker-margin-inline` any more — hide or space the generated numbers per type (`--vs-figure--marker-display: none`, `--vs-table--marker-margin-inline: 0 1rem`, …). The per-document counter resets are per type as well: `--vs-<type>--root-counter-reset` replaces the segment for that type in the `body` counter-reset, and `--vs-<type>--root-counter-<counter>` sets the initial value.

`--vs-section--anchor-text-decoration` and `--vs-section--call-margin-inline` are gone as well: section references now share the generic `a[data-ref]` defaults.
