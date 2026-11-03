# @vivliostyle/theme-jupyter-cell-layout

横組みのノートブック形式の文書向けテーマ。Jupyter Notebook のセル構造を模し、説明・コード・出力・数式・図版・結論の各セルを罫線付きの角丸ボックスで組む。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` が章番号 (`04`) になり、節番号 (`04.3`) は章番号 + `vs-counter-sec-h2` から生成される。見出しに番号は書かない。
- 章の表題は `## 章題 {#id .chapter-title}`。この見出しは節番号を消費せず、章番号だけが付く。柱の「CHAPTER 04 · 章題」もここから取る。
- コードセルは ` ```python title="In" `、出力セルは ` ```text title="Out" `。実行番号 `[3]:` は入力セルごとに進むカウンタが付ける。出力セル (`text`) は直前の入力と同じ番号を示す。
- 図は `![キャプション](fig.svg){#fig-xxx}`。番号「Fig. 04.2 — 」は章番号と図番号から生成される。参照は `<a href="#fig-xxx" data-ref="fig"></a>`。
- 節への参照は `<a href="#sec-xxx" data-ref="sec"></a>` (「04.3」)、章頭の目次のように見出し名も要るときは `data-ref="sec-title"` (「04.3 見出し名」)。
- 空のアンカーの直後に語や記号が続くときは VFM が空白を落とすので `&nbsp;` を置く。

## 使い方

```css
@import '@vivliostyle/theme-jupyter-cell-layout';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                             | 既定値                 | 説明                                    |
| -------------------------------- | ---------------------- | --------------------------------------- |
| `--vs-theme-jupyter-cell-layout--color-accent`       | `--vs-color-foreground-alt` と同じ | 章見出し罫・実行番号ガターの Jupyter 橙 |
| `--vs-theme-jupyter-cell-layout--color-output-bg`    | `--vs-color-foreground-alt` × `--vs-color-background` 95% | 出力セルの背景色                        |
| `--vs-theme-jupyter-cell-layout--cell-border-radius` | `0.8mm`                | セルの角丸半径                          |

生成内容の変数:

| 変数                                     | 既定値                                     | 説明                                |
| ---------------------------------------- | ------------------------------------------ | ----------------------------------- |
| `--vs-theme-jupyter-cell-layout--chapter-counter-style`      | `decimal-leading-zero`                     | 章番号の書式                        |
