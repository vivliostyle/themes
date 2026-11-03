---
"@vivliostyle/theme-base": patch
---

Keep the endnote call at the height of other superscripts. The `vertical-align` of `.footnote-ref > sup` fell back to an empty value while `--vs--sup-vertical-align` was unset, so the browser's `vertical-align: super` came back on top of the `inset-block-start` shift of `sup`, and the call rose as high as the previous line. It now falls back to `baseline`.
