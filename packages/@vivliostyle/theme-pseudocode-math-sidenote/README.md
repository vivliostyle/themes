# @vivliostyle/theme-pseudocode-math-sidenote

B5判・1段組のアルゴリズム解析教科書向けテーマ。中央のディスプレイ数式 (MathML) と行番号付きの枠なし疑似コードを組み、外側の広い余白にサイドノートや図版を流し込む。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` が章番号になり、節番号「4.2」は章番号 + `vs-counter-sec-h2` から生成される。見出しに番号は書かない。番号を付けない見出し (Chapter Notes など) は `## 見出し ##` と閉じ `#` を付ける (節にならないので番号を消費しない)。
- 章題は `<p class="runhead">章題</p>` を本文先頭に置く。「Chapter 4 ·」の部分は章番号から生成されるので書かない。
- 定理環境は `<div class="theorem" id="thm-xxx">`。補題は `class="theorem lemma"`。見出しラベル (`Theorem 4.2`) は生成されるので、本文は `**(Master Recurrence).** …` と副題だけを書く。
- 疑似コードは `<div class="code" id="code-xxx">` の中に番号なしの箇条書き (`1.` … ) を置く。行番号は `vs-counter-line` が振る。
- 章末問題は `## Exercises {.exercises}` の節に段落を並べる。番号「4-1」は生成される (節見出し自体には番号が付かない)。
- 参照は空アンカーで書く: 節 `Section <a href="#sec-xxx" data-ref="sec"></a>`、定理 `Theorem <a href="#thm-xxx" data-ref="thm"></a>`、疑似コード `<a href="#code-xxx" data-ref="code"></a>` (「4.1-a」)、行 `<a href="#line-xxx" data-ref="line"></a>`、問題 `<a href="#ex-xxx" data-ref="ex"></a>`。「Section」「Theorem」などの語は原稿側に置く。
- 空のアンカーの直後に語が続くときは VFM が空白を落とすので `&nbsp;` を置く。行や問題に id を付けるには、その要素の先頭に `<a id="…"></a>` を書く。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-pseudocode-math-sidenote',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                          | 既定値                   | 説明                         |
| ----------------------------- | ------------------------ | ---------------------------- |
| `--vs-font-family`            | `'STIX Two Text', ...`   | 本文・見出し共通のセリフ書体 |
| `--vs--monospace-font-family` | `'Source Code Pro', ...` | 疑似コードの書体             |
| `--vs-color-foreground`             | `#1a1a1a`                | 本文・罫のインク色           |
| `--vs-color-background`       | `#fafaf7`                | 地色                         |
| `--vs-color-border`           | `#8c8c8c`                | 罫の既定色                   |
| `--vs-theme-pseudocode-math-sidenote--color-muted`     | `#8c8c8c`                | サイドノート・行番号の色     |

生成内容の変数:

| 変数                                   | 既定値                                         | 説明                                       |
| -------------------------------------- | ---------------------------------------------- | ------------------------------------------ |
| `--vs-theme-pseudocode-math-sidenote--runhead-prefix-content`   | `'Chapter ' counter(vs-counter-chapter) ' · '` | `.runhead` の前に付く章表示                |
| `--vs-theme-pseudocode-math-sidenote--theorem-label`            | `'Theorem'` (`.lemma` では `'Lemma'`)          | 定理環境のラベル。種別クラス側で上書きする |
| `--vs-theme-pseudocode-math-sidenote--theorem-marker-content`   | ラベル + 章番号 + 定理番号                     | 定理環境の見出し                           |
| `--vs-theme-pseudocode-math-sidenote--theorem-call-content`     | `target-counter(…)` で「4.2」                  | `data-ref="thm"` の参照文字列              |
| `--vs-theme-pseudocode-math-sidenote--code-counter-style`       | `vs-theme-code-index` (a, b, c …)              | 疑似コードの枝番の書式                     |
| `--vs-theme-pseudocode-math-sidenote--code-call-content`        | 「4.1-a」                                      | `data-ref="code"` の参照文字列             |
| `--vs-theme-pseudocode-math-sidenote--code-line-marker-content` | `counter(vs-counter-line)`                     | 疑似コードの行番号                         |
| `--vs-theme-pseudocode-math-sidenote--code-line-call-content`   | `target-counter(…)`                            | `data-ref="line"` の参照文字列             |
| `--vs-theme-pseudocode-math-sidenote--exercise-marker-content`  | 「4-1」                                        | 章末問題の番号                             |
| `--vs-theme-pseudocode-math-sidenote--exercise-call-content`    | `target-counter(…)`                            | `data-ref="ex"` の参照文字列               |

節番号の見え方は base の `--vs-section--h2-marker-*`、節参照は `--vs-section--call-content`、ノンブルは `--vs-page--mbox-bottom-outside-content` で変更できる。

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
