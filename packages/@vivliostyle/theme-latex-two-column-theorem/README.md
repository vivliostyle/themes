# @vivliostyle/theme-latex-two-column-theorem

2段組の学術論文誌テーマ。LaTeX 風の番号付き見出し、罫線ボックスの定理環境、段の右端に式番号を置くディスプレイ数式、booktabs 風の表、ページ下部の脚注を組む。節番号・定理番号・式番号・表番号・引用番号はすべてカウンタが付ける。

## 使い方

```css
@import '@vivliostyle/theme-latex-two-column-theorem';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                                          | 既定値                             | 説明                                                                                            |
| ------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--vs-theme-latex-two-column-theorem--theorem-number-content` | `counter(vs-counter-sec-h2) '.' …` | 定理番号の組み立て (既定は「節.通番」)                                                          |

## 原稿の書きかた

- 節番号は自動で付く (h2 が「1.」、h3 が「3.1」)。Markdown の見出しには番号を書かない。
- 論題は閉じ `#` を付けた `# 論題 #` で書く (閉じ `#` のない `#` はセクション化して後続をすべて包んでしまうため)。番号を付けたくない後付けの見出し (謝辞・参考文献など) も同じく `## References ##` と書く。
- 標題まわりは `<div class="titleblock">` の中に `<p class="jref">` / `h1` / `<p class="byline">` / `<p class="running-author">` / `<p class="affil">` / `<div class="abstract">` / `<p class="kwd">` を置く。このブロックだけが段抜きになり、以降が 2 段に流れる。
- 柱は原稿から取る。左は `<p class="running-author">` (本文には出ず柱にだけ出る running element)、右は `<p class="jref">` の中に置いた `<span class="journal">誌名</span>`。
- 付録は `## 見出し {.appendix}`。本文の節番号を消費せず「Appendix A.」と採番され、中の定理は「A.1」になる。本文から参照するときは `Lemma <a href="#id" data-ref="thm" class="appendix"></a>` / `<a href="#id" data-ref="sec" class="appendix"></a>` のように `appendix` クラスを付ける。
- 定理環境は `<div class="theorem">`。種別は `lemma` / `proposition` / `corollary` / `definition` / `example` / `remark` を足す。番号は「節.通番」で自動採番され、参照は `Theorem <a href="#thm-id" data-ref="thm"></a>`。
- 証明は `<div class="proof">`、末尾に □ を出すなら `qed`、概略なら `sketch` を足す。別行立ての数式を挟んで証明が続くときは、後半を `<div class="proof continued">` にすると冒頭のラベルを繰り返さない。
- 別行立ての数式は `<div class="equation" id="eq-id">` で `$$…$$` を包む。式番号は文書を通した連番で、本文からは `<a href="#eq-id" data-ref="eq"></a>` で参照する。
- 表は `<figure class="tbl" id="tbl-id">` の中に `<figcaption>` と Markdown の表を置く (前後に空行が要る)。番号は自動で、参照は `<a href="#tbl-id" data-ref="tbl"></a>`。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>` (「Section 3.1」)。表の欄などで番号だけを出したいときは `number` クラスを付ける。
- 脚注は `<span class="footnote">…</span>` でページ下部に落ちる。参考文献は `<ol class="cite-items">` + `<li id="ref-id">`、本文からは `<a href="#ref-id" data-ref="cite"></a>`。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#tbl-id" data-ref="tbl"></a>&nbsp;shows` のように `&nbsp;` を置く。直後が句読点なら不要。
