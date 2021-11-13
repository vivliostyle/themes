<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Step 3. Displaying counters](#step-3-displaying-counters)
  - [Page numbers](#page-numbers)
  - [Chapter numbers](#chapter-numbers)
  - [Previewing](#previewing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Step 3. Displaying counters

Next, let's display the page and chapter numbers by creating an SCSS file and defining a new style for them.

```bash
$ touch scss/_my_style.scss
```

We'll import the SCSS file we just created in our main style file (scss/theme_common.scss).

```scss {highlight: [15]}
// scss/theme_common.scss

// ...
@import '_variables';
@import '_vfm_code';
@import '_vfm_footnotes';
@import '_vfm_frontmatter';
@import '_vfm_hard_new_line';
@import '_vfm_image';
@import '_vfm_math_equation';
@import '_vfm_raw_html';
@import '_vfm_ruby';
@import '_vfm_sectionization';

@import '_my_style';

/* and more... 🖋 */
```

## Page numbers

The page numbers, since Vivliostyle has a counter variable called `page`, you don't usually need to define your own counter variable for the page numbers. This variable is automatically reset on the first page and incremented on each page. To display page numbers, define a style like the following:

```scss
// already defined in scss/theme_common.scss

// display at top-left for left page
@page :left {
  @top-left {
    content: counter(page);
  }
}

// display at top-right for right page
@page :right {
  @top-right {
    content: counter(page);
  }
}
```

However, suppose you want to change the behavior of the counter (for example, you don't want the page numbers to be incremented in the table of contents). In that case, you need to define your own counter variable. In this tutorial, we don't want to increment the page numbers in the table of contents, so we will use our own counter variable, `p`, as follows.

```scss {highlight: ['3-25']}
// scss/_my_style.scss

// reset on the first page
@page :first {
  counter-reset: p;
}

// increment on each page
@page {
  counter-increment: p;
}

// display at top-left for left page
@page :left {
  @top-left {
    content: counter(p);
  }
}

// display at top-right for right page
@page :right {
  @top-right {
    content: counter(p);
  }
}
```

## Chapter numbers

Next, we'll display the chapter numbers. Use `@page :nth(1) {}` to increment the counter variable `chapter` by the first page of each manuscript file specified in `entry` in vivliostyle.config.js.

`@page :first {}` refers to the first page throughout the publication. On the other hand, `@page :nth(1) {}` refers to the first page of each of the manuscript files specified by `entry` in vivliostyle.config.js (this is a particular behavior of Vivliostyle).

```scss {highlight: ['3-16']}
// scss/_my_style.scss

// chapter numbers
@page :nth(1) {
  counter-increment: chapter p;
}

// chapter titles
section > {
  h1 {
    &::before {
      content: 'section ' counter(chapter) ' chapter';
      display: block;
    }
  }
}
```

## Previewing

Based on the changes made so far, the preview should look like the following. If it doesn't auto-reload, try `yarn dev` again.

![Page and chapter numbers are now displayed](/assets/step3.png)
