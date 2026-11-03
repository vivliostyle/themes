# @vivliostyle/theme-title-band-grid-table

横組みの利用明細書テーマ。ベタ帯タイトルと請求概要の太枠ボックス、3段組の格子表で利用明細を密に組む実務帳票。

## 使い方

```css
@import '@vivliostyle/theme-title-band-grid-table';
```

明細は `<div class="cols">` の中に `<section class="col">` を並べて書く。`.cols` は段組で、区分ごとに段が改まり、1 段に収まらない明細は表頭を繰り返しながら次の段・次のページへ流れる。区分見出し（`<h2>`）の番号は base の `vs-counter-sec-h2` が振るので、原稿には書かない。

明細表は 1 列目を利用日、2 列目をご利用先、3 列目を金額として組む。`tbody` の最終行は小計として太罫で締められる。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                       | 既定値    | 説明                                     |
| ------------------------------------------ | --------- | ---------------------------------------- |
| `--vs-theme-title-band-grid-table--color-accent`                 | `--vs-color-foreground-alt` と同じ | タイトル帯・見出し帯・請求概要枠の基調色 |
