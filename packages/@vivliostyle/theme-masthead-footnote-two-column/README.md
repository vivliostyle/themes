# @vivliostyle/theme-masthead-footnote-two-column

2段組の学会予稿集向けテーマ。全幅マストヘッド (題目・著者・概要・キーワード) と2段組本文、図表・脚注・参考文献・索引語を高密度に組む。

## 使い方

```css
@import '@vivliostyle/theme-masthead-footnote-two-column';
```

## 原稿の書き方

- 概要 1 件を `#` 見出しで始める。h1 の節ごとに改ページし、節番号・図表番号・式番号・脚注番号が 1 から数え直される。
- 柱は左が `vivliostyle.config.js` の `title` (`env(pub-title)`)、右が原稿の frontmatter の `title` (`env(doc-title)`)。
- マストヘッドの各行は `<p class="authors">` `<p class="affiliations">` `<p class="contact">` `<p class="venue">` `<p class="abstract">` `<p class="keywords">` で書く。この class を持つ段落だけが段抜きになる。
- 節番号を付けない見出しは閉じ `#` を付けて `## 参考文献 ##` と書く (セクション化されないので番号が振られない)。
- 表題は `<p class="caption" id="…">` (番号を付けない表題は `class="caption plain"`)、数式は `<div class="equation" id="…">`。「表1」「(1)」などの番号は原稿に書かない。
- 参照は `<a href="#id" data-ref="fig|tbl|eq|page"></a>` と書く。`page` は参照先のページ番号を出す。
