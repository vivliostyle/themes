# @vivliostyle/theme-ornamental-frame-corner-title

短篇アンソロジー向けテーマ。二重の飾り枠と四隅の唐草角飾りを立てた扉・目次・中扉と、柱とノンブルだけを置く本文ページで、複数筆者の作品集を組む。

## 使い方

```css
@import '@vivliostyle/theme-ornamental-frame-corner-title';
```

## 原稿の書き方

ページの種類は frontmatter の `class` で切り替える。

| `class`                     | ページ                                               |
| --------------------------- | ---------------------------------------------------- |
| `plate plate--title`        | 書名扉。`.subtitle` / `.byline` / `.imprint` を置く  |
| `plate plate--toc`          | 目次。中身は `<nav role="doc-toc">` のリスト         |
| `plate plate--work chapter` | 篇の中扉。`chapter` を付けると篇番号が自動で振られる |
| (指定なし)                  | 本文。柱は frontmatter の `title` から取る           |

篇番号 (`第一篇` …) は base のドキュメントカウンタ `vs-counter-chapter` から生成するので、原稿には書かない。目次のページ数も `target-counter()` で自動に付くので書かない。

```md
---
title: '篇題'
lang: ja
class: plate plate--work chapter
---

<div class="corners"><img class="corner" src="fig-corner.svg" alt="" /><img class="corner" src="fig-corner.svg" alt="" /><img class="corner" src="fig-corner.svg" alt="" /><img class="corner" src="fig-corner.svg" alt="" /></div>

<header>

---

</header>

# 篇題

<p class="byline">著者名</p>

<p class="lead">内容紹介。</p>
```

目次は篇題のリンクの中に著者名を入れる。リーダーとページ数はリンクの後ろに自動で付く。

```md
<nav role="doc-toc">

1. [篇題<span class="byline">著者名</span>](work-title.html)

   内容紹介。

<p class="afterword"><a href="afterword.html">編者あとがき</a></p>

</nav>
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                            | 既定値                   | 説明                                      |
| ----------------------------------------------- | ------------------------ | ----------------------------------------- |
| `--vs-theme-ornamental-frame-corner-title--color-lead`                        | `--vs-color-foreground` × `--vs-color-background` 40% | 内容紹介の色                              |
| `--vs-theme-ornamental-frame-corner-title--page-height`                       | `188mm`                  | 判型の高さ (`--vs-page--size` と対で持つ) |
| `--vs-theme-ornamental-frame-corner-title--plate-margin`                      | `6mm`                    | 飾りページの版面余白                      |
| `--vs-theme-ornamental-frame-corner-title--plate-corner-inset`                | `0.3em`                  | 角飾りを枠の角から離す距離                |
