# Theorem

Theorem numbering and cross-references.

```css
@import '@vivliostyle/theme-base/theorem';

/* Configuration examples */
.lemma {
  --vs-theorem--label: 'Lemma ';
}
```

- Blocks with `<div class="theorem">` count `vs-counter-thm`; the label text is `--vs-theorem--label`, including the gap before the number
- An empty in-text call `<a data-ref="thm" href="#id"></a>` is filled with the resolved number
- Name of CSS variable starts with `--vs-theorem--`

The shared cross-reference settings (numbering style, chapter prefixes, anchor treatment, the `:lang(ja)` defaults) are part of the basic stylesheet. See the [package README](../../README.md#cross-reference).
