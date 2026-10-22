# @vivliostyle/theme-ornamental-frame-corner-title

四六判 (127×188mm) の短篇アンソロジー向けテーマ。二重の飾り枠と四隅の唐草角飾りを立てた扉・目次・中扉と、柱とノンブルだけを置く本文ページで、複数筆者の作品集を組む。

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

| 変数                                            | 既定値                   | 説明                                      |
| ----------------------------------------------- | ------------------------ | ----------------------------------------- |
| `--vs-font-family`                              | `'Noto Serif JP', serif` | 本文書体                                  |
| `--vs--heading-font-family`                     | `'Shippori Mincho', ...` | 見出し・篇題の表示書体                    |
| `--vs-color-foreground`                               | `#1c1c1c`                | 本文・罫の墨色                            |
| `--vs-color-background`                         | `#faf7f1`                | 地色                                      |
| `--vs-theme-ornamental-frame-corner-title--font-numeral`                      | `'EB Garamond', ...`     | ページ数字・フォリオの数字書体            |
| `--vs-theme-ornamental-frame-corner-title--color-byline`                      | `#4a463f`                | 著者名の色                                |
| `--vs-theme-ornamental-frame-corner-title--color-lead`                        | `#6f6a60`                | 内容紹介の色                              |
| `--vs-theme-ornamental-frame-corner-title--page-height`                       | `188mm`                  | 判型の高さ (`--vs-page--size` と対で持つ) |
| `--vs-theme-ornamental-frame-corner-title--plate-margin`                      | `6mm`                    | 飾りページの版面余白                      |
| `--vs-theme-ornamental-frame-corner-title--plate-border-width`                | `1.4pt`                  | 飾り枠 (外) の太さ                        |
| `--vs-theme-ornamental-frame-corner-title--plate-inner-border-width`          | `0.5pt`                  | 飾り枠 (内) の太さ                        |
| `--vs-theme-ornamental-frame-corner-title--plate-inner-border-inset`          | `1.9mm`                  | 内枠の食い込み                            |
| `--vs-theme-ornamental-frame-corner-title--plate-corner-size`                 | `15mm`                   | 角飾りの大きさ                            |
| `--vs-theme-ornamental-frame-corner-title--plate-headline-margin-block-start` | `58mm`                   | 扉の見出し塊を天から落とす位置            |
| `--vs-theme-ornamental-frame-corner-title--work-marker-content`               | `'第' counter(...) '篇'` | 中扉の篇番号                              |
| `--vs-theme-ornamental-frame-corner-title--toc-counter-style`                 | `cjk-ideographic`        | 目次の項番号の表記                        |
