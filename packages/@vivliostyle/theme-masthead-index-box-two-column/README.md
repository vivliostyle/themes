# @vivliostyle/theme-masthead-index-box-two-column

B5判2段組の英文学術ニュース誌テーマ。全幅マストヘッド(柱罫・キッカー・大見出し・デッキ・署名)と均等2段組本文、薄地の索引ボックス、全幅の脚注で組む知的な誌面を作る。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-masthead-index-box-two-column',
};
```

## 原稿の書き方

マストヘッドは `<header>` に `.meta` (柱) / `.subhead` (キッカー) / `<h1>` / `.lead` (デッキ) / `.byline` / `.credit` を置く。本文は `## 節見出し` で 1 節。

節番号・図番号・表番号・注番号はすべて base のカウンタが付けるので、原稿には書かない。

```md
## 節見出し

本文。脚注は VFM の `[^1]` で書く。[^1]

<figure class="wide">
<img src="fig.svg" alt="…">
<figcaption>図の説明。</figcaption>
</figure>

<figure class="wide">
<figcaption>表の説明。</figcaption>

| 見出し | 見出し |
| ------ | ------ |
| …      | …      |

</figure>
```

本文から図表を参照するときは `<a href="#fig-id" data-ref="fig"></a>` (base の相互参照)。
索引ボックスは記事内の節へのリンクにするとリーダーとノンブルが自動で付く。

```md
<aside class="card">
<p class="meta">Later in this article</p>

- [節見出し](#section-id)

</aside>
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                | 既定値                                  | 説明                                         |
| ----------------------------------- | --------------------------------------- | -------------------------------------------- |
| `--vs-font-family`                  | `'Source Serif 4', ...`                 | 本文・見出しのセリフ書体                     |
| `--vs-font-family-alt`        | `'Source Sans 3', ...`                  | 柱・キッカー・署名・索引などのサンセリフ書体 |
| `--vs-color-foreground`                   | `#1a1a1a` | 本文の墨色                                   |
| `--vs-color-background`             | `#f7f5ef` | 地色                                         |
| `--vs-color-foreground-alt`             | `--vs-color-foreground` × `--vs-color-background` 35% | 所属・注・索引数字などの抑えた色             |
| `--vs-color-background-alt`         | `--vs-color-foreground` × `--vs-color-background` 95% | 索引ボックスの地色                           |
| `--vs-color-border-alt`          | `--vs-color-foreground` × `--vs-color-background` 70% | 索引ボックスのドットリーダー色               |
| `--vs-theme-masthead-index-box-two-column--columns`               | `2`                                     | 本文の段数                                   |
| `--vs-theme-masthead-index-box-two-column--column-gap`            | `7mm`                                   | 段間                                         |
| `--vs-section--h2-marker-content`   | `counter(vs-counter-sec-h2) '.'`        | 節番号の書式                                 |
| `--vs-figure--marker-content` | `'Figure ' counter(vs-counter-fig) '—'` | 図番号の書式                                 |
| `--vs-table--marker-content` | `'Table ' counter(vs-counter-tbl) '—'`  | 表番号の書式                                 |

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
