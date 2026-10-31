# @vivliostyle/theme-vertical-spanning-title-boxed

A4縦組みの総合誌特集ページテーマ。右端に段抜きの大題と縦罫・著者名、上下2段の縦組み本文と傍注列、下段には肖像・略歴・用語解説の囲み記事を配する、墨一色の戦後論壇誌風の紙面を作る。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-vertical-spanning-title-boxed',
};
```

## 原稿の書き方

記事の頭に柱へ流す特集名 (`.running-feature`) と大題 (`<header class="headline">`) を置き、あとは普通に本文を書く。本文は上下2段とページをまたいで流れるので、分量に応じてページ数が増減する。

註は `<span class="footnote">…</span>` を本文中に書く。合印 (`＊1`) と版面の地の註欄は base の脚注機構が組む。番号を振らない中見出しは閉じ `#` を添える。

```md
---
title: '論題'
lang: ja
---

<p class="running-feature">特集　◯◯◯</p>

<header class="headline">
<h1>大題<span class="subhead">──副題</span></h1>
<p class="byline"><span class="meta">肩書</span>　著者名</p>
</header>

<aside class="card">

![著者近影のキャプション](fig-portrait.svg)

<div class="bio">

略歴。

</div>

<div class="glossary">

<p class="subhead">用語解説</p>

**語**：語釈。

</div>

</aside>

本文<span class="footnote">註の本文。</span>。

## 中見出し ##
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                    | 既定値                              | 説明                              |
| --------------------------------------- | ----------------------------------- | --------------------------------- |
| `--vs-font-family`                      | `'Noto Serif JP', ...`              | 本文・見出しの明朝書体            |
| `--vs-color-foreground`                       | `#1a1a1a` | 本文・罫の墨色                    |
| `--vs-color-background`                 | `#f5f2ea` | 黄味がかった地色                  |
| `--vs--h1-font-size`                    | `26pt`                              | 大題 (縦組み) の文字サイズ        |
| `--vs-theme-vertical-spanning-title-boxed--columns`                   | `2`                                 | 段数 (縦組みなので上下に積まれる) |
| `--vs-theme-vertical-spanning-title-boxed--column-gap`                | `6mm`                               | 段間                              |
| `--vs-theme-vertical-spanning-title-boxed--headline-margin-block-end` | `5mm`                               | 大題と本文のアキ                  |
| `--vs-theme-vertical-spanning-title-boxed--card-size-inline`          | `62mm`                              | 囲み記事の高さ                    |
| `--vs-footnote--call-content`           | `'＊' counter(vs-counter-footnote)` | 合印の書式                        |
