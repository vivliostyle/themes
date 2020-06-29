---
title: Slideshow
theme: '@vivliostyle/theme-slide'
class: black
section: true
---

# Markdown と JavaScript

## John Doe

# 図 [.hidden]

![](./figure.png)

# まとめ

- a

```html
<body class="black">
  <div>
    <h1>MarkdownとJavaScript</h1>
    <h2>John Doe</h2>
  </div>
  <div>
    <h1 class="hidden">
    <img src="./figure.png" />
  </div>
  <div>
    <h1>まとめ</h1>
  </div>
</body>
```

===

```css
body {
  background: white;
}

body.black {
  background: black;
}

body > div {
  border: 20px solid black;
  page: break-after;
}

body > div.title * {
  text-align: center;
}

div.impact h1 {
  font-weight: 900;
  font-size: 50px;
}
```
