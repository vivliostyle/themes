# @vivliostyle/theme-double-rule-split-form

A4判縦・墨1色の複合帳票テーマ。上半分に伝票(表題・宛名・金額ボックス・収入印紙枠・角印)、下半分に明細(明細表・小計/消費税/合計)を収め、中央の太い二重罫で1ページに2帳票を分割する。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-double-rule-split-form',
};
```

1 通の帳票を 1 つの md に書く。`#` 見出しが帳票の表題で、1 つ目が上半分の伝票部、2 つ目が下半分の明細部になる。伝票部の要素は class で指定する。

| 書き方                                                         | 役割                       |
| -------------------------------------------------------------- | -------------------------- |
| `# <span class="ttl">領収書</span><span class="meta">…</span>` | 表題と発行日・伝票番号     |
| `<p class="addressee">宛先 <span>御中</span></p>`              | 下線付きの宛名             |
| `<p class="amount"><span>金額</span><strong>¥0-</strong></p>`  | 太枠の金額ボックス         |
| `<p class="statement">但し …</p>`                              | 但し書き・件名             |
| `<footer>` 内の `.stamp-area` / `.signature`                   | 収入印紙枠と発行者欄・角印 |

明細表は 1 列目を品名、2 列目を数量、3 列目を単価、4 列目を金額として組む。**最後の 3 行を小計・消費税・合計**として扱い、罫線を結合セル風に見せる。明細が版面に収まらなくなると表頭を繰り返して次ページへ続き、外枠も各ページに引かれる。

他の帳票の伝票番号を引くには、参照元に `<span id="serial">…</span>` を置き、参照先で `<a href="estimate.html#serial" data-ref="doc"></a>` と書く（`target-text()` で解決される）。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                   | 既定値                       | 説明                               |
| -------------------------------------- | ---------------------------- | ---------------------------------- |
| `--vs-color-background` | `transparent` | 紙面の地色 |
| `--vs-font-family`                     | `'Noto Sans JP', sans-serif` | 本文・表題の書体                   |
| `--vs-color-foreground`                      | `#1a1a1a` | 本文の墨色                         |
| `--vs-color-border`                    | `--vs-color-foreground` と同じ | 外枠・仕切り罫・金額ボックスの罫色 |
| `--vs-theme-double-rule-split-form--upper-form-block-size`    | `131mm`                      | 上半分（伝票部）の高さ             |
| `--vs-theme-double-rule-split-form--divider-gap`              | `1.3mm`                      | 中央の二重罫のアキ                 |
| `--vs-theme-double-rule-split-form--row-block-size`           | `10mm`                       | 明細表の記入行の高さ               |
| `--vs-theme-double-rule-split-form--item-width`               | `37%`                        | 品名欄の幅                         |
| `--vs-theme-double-rule-split-form--quantity-width`           | `16%`                        | 数量欄の幅                         |
| `--vs-theme-double-rule-split-form--unit-price-width`         | `22%`                        | 単価欄の幅                         |
| `--vs-theme-double-rule-split-form--amount-width`             | `25%`                        | 金額欄の幅                         |
| `--vs--table-border-width-outer`       | `0.5mm`                      | 明細表の外枠幅                     |
| `--vs--table-border-width-thead-inner` | `0.45mm`                     | 明細表の表頭下罫幅                 |
