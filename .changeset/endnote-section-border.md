---
"@vivliostyle/theme-base": minor
---

Added variables that style the endnotes section box itself, so themes no longer need raw CSS on `[role='doc-endnotes']`:

- `--vs-endnote--section-border-{color,style,width}-{block-start,block-end,inline-start,inline-end}` — borders on each logical side. The border style defaults to none (nothing changes until a theme opts in); width and color fall back to `--vs-border-width` / `--vs-border-color`. The `<hr>` written by VFM comes after the section's `::before` heading and cannot be reordered, so themes that want the separator rule above the heading can hide the `<hr>` and use the section border instead:

  ```css
  :root {
    --vs-endnote--section-hr-display: none;
    --vs-endnote--section-border-style-block-start: solid;
  }
  ```

- `--vs-endnote--section-{text-color,letter-spacing,line-height,padding-block,padding-inline}` — typography and spacing of the section.
- `--vs-endnote--section-heading-letter-spacing`.
- `--vs-endnote--section-ol-{margin-block,padding-inline-start,text-align,text-indent}` — the list box; `margin-block` and `padding-inline-start` default to the shared list variables (`--vs--lists-margin-block`, `--vs--ol-padding-inline-start` / `--vs--lists-padding-inline-start`) so the default layout is unchanged.
