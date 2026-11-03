# @vivliostyle/theme-pseudocode-math-sidenote

1段組の教科書向けテーマ。中央のディスプレイ数式 (MathML) と行番号付きの枠なし疑似コードを組み、外側の広い余白にサイドノートや図版を流し込む。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` が章番号になり、節番号「4.2」は章番号 + `vs-counter-sec-h2` から生成される。見出しに番号は書かない。番号を付けない見出し (Chapter Notes など) は `## 見出し ##` と閉じ `#` を付ける (節にならないので番号を消費しない)。
- 章題は `<p class="runhead">章題</p>` を本文先頭に置く。「Chapter 4 ·」の部分は章番号から生成されるので書かない。
- 定理環境は `<div class="theorem" id="thm-xxx">`。補題は `class="theorem lemma"`。見出しラベル (`Theorem 4.2`) は生成されるので、本文は `**(副題).** …` と副題だけを書く。
- 疑似コードは `<div class="code" id="code-xxx">` の中に番号なしの箇条書き (`1.` … ) を置く。行番号は `vs-counter-line` が振る。
- 章末問題は `## Exercises {.exercises}` の節に段落を並べる。番号「4-1」は生成される (節見出し自体には番号が付かない)。
- 参照は空アンカーで書く: 節 `Section <a href="#sec-xxx" data-ref="sec"></a>`、定理 `Theorem <a href="#thm-xxx" data-ref="thm"></a>` (「4.2」)、疑似コード `<a href="#code-xxx" data-ref="code"></a>` (「4.1-a」)、行 `<a href="#line-xxx" data-ref="line"></a>`、問題 `<a href="#ex-xxx" data-ref="ex"></a>`。「Section」「Theorem」などの語は原稿側に置く。
- 空のアンカーの直後に語が続くときは VFM が空白を落とすので `&nbsp;` を置く。行や問題に id を付けるには、その要素の先頭に `<a id="…"></a>` を書く。

## 使い方

```css
@import '@vivliostyle/theme-pseudocode-math-sidenote';
```
