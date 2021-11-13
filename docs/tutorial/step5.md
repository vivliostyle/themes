<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Step 5. Styling for each manuscript](#step-5-styling-for-each-manuscript)
  - [Improving the style](#improving-the-style)
  - [Setting the signature color](#setting-the-signature-color)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Step 5. Styling for each manuscript

Let's set the signature color for each manuscript file.

## Improving the style

First, let's try to make the publication look more like a book.

```scss {highlight: [6,'10-12',18,'23-24','29-40']}
// scss/_my_style.scss

// ...

// increment on each page
// display the title of each chapter at the top of the page
@page {
  counter-increment: p;

  @top-center {
    content: string(doc-title);
  }
}

// chapter titles
section > {
  h1 {
    border-top: 10pt solid black;

    &::before {
      content: 'section ' counter(chapter) ' chapter';
      display: block;
      font-size: 80%;
      margin: 10pt auto;
    }
  }
}

// author name
.author {
  font-weight: bold;
  text-align: right;
  border-bottom: 10pt solid black;
  margin-bottom: 20pt;
}

// spacing
html {
  line-height: 2rem;
}
```

You can now see the borderlines in the chapter title area. In the following section, we will set the color of these borderlines for each manuscript file.

![Looks a bit like an old textbook](/assets/step5-ver1.png)

## Setting the signature color

Now, let's set the signature color for each manuscript file. Edit the sample manuscript slightly. Suppose you specify a class in the [Frontmatter](https://vivliostyle.github.io/vfm/#/vfm#frontmatter) part surrounded by `---`. In that case, you can give classes to the `<html>` and `<body>` elements as the specified names. You can use this feature to apply a different style to each manuscript file.

```markdown {highlight: ['3-5']}
<! -- example/ch01.md -->

---

## class: natsume

# I am a cat.

...
```

```markdown {highlight: ['3-5']}
<! -- example/ch02.md -->

---

## class: akutagawa

# Rashomon

...
```

```scss {highlight: ['5-18']}
// scss/_my_style.scss

// ...

// signature color
html.natsume {
  h1,
  .author {
    border-color: #d1307d;
  }
}

html.akutagawa {
  h1,
  .author {
    border-color: #24aae1;
  }
}
```

By using this method, you can change not only the color but also the size and typeface of the text in each manuscript file.

![For example, pink for Natsume, light blue for Akutagawa](/assets/step5-ver2.png)
