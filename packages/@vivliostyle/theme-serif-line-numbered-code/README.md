# @vivliostyle/theme-serif-line-numbered-code

1段組の学術誌テーマ。STIX Two Text のセリフ本文に Source Sans 3 の簡潔な見出し、IBM Plex Mono のコードブロックを組み合わせ、水平罫のみの表と柱・脚注で論証を構成する。節番号・図表番号・式番号・リスティング番号はすべてカウンタが付ける。

## 使い方

```css
@import '@vivliostyle/theme-serif-line-numbered-code';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                  | 既定値                                 | 説明                                     |
| ------------------------------------- | -------------------------------------- | ---------------------------------------- |
| `--vs-theme-serif-line-numbered-code--accent-color`                   | `--vs-color-foreground-alt` と同じ | 節番号・罫線・参照記号・コード左罫の濃紺 |
| `--vs-theme-serif-line-numbered-code--color-foreground-secondary`               | `--vs-color-foreground` × `--vs-color-background` 30% | 柱・メタ情報・脚注の控えめな文字色       |

## 原稿の書きかた

- 節番号は自動で付く (h2 が「1.」、h3 が「1.1」)。Markdown の見出しには番号を書かない。
- 論題は閉じ `#` を付けた `# 論題 #` で書く (閉じ `#` のない `#` はセクション化して後続をすべて包んでしまうため)。番号を付けたくない後付けの見出し (謝辞・参考文献など) も同じく `## References ##` と書く。こうすると節番号は本文の `##` から 1 で始まる。
- 柱は原稿から取る。左は誌名を入れた `<span class="journal">誌名</span>` (`.masthead` の中に置く)、右は `h1` の論題が `string-set` で流れる。
- 標題まわりは `<p class="masthead">` / `<p class="byline">` / `<p class="meta">` / `<div class="abstract">`。抄録は `<div class="abstract">` の中に生 HTML の `<h2>` を置く (セクション化させないため)。
- 図は `![キャプション](fig.svg){#fig-id}`、本文からの参照は `<a href="#fig-id" data-ref="fig"></a>`。
- 表は `<figure class="tbl" id="tbl-id">` で包み、`<figcaption>` にキャプションを書く (番号は自動)。
- コードのリスティングは `<figure class="listing" id="lst-id">` + `<figcaption>`、参照は `<a href="#lst-id" data-ref="lst"></a>`。
- 別行立ての数式は `<div class="equation" id="eq-id">` で包む。式番号はカウンタが付け、本文からは `Equation <a href="#eq-id" data-ref="eq"></a>` で参照する。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>`、参考文献は `<ol class="cite-items">` + `<a href="#ref-id" data-ref="cite"></a>`。
- 脚注は `<span class="footnote">…</span>` でページ下部に落ちる。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#sec-id" data-ref="sec"></a>&nbsp;describes` のように `&nbsp;` を置く。直後が句読点なら不要。
