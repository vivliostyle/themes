# Sidenote

Floats elements with `class="sidenote"` to the inline-end side of the text and numbers them with the `vs-counter-sidenote` counter.

```css
@import '@vivliostyle/theme-base/sidenote';

/* Configuration examples */
:root {
  --vs-sidenote--size-inline: 25%;
  --vs-sidenote--marker-content: '(' counter(vs-counter-sidenote) ') ';
}
```

- An empty in-text call `<a data-ref="sidenote" href="#note-id"></a>` is filled with the number of the note it links to
- Name of CSS variable starts with `--vs-sidenote--`
- The float position, size and gap are plain CSS variables (`--vs-sidenote--float`, `--vs-sidenote--size-inline`, `--vs-sidenote--margin-inline`), so a theme can pull the notes into the page margin with a negative margin or stack them in a reserved band
