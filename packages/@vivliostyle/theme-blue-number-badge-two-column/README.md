# @vivliostyle/theme-blue-number-badge-two-column

B5判縦・横組2段の部活動年間活動報告書向けテーマ。学園ブルーのアクセントカラーで、数字バッジ付き節見出し・囲み記事・写真キャプション・表を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-blue-number-badge-two-column',
};
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

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                       | 既定値                | 説明                                      |
| ------------------------------------------ | --------------------- | ----------------------------------------- |
| `--vs-page--size`                          | `182mm 257mm`         | 判型 (B5)                                 |
| `--vs-columns`                             | `2`                   | 本文の段数                                |
| `--vs-font-family`                         | `'Noto Sans JP', ...` | 本文書体                                  |
| `--vs--heading-font-family`                | `'Noto Sans JP', ...` | 見出しの書体                              |
| `--vs-theme-blue-number-badge-two-column--color-accent`                 | `#0066cc`             | 学園ブルーのアクセント色 (バッジ・罫・柱) |
| `--vs-theme-blue-number-badge-two-column--color-on-accent`              | `#ffffff`             | アクセント地の上に乗る文字色              |
| `--vs-theme-blue-number-badge-two-column--color-rule`                   | `#b9c8d8`             | 段組み境界・表罫の色                      |
| `--vs-theme-blue-number-badge-two-column--color-tint`                   | `#eef5fc`             | 囲み記事の地色                            |
| `--vs-theme-blue-number-badge-two-column--color-tint-row`               | `#f2f7fc`             | 表の縞模様行の地色                        |
| `--vs-theme-blue-number-badge-two-column--badge-size`                   | `7.2mm`               | 節番号バッジの大きさ                      |
| `--vs-page--mbox-top-left-content`         | `env(pub-title)`      | 柱 (左) の内容                            |
| `--vs-page--mbox-top-right-content`        | `env(doc-title)`      | 柱 (右) の内容                            |
| `--vs-page--mbox-bottom-center-content`     | `counter(page)` を約物で囲む | ノンブルの内容                          |
| `--vs-page--border-width-top`              | `1.1mm`               | 柱直下の太罫 (版面の上罫)                 |
