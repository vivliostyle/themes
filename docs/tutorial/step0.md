# Introduction

In this tutorial, you will learn:

- How to create an original theme
- How to use [create-vivliostyle-theme][]
- How to write CSS for typesetting
  - Counters
  - Headings
  - Table of contents
  - etc. ...

The specific parts, such as CSS and sample manuscripts, will vary for each theme, but all themes' creation procedure is the same. You can find the final product of the theme for this tutorial at [yamasy1549/vivliostyle-theme-my-doujin](https://github.com/yamasy1549/vivliostyle-theme-my-doujin).

## Versions

- [create-vivliostyle-theme][]: 0.4.0
- [@vivliostyle/cli](https://github.com/vivliostyle/vivliostyle-cli): 4.3.2
- [@vivliostyle/vfm](https://github.com/vivliostyle/vfm/): 1.0.2

## Setting up the tutorial

In this tutorial, we are going to create a theme for a novel anthology with multiple authors. There are several authors, and each author will be responsible for one chapter (one Markdown manuscript file). We have received the following requests from the authors:

- Include **Page numbers** and **chapter numbers**
- Include **Table of contents**
- Change the **signature color** for each chapter (manuscript file)

This tutorial is based on [How to create a Vivliostyle Theme (in Japanese)](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol5/content/yamasy/index.html) in [Let's Make a Book with Vivliostyle Vol. 5 (in Japanese)](https://vivliostyle.org/ja/make-books-with-vivliostyle/#vivliostyle-%E3%81%A7%E6%9C%AC%E3%82%92%E4%BD%9C%E3%82%8D%E3%81%86-vol52021%E5%B9%B47%E6%9C%8811%E6%97%A5).

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme
