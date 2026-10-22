# @vivliostyle/theme-spanning-title-two-column-mono

A4縦2段組の和文学術論文誌テーマ。段抜きの題字ブロック(和文題・斜体英題・著者・要旨・キーワード)を冒頭に置き、図表・擬似コードを配し、著者所属は脚注として下部に落とす墨一色の誌面を作る。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-spanning-title-two-column-mono',
};
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
| 式     | `<a href="#eq-2" data-ref="eq"></a>`         | 式(2) |
| 文献   | `<a href="#cite-1" data-ref="cite"></a>`      | [1]   |

図は `![説明](fig.svg){#fig-id}`、表は `<figure class="tbl" id="tbl-id">` に `<figcaption>` と Markdown 表を入れる (キャプションは表の上に出る)。列の揃えは Markdown の桁揃え記法で指定し、右揃えの列は欧文書体で組まれる。別行立ての数式は `$$ … $$` の直後の行に `<a id="eq-N"></a>` を置くと参照できる。参考文献は `<ol class="cite-items">` に `<li id="cite-N">` を並べる。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                              | 既定値                            | 説明                               |
| --------------------------------- | --------------------------------- | ---------------------------------- |
| `--vs-font-family`                | `'Noto Serif JP', ...`            | 本文の明朝書体                     |
| `--vs--heading-font-family`       | `'Noto Sans JP', ...`             | 見出し・柱・表見出しのゴシック書体 |
| `--vs-theme-spanning-title-two-column-mono--font-latin`          | `'STIX Two Text', ...`            | 英題・数値・ノンブルの欧文書体     |
| `--vs-color-foreground`                 | `#1a1a1a`                         | 本文・罫の墨色                     |
| `--vs-color-background-alt`       | `#efefef`                         | 表ヘッダ・擬似コードの淡グレー地   |
| `--vs-theme-spanning-title-two-column-mono--columns`             | `2`                               | 本文の段数                         |
| `--vs-theme-spanning-title-two-column-mono--column-gap`          | `8mm`                             | 段間                               |
| `--vs-theme-spanning-title-two-column-mono--running-head-gap`    | `10mm`                            | 柱の左右の間隔                     |
| `--vs-theme-spanning-title-two-column-mono--figure-size-inline`  | `100%`                            | 図の幅                             |
| `--vs-theme-spanning-title-two-column-mono--eq-marker-content`  | `'(' counter(vs-counter-eq) ')'` | 式番号の書式                  |
| `--vs-theme-spanning-title-two-column-mono--eq-call-content`    | `'式(' target-counter(…) ')'`     | 本文からの式参照の書式             |
| `--vs-section--h2-marker-content` | `counter(vs-counter-sec-h2) '.'`  | 章番号の書式                       |
| `--vs-section--call-content`      | `target-counter(…) '章'`          | 本文からの章参照の書式             |
