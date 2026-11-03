# @vivliostyle/theme-spanning-title-two-column

2段組の和文学術論文誌テーマ。段抜きの題字ブロック(和文題・斜体英題・著者・要旨・キーワード)を冒頭に置き、図表・擬似コードを配し、著者所属は脚注として下部に落とす誌面を作る。

## 使い方

```css
@import '@vivliostyle/theme-spanning-title-two-column';
```

## 原稿の書き方

`# 論題` の直後に `<div class="frontmatter">` を置き、`.running-journal` (柱に流す誌名・巻号)、`.subhead` (英題)、`.byline` (著者。所属は `<span class="footnote">`)、`.lead` (要旨)、`.meta` (キーワード・受付日) を並べる。本文は `## 章` / `### 節`。

章番号・節番号・図番号・表番号・式番号・引用番号はすべて base のカウンタが付けるので原稿には書かない。番号を付けない見出し (謝辞・参考文献) は閉じ `#` を添える。

```md
## 謝辞 ##
```

本文からの参照は `data-ref` 付きの空リンクで書く。

| 参照先 | 書き方                                        | 出力  |
| ------ | --------------------------------------------- | ----- |
| 章     | `<a href="#sec-method" data-ref="sec"></a>`   | 3章   |
| 図     | `<a href="#fig-pipeline" data-ref="fig"></a>` | 図1   |
| 表     | `<a href="#tbl-dataset" data-ref="tbl"></a>`  | 表1   |
| 式     | `<a href="#eq-2" data-ref="eq"></a>`          | 式(2) |
| 文献   | `<a href="#cite-1" data-ref="cite"></a>`      | [1]   |

図は `![説明](fig.svg){#fig-id}`、表は `<figure class="tbl" id="tbl-id">` に `<figcaption>` と Markdown 表を入れる (キャプションは表の上に出る)。列の揃えは Markdown の桁揃え記法で指定し、右揃えの列は欧文書体で組まれる。別行立ての数式は `$$ … $$` の直後の行に `<a id="eq-N"></a>` を置くと参照できる。参考文献は `<ol class="cite-items">` に `<li id="cite-N">` を並べる。
