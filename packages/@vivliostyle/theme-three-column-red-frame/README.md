# @vivliostyle/theme-three-column-red-frame

A4縦・3段組の超高密度な学会講演要旨集向けテーマ。赤の白抜きタイトルバーとキーワードラベル、全周の枠罫、末尾の謝辞・注意事項ボックスを組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-three-column-red-frame',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                   | 既定値                               | 説明                                       |
| -------------------------------------- | ------------------------------------ | ------------------------------------------ |
| `--vs-color-foreground` | `#1a1a1a` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#d9534f` | アクセント色 |
| `--vs-theme-three-column-red-frame--color-accent`             | `--vs-color-foreground-alt` と同じ | タイトルバー・枠罫・強調文字のアクセント色 |
| `--vs-color-background-alt`        | `--vs-color-foreground-alt` × `--vs-color-background` 85% | 注意ボックスの淡色地                       |
| `--vs--h2-text-color`          | `--vs-color-background` と同じ | タイトルバー上の文字色                     |
| `--vs-color-border`        | `--vs-color-foreground` × `--vs-color-background` 55% | 段間の罫線色                               |
| `--vs-page--border-color`              | `var(--vs-theme-three-column-red-frame--color-accent)`      | ページ全周の枠罫の色                       |
| `--vs-page--border-width`              | `0.4pt`                              | 枠罫の太さ                                 |
| `--vs-page--border-width-top`          | `2.4pt`                              | 天の枠罫 (柱下の見出し罫) の太さ           |
| `--vs-page--padding-{top,right,bottom,left}` | `3mm 2.5mm 2.5mm 2.5mm`        | 枠罫から本文までの空き                     |
| `--vs-theme-three-column-red-frame--entry-marker-content`     | `counter(vs-counter-sec-h2)`         | 演題番号の内容                             |
| `--vs-theme-three-column-red-frame--entry-marker-size-inline` | `5mm`                                | 演題番号の枠幅 (題名のぶら下げ量)          |
| `--vs-theme-three-column-red-frame--reference-marker-content` | `counter(vs-counter-reference) ') '` | 参考文献の番号                             |
| `--vs-theme-three-column-red-frame--notice-marker-content`    | `counter(vs-counter-notice) '. '`    | 注意事項の番号                             |
| `--vs-font-size`                       | `6.2pt`                              | 本文の基準フォントサイズ                   |

## 原稿の書きかた

- 要旨 1 件が `## 題名` (h2)。演題番号は書かずカウンタに任せる。接頭辞や開始番号を変えるときは `--vs-theme-three-column-red-frame--entry-marker-content` と theme-base の `--vs-section--root-counter-sec-h2` を上書きする。
- 各要旨の参考文献は `### 参考文献` (h3)。h3 には番号を付けない。
- セッションの開催情報は `<header>` に置き、セッション名は `<p class="session-title">` にする。この文字列が柱の右側に流れる。柱の左側は frontmatter の `title` (`env(doc-title)`)。
- 謝辞・注意事項・連絡先は末尾の `<footer>` に置く。`<footer>` の直前に見出しテキストの無い `##` の行を置くと、直前の演題のセクションが閉じる。
