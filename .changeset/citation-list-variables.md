---
"@vivliostyle/theme-base": minor
---

Added variables that style the citation list itself, so themes no longer need raw CSS on `ol.cite-items`:

- `--vs-citation--items-*` on `ol.cite-items` / `[role='doc-bibliography'] :is(ol, ul)`: `border-{color,style,width}-{block-start,block-end,inline-start,inline-end}`, `text-color`, `font-size`, `hyphens`, `line-height`, `margin-block`, `padding-block` and `padding-inline-start`. `margin-block` and `padding-inline-start` default to the shared list variables (`--vs--lists-margin-block`, `--vs--ol-padding-inline-start` / `--vs--lists-padding-inline-start`) so the default layout is unchanged; border styles default to none.
- `--vs-citation--item-*` on the list items: `font-family`, `font-size`, `hyphens`, `line-height`, `margin-block`, `padding-inline-start`, `text-align` and `text-indent`.
- `--vs-citation--marker-text-color` on the generated `[N]` marker.
