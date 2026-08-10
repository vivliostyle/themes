---
"create-vivliostyle-theme": patch
---

Updated the scaffolded `theme.css` to the current variable and counter names of `@vivliostyle/theme-base`. The template still referred to `--vs-crossref--marker-cite-content`, the counter names `footnote` / `sections` / `cite` and the nonexistent `--vs-toc--marker-margin-inline`, none of which have an effect against the current base theme.
