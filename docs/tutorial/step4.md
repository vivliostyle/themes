<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Step 4. Displaying ToC](#step-4-displaying-toc)
  - [Automatically generate a ToC](#automatically-generate-a-toc)
  - [Previewing](#previewing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Step 4. Displaying ToC

Now that we have the page and chapter numbers. Next is the table of contents (ToC).

## Automatically generate a ToC

Vivliostyle has a feature to automatically generate a table of contents based on `<h1>` headings in the manuscripts. If you need headings other than `<h1>`, you can manually create your own table of contents. But let's use this feature this time.

Add the following to vivliostyle.config.js. Then the table of contents will be displayed on the first page.

```js {highlight:[6,10,11]}
// vivliostyle.config.js

module.exports = {
  // ...
  entry: [...
    { rel: 'contents', theme: 'theme_toc.css' }
    'example/ch01.md',
    'example/ch02.md',
  ],
  toc: true,
  tocTitle: 'table of contents',
  // ...
};
```

## Previewing

Next, we'll create a style file called scss/theme_toc.scss specifically for the table of contents. First, we define a style similar to theme_print.scss and one without incrementing the page numbers.

```bash
$ touch scss/theme_toc.scss
```

```scss {highlight:['3-17']}
// scss/theme_toc.scss

@import 'theme_common';

@page {
  marks: crop cross;
  bleed: 3mm;

  @top-left {
    content: 'theme_print';
  }
}

// Don't increment the page number
@page :nth(1) {
  counter-increment: none;
}
```

Now, it looks like the following:

![Simple table of contents](./assets/step4-toc-ver1.png)

Let's try to make it look a little neat. First, hide the unnecessary parts.

```scss {highlight: ['7-27']}
// scss/theme_toc.scss

@import 'theme_common';

// ...

// hide the unnecessary parts
@page :left {
  @top-left {
    content: '';
  }
}
@page :right {
  @top-right {
    content: '';
  }
}
h1 {
  display: none;
}
h2 {
  text-indent: 0;
}
nav ol {
  padding: 0;
  list-style: none;
}
```

![plain table of contents](./assets/step4-toc-ver2.png)

Let's display the page and chapter numbers that also correspond to the table of contents.

```scss {highlight: ['7-18']}
// scss/theme_toc.scss

// ...

nav ol {
  // ...
  li a {
    &::before {
      content: 'chapter ' target-counter(attr(href url), chapter) ' chapter';
      margin-right: 1rem;
    }
    &::after {
      content: target-counter(attr(href url), p);
      float: right;
    }
  }
}
```

Now it looks like a book at once!

![Useful table of contents](./assets/step4-toc-ver3.png)
