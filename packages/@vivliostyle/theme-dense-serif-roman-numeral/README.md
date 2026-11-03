# @vivliostyle/theme-dense-serif-roman-numeral

PRL (Physical Review Letters) 風の速報論文テーマ。STIX Two Text の高密度セリフ2段組に、中央揃えの標題ブロック、ローマ数字のセンター見出し、段の右端に式番号を置くディスプレイ数式、図版を組む。節番号・式番号・図番号・引用番号はすべてカウンタが付ける。

## 使い方

```css
@import '@vivliostyle/theme-dense-serif-roman-numeral';
```

## 原稿の書きかた

- 節番号は自動で付く (h2 が「I.」「II.」)。Markdown の見出しには番号を書かず、大文字化も CSS に任せる。
- 論題は閉じ `#` を付けた `# 論題 #` で書く (閉じ `#` のない `#` はセクション化して後続をすべて包んでしまうため)。番号を付けたくない後付けの見出し (謝辞など) も同じく `## Acknowledgments ##` と書く。
- 標題まわりは `<div class="titleblock">` の中に `<p class="masthead">` / `h1` / `<p class="byline">` / `<p class="affil">` / `<p class="received">` / `<div class="abstract">` を置く。このブロックだけが段抜きになり、以降が 2 段に流れる。
- 別行立ての数式は `<div class="equation" id="eq-id">` で `$$…$$` を包む。式番号は文書を通した連番で、本文からは `<a href="#eq-id" data-ref="eq"></a>` (「Eq. (4)」) で参照する。
- 図は `<figure id="fig-id">` + `<img>` + `<figcaption>`。図番号は自動で、参照は `<a href="#fig-id" data-ref="fig"></a>` (「Fig. 1」)。図題に数式を書く場合は `<figcaption>` の中を空行で区切って段落として書く (1 行で書くと VFM が `$…$` を処理しない)。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>` (「Sec. IV」)。
- 参考文献は `<ol class="cite-items">` + `<li id="ref-id">`、本文からは `<a href="#ref-id" data-ref="cite"></a>` (「[5]」)。「[6,7]」「[1–4]」のように連ねるときは番号だけを出す `data-ref="citenum"` を使い、括弧と区切りは原稿側で書く。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#fig-id" data-ref="fig"></a>&nbsp;shows` のように `&nbsp;` を置く。直後が句読点なら不要。
