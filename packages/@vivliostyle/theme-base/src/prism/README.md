# Prism

Styles compatible with [Prism](https://prismjs.com/) (code highlighting library).

```css
@import '@vivliostyle/theme-base/prism';
/* Use okaidia theme */
@import '@vivliostyle/theme-base/prism/theme-okaidia';
/* Use prism theme */
@import '@vivliostyle/theme-base/prism/theme-prism';

/* Configuration examples */
:root {
  --vs-prism--background: #aaa;
  --vs-prism--block-code-padding: 2rem 1rem;
}
```

- Name of CSS variable starts with `--vs-prism--`
- [**prism/theme-prism**](theme-prism.css) enables Prism.js default theme
  - Original theme: https://github.com/PrismJS/prism/blob/master/themes/prism.css

<img width="691" alt="Highlighting examples of Prism.js default theme" src="https://user-images.githubusercontent.com/1771005/210739391-32dfac1b-e9c7-405a-ba8b-8e6f659b4f78.png">

- [**prism/theme-okaidia**](theme-okaidia.css) enables okaidia theme
  - Original theme: https://github.com/PrismJS/prism/blob/master/themes/prism-okaidia.css

<img width="692" alt="Highlighting examples of okaidia theme" src="https://user-images.githubusercontent.com/1771005/210739448-19332a60-f24f-42d8-8e79-f028edab458e.png">
