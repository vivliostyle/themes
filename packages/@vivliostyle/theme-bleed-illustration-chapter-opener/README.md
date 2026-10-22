# @vivliostyle/theme-bleed-illustration-chapter-opener

児童向け冒険小説の章扉を兼ねた本文ページ向けテーマ。天・左右へ裁ち落とした挿絵に特大の章題を重ね、2段組の本文をドロップキャップと小さな挿絵で読みやすく組む。

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

| 変数                                           | 既定値                         | 説明                                        |
| ---------------------------------------------- | ------------------------------ | ------------------------------------------- |
| `--vs-font-family`                             | `'Atkinson Hyperlegible', ...` | 本文書体                                    |
| `--vs--heading-font-family`                    | `'League Spartan', ...`        | 章題の表示書体                              |
| `--vs-theme-bleed-illustration-chapter-opener--font-meta`                        | `'Noto Sans', ...`             | ランニングヘッド・キャプションの書体        |
| `--vs-color-foreground`                              | `#242629`                      | 本文の文字色                                |
| `--vs-color-background`                        | `#f6f1e7`                      | 地色                                        |
| `--vs-theme-bleed-illustration-chapter-opener--color-ink-strong`                 | `#17191b`                      | 章題・ドロップキャップの濃色                |
| `--vs-color-foreground-alt`                        | `#6f7374`                      | ランニングヘッド・キャプションの淡色        |
| `--vs-theme-bleed-illustration-chapter-opener--color-rule`                       | `#a9a69f`                      | キャプション両端の飾り点の色                |
| `--vs-theme-bleed-illustration-chapter-opener--chapter-band-height`              | `135mm`                        | 章扉の裁ち落とし帯の高さ                    |
| `--vs-theme-bleed-illustration-chapter-opener--chapter-title-inset-block-start`  | 帯の 40% 位置                  | 章題を帯のどこへ重ねるか (版面上端から)     |
| `--vs-theme-bleed-illustration-chapter-opener--chapter-title-inset-inline-start` | `28%`                          | 章題の左インデント (版面幅比)               |
| `--vs-theme-bleed-illustration-chapter-opener--chapter-columns`                  | `2`                            | 本文の段数                                  |
| `--vs-theme-bleed-illustration-chapter-opener--chapter-column-gap`               | `8mm`                          | 段間                                        |
| `--vs-section--counter-style`                  | `vs-theme-chapter-word`        | 章番号の表記 (英単語。`decimal` 等に変更可) |
| `--vs-section--h1-marker-content`              | `'Chapter ' counter(...)`      | 章題の上に出る章番号                        |
