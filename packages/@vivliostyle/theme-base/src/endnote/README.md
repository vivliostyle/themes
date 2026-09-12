# Endnote

Styles about endnotes.

```css
@import '@vivliostyle/theme-base/endnote';

/* Configuration examples */
:root {
  --vs-endnote--call-font-size: 90%;
  --vs-endnote--section-ol-list-style-type: lower-latin;
}

/* Counter-based numbering: generate note numbers with `vs-counter-endnote`
   instead of the ol's list markers. Useful e.g. in vertical writing mode,
   where list markers cannot be set upright (tate-chu-yoko). */
:root {
  --vs-endnote--section-ol-list-style-type: none;
  --vs-endnote--marker-content: '(' counter(vs-counter-endnote) ')';
  --vs-endnote--marker-text-combine-upright: all;
  /* Optionally regenerate the in-text note call as well, hiding the
     literal number in <sup>. `vs-counter-endnote-call` counts the calls
     in document order. */
  --vs-endnote--call-sup-display: none;
  --vs-endnote--call-content: '(' counter(vs-counter-endnote-call) ')';
  --vs-endnote--call-text-combine-upright: all;
}

/* Separator rule above the endnotes heading. The <hr> written by VFM comes
   after the section's ::before heading and cannot be reordered, so hide it
   and draw the section's own border instead. The border width defaults to 0,
   so the rule needs an explicit width; the color follows --vs-color-border.
   The other logical sides (block-end / inline-start / inline-end) have the
   same set of variables. */
:root {
  --vs-endnote--section-hr-display: none;
  --vs-endnote--section-border-style-block-start: solid;
  --vs-endnote--section-border-width-block-start: var(--vs-border-width);
}
```

- Name of CSS variable starts with `--vs-endnote--`
