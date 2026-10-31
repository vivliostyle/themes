# @vivliostyle/theme-serif-line-numbered-code

A4判1段組のプログラミング言語学術誌テーマ。STIX Two Text のセリフ本文に Source Sans 3 の簡潔な見出し、IBM Plex Mono のコードブロックを組み合わせ、水平罫のみの表と柱・脚注で論証を構成する。節番号・図表番号・式番号・リスティング番号はすべてカウンタが付ける。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-serif-line-numbered-code',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。
`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                  | 既定値                                 | 説明                                     |
| ------------------------------------- | -------------------------------------- | ---------------------------------------- |
| `--vs-color-foreground` | `#17171b` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#14148c` | アクセント色 |
| `--vs-font-family`                    | `'STIX Two Text', ...`                 | 本文書体                                 |
| `--vs--heading-font-family`           | `--vs-font-family-alt`           | 見出し書体                               |
| `--vs-theme-serif-line-numbered-code--accent-color`                   | `--vs-color-foreground-alt` と同じ | 節番号・罫線・参照記号・コード左罫の濃紺 |
| `--vs-theme-serif-line-numbered-code--color-foreground-secondary`               | `--vs-color-foreground` × `--vs-color-background` 30% | 柱・メタ情報・脚注の控えめな文字色       |
| `--vs-color-background-alt`           | `--vs-color-foreground-alt` × `--vs-color-background` 95% | コードブロックの地色                     |
| `--vs-font-family-alt`          | `'Source Sans 3', ...`                 | 見出し・柱・キャプションの表示書体       |
| `--vs--table-border-color`            | `--vs-theme-serif-line-numbered-code--accent-color`                    | 表罫の色 (水平罫のみ)                    |
| `--vs-theme-serif-line-numbered-code--equation-marker-content` | `'(' counter(vs-counter-eq) ')'` | 別行立て数式の右端に出す式番号           |
| `--vs-theme-serif-line-numbered-code--equation-call-content`   | `'(' target-counter(…) ')'`            | 本文から式を参照したときの表示           |
| `--vs-theme-serif-line-numbered-code--listing-marker-content`  | `'Listing ' counter(…) ': '`           | リスティングのキャプション先頭の番号     |
| `--vs-theme-serif-line-numbered-code--listing-call-content`    | `'Listing ' target-counter(…)`         | 本文からリスティングを参照したときの表示 |

## 原稿の書きかた

- 節番号は theme-base の `--vs-section--*` が付ける (h2 が「1.」、h3 が「1.1」)。Markdown の見出しには番号を書かない。
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

## 見開きで組む

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
