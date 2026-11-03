# @vivliostyle/theme-bleed-illustration-chapter-opener

児童向け小説の章扉を兼ねた本文ページ向けテーマ。天・左右へ裁ち落とした挿絵に特大の章題を重ね、2段組の本文をドロップキャップと小さな挿絵で読みやすく組む。

## 使い方

```css
@import '@vivliostyle/theme-bleed-illustration-chapter-opener';
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

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                                                | 既定値                                                | 説明                                        |
| ------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| `--vs-theme-bleed-illustration-chapter-opener--color-ink-strong`    | `--vs-color-foreground` × `#000` 20%                  | 章題・ドロップキャップの濃色                |
| `--vs-theme-bleed-illustration-chapter-opener--chapter-band-height` | `135mm`                                               | 章扉の裁ち落とし帯の高さ。章題は帯の 40% の位置に重なる |
