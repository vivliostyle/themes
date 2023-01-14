---
title: 'Vivliostyle Theme Example'
vfm:
  hardLineBreaks: false
---

# Vivliostyle base theme

## Demonstration of inline tags

Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt error aut
perspiciatis ducimus ut excepturi unde assumenda minus praesentium ipsa.
Id magnam assumenda rerum. Eius eveniet pariatur libero laudantium rerum.
*emphasis text* / **bold text** / ***bold emphasis text*** /
`inline code block` / ~~strikethrough text~~ /
<big>bigger text</big> / <small>smaller text</small> /
H<sub>2</sub>O / x<sup>2</sup> / {Ruby|ルビ} /
[Inline link](https://vivliostyle.org) / [Block link]
$E = mc^2$

[Block link]: https://vivliostyle.org

# Headings 1 {#section1}

## Heading 2 {#section2}

### Heading 3 {#section3}

#### Heading 4

##### Heading 5

###### Heading 6

----

## Lists

* Ham
* Cheese
* Bacon
  * foo
  * bar
    * baz

1. Mix flour, baking powder, sugar, and salt.
2. In another bowl, mix eggs, milk, and oil.
3. Stir both mixtures together.
4. Fill muffin tray 3/4 full.
5. Bake for 20 minutes.

<dl>
  <dt>Vivliostyle</dt>
  <dd>
    An open source project for a new typesetting system fitting for
digital and web publishing based on the latest web standard technology.
  </dd>
</dl>

## Blockquote

> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt error aut
> perspiciatis ducimus ut excepturi unde assumenda minus praesentium ipsa.
> Id magnam assumenda rerum. Eius eveniet pariatur libero laudantium rerum.

## Code block

```
https://vivliostyle.com
```

```js
const Prism = require('prismjs');

const code = `var data = 1;`;
const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
```

## Figure

![Vivliostyle Logo](<./assets/Logo%20(Mark%20+%20Type).png>){#figure1}

## Table

<figure id="table1">
<figcaption>Markdown table</figcaption>
<div>

| aaa | bbb |
|:---|---:|
| loooooooooooooooooooooooooong | taaaaaaaaaaaaaaaaaaaaaaaable |

</div>
</figure>

<figure id="table2">
<figcaption>HTML complex table</figcaption>

<table>
  <thead>
    <tr>
      <th colspan="3">Quarterly Earnings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Q1</td>
      <td>Net Income</td>
      <td>$50,000</td>
    </tr>
    <tr>
      <td>Total Revenue</td>
      <td>$100,000</td>
    </tr>
    <tr>
      <td rowspan="2">Q2</td>
      <td>Net Income</td>
      <td>$60,000</td>
    </tr>
    <tr>
      <td>Total Revenue</td>
      <td>$110,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Total Earnings</td>
      <td>$110,000</td>
    </tr>
  </tfoot>
</table>
</figure>

## Footnote

This is body content.
<span class="footnote">This is footnote content.</span>
<span class="footnote">And this is another footnote.</span>

## Section reference

See <a href="#section1" data-ref="sec"></a>, <a href="#section2" data-ref="sec"></a> and <a href="#section3" data-ref="sec"></a>.

## Cross reference

See <a href="#figure1" data-ref="fig"></a> and <a href="#table1" data-ref="tbl"></a>.

## Citation

Citation test[^knuth1965] Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt error aut
perspiciatis ducimus ut excepturi unde assumenda minus praesentium ipsa.
Id magnam assumenda rerum. Eius eveniet pariatur libero laudantium rerum.
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt error aut
perspiciatis ducimus ut excepturi unde assumenda minus praesentium ipsa.
Id magnam assumenda rerum. Eius eveniet pariatur libero laudantium rerum.

[^knuth1965]: Knuth, Donald E. "On the translation of languages from left to right." Information and control 8.6 (1965): 607-639.
