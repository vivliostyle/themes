# Appendix

Appendix lettering and cross-references.

```css
@import '@vivliostyle/theme-base/appendix';

/* Configuration examples */
:root {
  --vs-appendix--label: 'Appendix ';
}
```

- Counts `vs-counter-appendix` (default `upper-alpha`, label `--vs-appendix--label`) and prefixes the heading with `--vs-appendix--marker-content`
- Two forms: sections whose heading has `class="appendix"` (or `<section role="doc-appendix">`) count within the document, while a whole document classed `.appendix` / `role="doc-appendix"` on `html`/`body` letters **across documents** through the page counter (one document = one appendix; the two forms never double-count)
- Page counters read as 0 inside `string-set`, so running heads must write `counter()` in the margin box instead
- An empty in-text call `<a data-ref="appendix" href="#id"></a>` is filled with the resolved letter
- Name of CSS variable starts with `--vs-appendix--`

The shared cross-reference settings (numbering style, chapter prefixes, anchor treatment, the `:lang(ja)` defaults) are part of the basic stylesheet. See the [package README](../../README.md#cross-reference).
