---
"@vivliostyle/theme-base": minor
---

Filled the typography gaps of footnotes and endnotes.

- The footnote body gained `--vs-footnote--{margin-block,padding-inline-start,text-indent,word-break}`, so cancelling the text indent inherited from the call site — or hanging the note marker — no longer needs a plain rule.
- Footnote calls and markers gained `text-combine-upright`, `text-orientation` and `vertical-align` variables (the previously hardcoded `vertical-align: baseline` of the call is now the default of `--vs-footnote--call-vertical-align`), and the marker also `size-inline` and `text-indent` for fixed-width hanging numbers.
- Endnote calls got the same treatment: `--vs-endnote--call-{text-color,font-family,font-weight,line-height}` on the anchor, `--vs-endnote--call-sup-{display,text-combine-upright,text-orientation,vertical-align}` on the literal `<sup>` (following the document-wide `--vs--sup-*` values when unset), and `line-height` / `text-orientation` / `vertical-align` on the marker.
