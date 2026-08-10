---
"@vivliostyle/theme-base": minor
---

Added counter-based numbering to endnotes for layouts where the `ol` list markers fall short — most notably vertical writing, where `::marker` digits cannot be set in tate-chu-yoko.

Endnote items count `vs-counter-endnote` and carry a `li::before` marker configured with `--vs-endnote--marker-*` (`content`, `display`, font properties, `line-height`, `size-inline`, `margin-inline`, `text-color`, `text-combine-upright`, `text-indent`, `text-orientation`, `vertical-align`). The in-text calls count `vs-counter-endnote-call`, and `--vs-endnote--call-content` regenerates the call on `.footnote-ref::before` while `--vs-endnote--call-sup-display: none` hides the literal number written by VFM. Both contents default to `none`, so nothing changes until a theme opts in:

```css
:root {
  --vs-endnote--section-ol-list-style-type: none;
  --vs-endnote--marker-content: '(' counter(vs-counter-endnote) ')';
  --vs-endnote--marker-text-combine-upright: all;
}
```
