# @vivliostyle/theme-masthead-index-box-two-column

2段組の英文学術ニュース誌テーマ。全幅マストヘッド(柱罫・キッカー・大見出し・デッキ・署名)と均等2段組本文、薄地の索引ボックス、全幅の脚注で組む知的な誌面を作る。

## 使い方

```css
@import '@vivliostyle/theme-masthead-index-box-two-column';
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
