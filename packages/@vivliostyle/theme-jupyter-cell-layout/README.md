# @vivliostyle/theme-jupyter-cell-layout

B5判・横組みの機械学習実験ノートブック向けテーマ。Jupyter Notebook のセル構造を模し、説明・コード・出力・数式・図版・結論の各セルを罫線付きの角丸ボックスで組む。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` が章番号 (`04`) になり、節番号 (`04.3`) は章番号 + `vs-counter-sec-h2` から生成される。見出しに番号は書かない。
- 章の表題は `## 章題 {#id .chapter-title}`。この見出しは節番号を消費せず、章番号だけが付く。柱の「CHAPTER 04 · 章題」もここから取る。
- コードセルは ` ```python title="In" `、出力セルは ` ```text title="Out" `。実行番号 `[3]:` は入力セルごとに進むカウンタが付ける。出力セル (`text`) は直前の入力と同じ番号を示す。
- 図は `![キャプション](fig.svg){#fig-xxx}`。番号「Fig. 04.2 — 」は章番号と図番号から生成される。参照は `<a href="#fig-xxx" data-ref="fig"></a>`。
- 節への参照は `<a href="#sec-xxx" data-ref="sec"></a>` (「04.3」)、章頭の目次のように見出し名も要るときは `data-ref="sec-title"` (「04.3 Tracing Gradient Drift」)。
- 空のアンカーの直後に語や記号が続くときは VFM が空白を落とすので `&nbsp;` を置く。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-jupyter-cell-layout',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                             | 既定値                 | 説明                                    |
| -------------------------------- | ---------------------- | --------------------------------------- |
| `--vs-color-foreground` | `#23272b` | 本文の文字色 |
| `--vs-color-background` | `#fffdf9` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#f37726` | アクセント色 |
| `--vs-font-family`               | `'Source Sans 3', ...` | 本文書体                                |
| `--vs--monospace-font-family`    | `'IBM Plex Mono', ...` | コードセルの書体                        |
| `--vs-theme-jupyter-cell-layout--color-accent`       | `--vs-color-foreground-alt` と同じ | 章見出し罫・実行番号ガターの Jupyter 橙 |
| `--vs-color-background-alt`      | `--vs-color-background` と同じ | 説明・数式・結論セルの背景色            |
| `--vs-theme-jupyter-cell-layout--color-code-bg`      | `--vs-color-foreground` × `--vs-color-background` 95% | コードセルの背景色                      |
| `--vs-theme-jupyter-cell-layout--color-output-bg`    | `--vs-color-foreground-alt` × `--vs-color-background` 95% | 出力セルの背景色                        |
| `--vs-theme-jupyter-cell-layout--cell-border-radius` | `0.8mm`                | セルの角丸半径                          |

生成内容の変数:

| 変数                                     | 既定値                                     | 説明                                |
| ---------------------------------------- | ------------------------------------------ | ----------------------------------- |
| `--vs-theme-jupyter-cell-layout--chapter-counter-style`      | `decimal-leading-zero`                     | 章番号の書式                        |
| `--vs-theme-jupyter-cell-layout--chapter-marker-content`     | `counter(vs-counter-chapter, …)`           | 章表題に付く番号                    |
| `--vs-page--mbox-top-left-content`       | `'CHAPTER ' … ' · ' string(chapter-title)` | 柱の内容                            |
| `--vs-theme-jupyter-cell-layout--cell-number-content`        | `' [' counter(vs-counter-cell) ']:'`       | 実行番号ラベルの番号部分            |
| `--vs-theme-jupyter-cell-layout--section-title-call-content` | 節番号 + 見出し名                          | `data-ref="sec-title"` の参照文字列 |

節番号は base の `--vs-section--h2-marker-content`、節参照は `--vs-section--call-content`、図番号は `--vs-figure--marker-content` (参照は `--vs-figure--call-content`)、ノンブルは `--vs-page--mbox-bottom-outside-content` で変更できる。

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
