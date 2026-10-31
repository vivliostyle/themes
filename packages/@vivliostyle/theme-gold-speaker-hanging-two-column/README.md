# @vivliostyle/theme-gold-speaker-hanging-two-column

ポッドキャストの書き起こしを書籍化するためのletter判テーマ。話者名をぶら下げで示す対話組みを横組み2段で配置し、金茶のアクセントカラーでプルクオートとタイムコード脚注を彩る。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-gold-speaker-hanging-two-column',
};
```

## 原稿の書き方

1 回 = 1 ファイル。frontmatter に `class: chapter` を書くと、その回に「第1回」「第2回」…が自動で付く。

```md
---
title: '番組名 第1回 回タイトル'
lang: ja
class: chapter
---

# 回タイトル

<span class="speaker">ハル：</span>発言<span class="footnote"><span class="tc">[00:03:20]</span>　注</span>。

## コーナー見出し

> プルクオートは<br />引用として書く
```

- 回数は原稿に書かない。`##` のコーナー見出しは段抜きで組まれる。
- 発言は 1 段落 = 1 発言。行頭の `<span class="speaker">` がぶら下げのラベルになる。
- 脚注は `<span class="footnote">` で本文中に書くと、そのページの下部へ送られて自動採番される。タイムコードは `<span class="tc">` で囲む。
- **脚注を見出し (`#`〜`######`) の中に置くと Vivliostyle が採番を取りこぼす**。見出しに注を付けたいときは直後の本文側に置く。
- 柱には `vivliostyle.config.js` の `title` (番組名) が出る。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                              | 既定値                                  | 説明                                           |
| --------------------------------- | --------------------------------------- | ---------------------------------------------- |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#d4a574` | アクセント色 |
| `--vs-font-family`                | `'Noto Sans JP', ...`                   | 本文書体                                       |
| `--vs-color-foreground`                 | `#2b2b2b` | 本文の基本色                                   |
| `--vs-theme-gold-speaker-hanging-two-column--color-accent`        | `--vs-color-foreground-alt` と同じ | 話者名・見出し罫・プルクオートの金茶アクセント |
| `--vs-color-border`          | `--vs-color-foreground` × `--vs-color-background` 75% | 脚注罫の色                                     |
| `--vs-font-family-alt`        | `'Inter', ...`                          | ノンブル・脚注番号・タイムコードの数字書体     |
| `--vs-theme-gold-speaker-hanging-two-column--quote-font-family`   | `Georgia, ...`                          | プルクオートの引用符書体                       |
| `--vs-theme-gold-speaker-hanging-two-column--speaker-size-inline` | `11mm`                                  | 話者ラベルのぶら下げ幅                         |
| `--vs-page--margin-left` / `-right` | `17mm` / `15mm`                        | ノド・小口の余白                               |
| `--vs-section--h1-marker-content` | `'第' counter(vs-counter-chapter) '回'` | 回数の表記                                     |

## 見開きで組む

ノンブルは小口側の `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。余白は右ページ (ノドが左) 基準なので、見開きにするときはノド側の余白だけ `@page :left` で差し替える。

```css
@page :left {
  /* ノド (右) を広げる */
  --vs-page--margin-left: 15mm;
  --vs-page--margin-right: 17mm;
}
```
