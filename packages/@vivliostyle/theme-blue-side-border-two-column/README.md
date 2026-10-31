# @vivliostyle/theme-blue-side-border-two-column

A4判2段組の勘定科目一覧表テーマ。コード・勘定科目・説明の3列罫線表を、資産・負債・純資産・収益・費用の五部に青い side-border 見出しでブロック化する、青色申告向け記帳実務ガイドの参照ページ。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-blue-side-border-two-column',
};
```

節は `#` 見出し、部は `##` 見出しで書く。番号は base の `vs-counter-sec-h1` / `vs-counter-sec-h2` が振るので原稿には書かない。節はページを起こし、見出しと導入文が両段抜きになる。

柱には「第N章　章題」が出る。章番号は base のドキュメントカウンタ `vs-counter-chapter`（frontmatter に `class: chapter` を書くと章ごとに増える）、章題は frontmatter の `title`（`env(doc-title)`）から取る。書式を変えるには `--vs-page--mbox-top-right-content` を上書きする。

部の表は段に収まらなくなると表頭を繰り返して次の段・次ページへ続く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                               | 既定値                              | 説明                                     |
| ---------------------------------- | ----------------------------------- | ---------------------------------------- |
| `--vs-color-foreground` | `#1f2933` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#2b6cb0` | アクセント色 |
| `--vs-font-family`                 | `'Noto Serif JP', ...`              | 本文・勘定科目名の書体                   |
| `--vs--th-font-family`             | `'Noto Sans JP', ...`               | 表頭ラベルの書体                         |
| `--vs-theme-blue-side-border-two-column--color-accent`         | `--vs-color-foreground-alt` と同じ | 見出し左罫・表頭下罫・ヘッダールールの青 |
| `--vs-theme-blue-side-border-two-column--color-accent-deep`    | `--vs-color-foreground-alt` × `--vs-color-foreground` 50% | コード番号の濃い青                       |
| `--vs-color-background-alt`    | `--vs-color-foreground-alt` × `--vs-color-background` 90% | 表頭の淡青帯                             |
| `--vs-color-border`           | `--vs-color-foreground-alt` × `--vs-color-background` 75% | 表のグリッド罫（淡い青灰）               |
| `--vs-color-border-alt`      | `--vs-color-foreground-alt` × `--vs-color-background` 85% | 記入行罫の淡色                           |
| `--vs-theme-blue-side-border-two-column--color-foreground-secondary`          | `--vs-color-foreground` × `--vs-color-background` 30% | 導入文・説明欄の文字色                   |
| `--vs-theme-blue-side-border-two-column--table-code-width`     | `15%`                               | コード欄の幅                             |
| `--vs-theme-blue-side-border-two-column--table-name-width`     | `29%`                               | 勘定科目欄の幅                           |
| `--vs-theme-blue-side-border-two-column--table-note-width`     | `56%`                               | 説明欄の幅                               |
| `--vs-page--mbox-top-right-content` | `'第' counter(...) '章　' env(...)` | 柱の内容                                 |
