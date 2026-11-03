# @vivliostyle/theme-bleed-illustration-chapter-opener

児童向け小説の章扉を兼ねた本文ページ向けテーマ。天・左右へ裁ち落とした挿絵に特大の章題を重ね、2段組の本文をドロップキャップと小さな挿絵で読みやすく組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-bleed-illustration-chapter-opener',
};
```

## 原稿の書き方

`# 章題` 1 つで 1 章。章は必ず改ページで始まり、章番号 (`Chapter One` …) は
base のセクションカウンタから自動で付くので、見出しには番号を書かない。
章扉の裁ち落とし挿絵は章題の直後に置く。

```md
---
title: 書名
---

# 章題

<header class="bleed">

![挿絵の説明](fig.svg)

</header>

本文の1段落目はドロップキャップになる。…

![段に差し込む小さな挿絵の説明](fig-small.svg)
```

裁ち落とし帯の上端に出るランニングヘッドは frontmatter の `title` (`env(doc-title)`) から取る。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                                                | 既定値                                                | 説明                                        |
| ------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| `--vs-font-family`                                                  | `'Atkinson Hyperlegible', ...`                        | 本文書体                                    |
| `--vs--heading-font-family`                                         | `'League Spartan', ...`                               | 章題・章番号の表示書体                      |
| `--vs-font-family-alt`                                              | `'Noto Sans', ...`                                    | ランニングヘッド・キャプション・ノンブルの書体 |
| `--vs-color-foreground`                                             | `#242629`                                             | 本文の文字色                                |
| `--vs-color-background`                                             | `#f6f1e7`                                             | 地色                                        |
| `--vs-theme-bleed-illustration-chapter-opener--color-ink-strong`    | `--vs-color-foreground` × `#000` 20%                  | 章題・ドロップキャップの濃色                |
| `--vs-color-foreground-alt`                                         | `--vs-color-foreground` × `--vs-color-background` 40% | ランニングヘッド・キャプション・ノンブルの淡色 |
| `--vs-theme-bleed-illustration-chapter-opener--chapter-band-height` | `135mm`                                               | 章扉の裁ち落とし帯の高さ。章題は帯の 40% の位置に重なる |
| `--vs--h1-margin-inline`                                            | `28% 0`                                               | 章題の左インデント (版面幅比)               |
| `--vs-columns`                                                      | `2`                                                   | 本文の段数                                  |
| `--vs-column-gap`                                                   | `8mm`                                                 | 段間                                        |
| `--vs-section--counter-style`                                       | `vs-theme-chapter-word`                               | 章番号の表記 (英単語。`decimal` 等に変更可) |
| `--vs-section--h1-marker-content`                                   | `'Chapter ' counter(...)`                             | 章題の上に出る章番号                        |
