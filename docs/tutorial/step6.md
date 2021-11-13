# Step 6. Completed!

Good job! Your theme is now complete.

## Publishing the theme

If you want to publish it as an npm package, please follow the [specification](/spec).

If you run `yarn publish` and publish it as an npm package, you will be able to select your theme when you create a publication with Create Book, as shown below.

```bash
$ yarn create book test
yarn create v1.22.10
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-book@0.5.0" with binaries:
      - create-book
? description description
? author name
? author email
? license AGPL-3.0
? choose theme (Use arrow keys)
❯ @vivliostyle/theme-bunko - 文庫用のテーマ
  @vivliostyle/theme-slide - Slide theme
  @vivliostyle/theme-techbook - Techbook (技術同人誌) theme
  @vivliostyle/theme-academic - Academic theme
  vivliostyle-theme-dnd-5e-phb - D&D 5e PHB theme for Vivliostyle
  // this is where your theme will appear!
(Move up and down to reveal more choices)
```

## Editing more styles

- [CSS features supported by Vivliostyle](https://docs.vivliostyle.org/#/supported-css-features)
  - This is a list of values, selectors, at-rules, media queries, properties, etc. These features can be used in style sheets.
- Official blog post
  - Introduces the most recent features that have become available.
  - As of November 2021, the following blog posts are recommended.
    - [Recent Vivliostyle.js updates](https://vivliostyle.org/blog/2021/10/12/recent-vivliostyle-js-updates/)
    - [Updates on Vivliostyle—Improved CLI and CSS Paged Media support](https://vivliostyle.org/blog/2021/04/21/vivliostyle-improved-css-paged-media-support/)
- Vivliostyle Core test cases
  - The test cases are good examples of how we can use Vivliostyle. If you're interested in CSS typesetting, please check them out.
    - [List of test cases](https://raw.githack.com/vivliostyle/vivliostyle.js/master/packages/core/test/files/)
    - [List of HTML/CSS sets corresponding to test cases](https://github.com/vivliostyle/vivliostyle.js/tree/master/packages/core/test/files)
