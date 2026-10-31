# @vivliostyle/theme-numbered-heading-ledger-list

B5判・横書き2段組の同窓会名簿向けテーマ。柱+ヘッダー罫、番号付き卒業年度見出し、№・氏名・職業・連絡先の4列台帳型グリッドを高密度に反復させる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-numbered-heading-ledger-list',
};
```

## 原稿の書き方

- 章は `#` 見出しで始める。章題は紙面には出さず、running element として天の柱に流れる (章ごとに改ページ)。
- 年度ごとの節は `##` 見出し。番号は原稿に書かず、テーマが章内の連番で振る。番号を付けない節は閉じ `#` を付けて `## 本章の凡例 ##` と書く。
- 節への参照は `<a href="#節のid" data-ref="sec"></a>` (「18節」のように出る)。参照先の見出しには `## 住所不明会員 {#sec-unknown}` で id を付ける。
- 会則などの条文は `<p class="article">（名称）　…</p>` と書く。「第1条」はテーマが振る。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                 | 既定値                       | 説明                               |
| ------------------------------------ | ---------------------------- | ---------------------------------- |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-theme-numbered-heading-ledger-list--article-marker-content` | `'第' counter(…) '条'`       | 条文番号の書式                     |
| `--vs-font-family`                   | `'Noto Sans JP', sans-serif` | 本文・見出し書体                   |
| `--vs-font-family-alt`           | `'IBM Plex Sans', ...`       | 会員番号・連絡先のタブラー数字書体 |
| `--vs-color-foreground`                    | `#1a1a1a` | 本文・罫の墨色                     |
| `--vs-color-border-alt`             | `--vs-color-foreground` × `--vs-color-background` 55% | 行間・段間の細罫色                 |
| `--vs--th-background-color`             | `--vs-color-foreground` × `--vs-color-background` 95% | 表ヘッダーの淡色地                 |

## 見開きで組む

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
