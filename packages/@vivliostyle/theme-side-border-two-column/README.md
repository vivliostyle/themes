# @vivliostyle/theme-side-border-two-column

2段組の一覧表テーマ。コード・名称・説明の3列罫線表を、side-border 見出しの部ごとにブロック化する参照ページ向け。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-side-border-two-column',
};
```

節は `#` 見出し、部は `##` 見出しで書く。番号は base の `vs-counter-sec-h1` / `vs-counter-sec-h2` が振るので原稿には書かない。節はページを起こし、見出しと導入文が両段抜きになる。

柱には「第N章　章題」が出る。章番号は base のドキュメントカウンタ `vs-counter-chapter`（frontmatter に `class: chapter` を書くと章ごとに増える）、章題は frontmatter の `title`（`env(doc-title)`）から取る。書式を変えるには `--vs-page--mbox-top-right-content` を上書きする。

部の表は段に収まらなくなると表頭を繰り返して次の段・次ページへ続く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                                                 | 既定値                                                    | 説明                                     |
| -------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------- |
| `--vs-color-foreground`                                              | `#1f2933`                                                 | 本文の文字色                             |
| `--vs-color-background`                                              | `#ffffff`                                                 | 紙面の地色                               |
| `--vs-color-foreground-alt`                                          | `#2b6cb0`                                                 | アクセント色                             |
| `--vs-font-family`                                                   | `'Noto Serif JP', ...`                                    | 本文・項目名の書体                       |
| `--vs-font-family-alt`                                               | `'Noto Sans JP', ...`                                     | 表頭ラベル・柱・ノンブルの書体           |
| `--vs-font-family-monospace`                                         | `'Roboto Mono', ...`                                      | コード番号の書体                         |
| `--vs-columns`                                                       | `2`                                                       | 本文の段数                               |
| `--vs-column-gap`                                                    | `8mm`                                                     | 段間                                     |
| `--vs-theme-side-border-two-column--color-accent`               | `--vs-color-foreground-alt` と同じ                        | 見出し左罫・表頭下罫・ヘッダールールの青 |
| `--vs-color-background-alt`                                          | `--vs-color-foreground-alt` × `--vs-color-background` 90% | 表頭の淡青帯                             |
| `--vs-color-border`                                                  | `--vs-color-foreground-alt` × `--vs-color-background` 75% | 表のグリッド罫・段間罫（淡い青灰）       |
| `--vs-color-border-alt`                                              | `--vs-color-foreground-alt` × `--vs-color-background` 85% | 記入行罫の淡色                           |
| `--vs-theme-side-border-two-column--color-foreground-secondary` | `--vs-color-foreground` × `--vs-color-background` 30%     | 導入文・説明欄の文字色                   |
| `--vs-page--mbox-top-right-content`                                  | `'第' counter(...) '章　' env(...)`                       | 柱の内容                                 |
