# @vivliostyle/theme-number-badge-two-column

横組2段の年間活動報告書向けテーマ。アクセントカラーで、数字バッジ付き節見出し・囲み記事・写真キャプション・表を組む。

## 使い方

```css
@import '@vivliostyle/theme-number-badge-two-column';
```

## 原稿の組み立て

1 団体の報告を 1 つの md にする。本文は 2 段組で流れ、分量に応じてページが増える。

```md
<header class="headline">
<h1>天文部　年間活動報告</h1>
<p class="byline">みなみのはら高校　天文部</p>
</header>

リード文。

## 春の新入生歓迎観望会（4月）

本文。

<div class="record">
<h3>年間活動記録</h3>

| 月  | 活動内容 | 参加 |
| --- | -------- | ---- |

</div>

<aside class="note">
<h3>部長のひとこと</h3>

本文。

<p class="signature">部長　三雲　灯里（2年）</p>
</aside>
```

- 大見出しは `<header class="headline">` の中に生 HTML の h1 (section に包ませないため) と `p.byline`。
- 節は `## 見出し`。青角バッジの `01` `02` … は theme-base の見出しカウンタで自動採番されるので、md には番号を書かない。
- 記録表は `<div class="record">` + 生 HTML の h3、囲み記事は `<aside class="note">`。どちらも `break-inside: avoid`。
- 柱は左が書名 (`env(pub-title)` = `vivliostyle.config.js` の `title`)、右がその報告の題 (`env(doc-title)` = frontmatter の `title`)。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                       | 既定値                | 説明                                      |
| ------------------------------------------ | --------------------- | ----------------------------------------- |
| `--vs-theme-number-badge-two-column--color-accent`                 | `--vs-color-foreground-alt` と同じ | アクセント色 (バッジ・罫・柱) |
| `--vs-theme-number-badge-two-column--badge-size`                   | `2.6rem`              | 節番号バッジの大きさ                      |
