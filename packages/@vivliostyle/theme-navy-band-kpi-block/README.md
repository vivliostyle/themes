# @vivliostyle/theme-navy-band-kpi-block

B5判・横組み2段組の四半期決算短信〔速報〕向けテーマ。紺青のタイトルバンドとKPIブロック、2トーン棒グラフ、タブラー数字で揃えた財務表を組み合わせ、情報密度の高い速報資料の紙面を作る。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-navy-band-kpi-block',
};
```

## 原稿の書き方

- 節見出し (`##`) には「1．」、項見出し (`###`) には「（1）」が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `### 見出し ###` と閉じ `#` を付けるか、生の `<h3>` で書く。
- 図表は `<figure>` で囲み `<figcaption>` を置くと「図1　」「表1　」が自動で付く。表は `<figure class="tbl">`、グラフは `<figure class="chart">` を使う。
- 本文からの参照は `<a href="#tbl-results" data-ref="tbl"></a>` / `data-ref="fig"` / `data-ref="sec"` と書く。番号・節名は参照先から生成されるので原稿には書かない。参照の直後に欧文が続く場合は `&nbsp;` を挟む (VFM が空要素直後の空白を落とすため)。
- 最終行が合計行の財務表には `<figure class="tbl sum-last">` を付けると総計行が強調される。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                     | 既定値                          | 説明                                         |
| ---------------------------------------- | ------------------------------- | -------------------------------------------- |
| `--vs-color-foreground` | `#1f2328` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#1a73e8` | アクセント色 |
| `--vs-theme-navy-band-kpi-block--color-accent`               | `--vs-color-foreground-alt` と同じ | タイトルバンド・KPI・見出しブロックの基調色  |
| `--vs-theme-navy-band-kpi-block--color-accent-deep`          | `--vs-color-foreground-alt` × `--vs-color-foreground` 35% | 罫線・見出しブロック左帯などの濃色アクセント |
| `--vs-color-background-alt`                 | `--vs-color-foreground-alt` × `--vs-color-background` 90% | KPIブロック・表ヘッダの淡色背景              |
| `--vs-theme-navy-band-kpi-block--color-foreground-secondary`                | `--vs-color-foreground` × `--vs-color-background` 30% | 凡例・補足テキストの色                       |
| `--vs-color-border`                 | `--vs-color-foreground` × `--vs-color-background` 85% | 段間罫・表罫の色                             |
| `--vs-font-family-alt`               | `'Roboto', 'Noto Sans JP', ...` | KPI数値・財務表の等幅タブラー数字書体        |
| `--vs-theme-navy-band-kpi-block--table-label-size-inline`    | `34%`                           | 財務表の科目名列の幅 (表ごとに上書きする)    |
| `--vs-theme-navy-band-kpi-block--table-sum-background-color` | `--vs-theme-navy-band-kpi-block--color-tint-subtle` と同じ | 合計行の地色                                 |
| `--vs-theme-navy-band-kpi-block--table-sum-rule-color`       | `--vs-theme-navy-band-kpi-block--color-accent-deep` と同じ | 合計行の上罫の色                             |
| `--vs-theme-navy-band-kpi-block--table-sum-rule-width`       | `0.9pt`                         | 合計行の上罫の太さ                           |
| `--vs-font-family`                       | `'Noto Sans JP', ...`           | 本文書体                                     |
| `--vs--table-border-color`               | `--vs-color-border` と同じ | 財務表の罫色                                 |

## 見開きで組む

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
