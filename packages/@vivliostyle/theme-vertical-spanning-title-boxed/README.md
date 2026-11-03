# @vivliostyle/theme-vertical-spanning-title-boxed

縦組みの総合誌特集ページテーマ。右端に段抜きの大題と縦罫・著者名、上下2段の縦組み本文と傍注列、下段には肖像・略歴・用語解説の囲み記事を配する、戦後論壇誌風の紙面を作る。

## 使い方

```css
@import '@vivliostyle/theme-vertical-spanning-title-boxed';
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
