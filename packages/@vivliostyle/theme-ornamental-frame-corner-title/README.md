# @vivliostyle/theme-ornamental-frame-corner-title

短篇アンソロジー向けテーマ。二重の飾り枠と四隅の唐草角飾りを立てた扉・目次・中扉と、柱とノンブルだけを置く本文ページで、複数筆者の作品集を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-ornamental-frame-corner-title',
};
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

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                            | 既定値                   | 説明                                      |
| ----------------------------------------------- | ------------------------ | ----------------------------------------- |
| `--vs-font-family`                              | `'Noto Serif JP', serif` | 本文書体                                  |
| `--vs--heading-font-family`                     | `'Shippori Mincho', ...` | 見出し・篇題の表示書体                    |
| `--vs-color-foreground`                               | `#1c1c1c` | 本文・罫の墨色                            |
| `--vs-color-background`                         | `#faf7f1` | 地色                                      |
| `--vs-font-family-alt`                      | `'EB Garamond', ...`     | ページ数字・フォリオの数字書体            |
| `--vs-color-foreground-alt`                      | `--vs-color-foreground` × `--vs-color-background` 25% | 著者名の色                                |
| `--vs-theme-ornamental-frame-corner-title--color-lead`                        | `--vs-color-foreground` × `--vs-color-background` 40% | 内容紹介の色                              |
| `--vs-theme-ornamental-frame-corner-title--page-height`                       | `188mm`                  | 判型の高さ (`--vs-page--size` と対で持つ) |
| `--vs-theme-ornamental-frame-corner-title--plate-margin`                      | `6mm`                    | 飾りページの版面余白                      |
| `--vs-theme-ornamental-frame-corner-title--plate-corner-inset`                | `0.3em`                  | 角飾りを枠の角から離す距離                |
