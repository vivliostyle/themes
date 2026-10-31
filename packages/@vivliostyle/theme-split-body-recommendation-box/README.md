# @vivliostyle/theme-split-body-recommendation-box

A4判・横書き2段組の診療ガイドライン本編向けテーマ。節ごとに改ページし、左段に本文と節末の注、右段に表と推奨ボックスを配置して、墨一色の階調で情報階層を表現する。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-split-body-recommendation-box',
};
```

## 原稿の書き方

章番号・節番号・表番号・図番号・推奨番号・注番号はすべてカウンタで生成する。原稿には番号を書かない。

```md
---
title: 恒常性機能障害診療ガイドライン（2026年改訂版） # 柱に出る
---

## 慢性期の管理 <!-- → 3. 慢性期の管理 -->

### 薬物療法の適応判断 {#sec-indication} <!-- → 3.2 薬物療法の適応判断 -->

本文…<a href="#note-indication-1" data-ref="note"></a>

<div class="notes"> <!-- 節末の注。番号は節ごとに 1 から -->

1. <a id="note-indication-1"></a>三雲ら，…

</div>

<div class="sidebar"> <!-- 右段に送る補足 (表・推奨ボックス) -->

<figure id="tbl-indication">

<figcaption>推奨とエビデンスレベル</figcaption> <!-- → 表3-2　推奨とエビデンスレベル -->

| 推奨 | 推奨クラス | エビデンスレベル |
| ---- | ---------- | ---------------- |
| …    | クラスI    | レベルB          |

</figure>

<aside class="card recommendation"> <!-- → 推奨 3-2 -->

薬物療法の適応は…

</aside>

</div>
```

参照は空のアンカーで書く。

| 記法                                                | 出力       |
| --------------------------------------------------- | ---------- |
| `<a href="#sec-indication" data-ref="sec"></a>`     | 3.2        |
| `<a href="#tbl-indication" data-ref="tbl"></a>`     | 表3-2      |
| `<a href="#fig-algorithm" data-ref="fig"></a>`      | 図3-1      |
| `<a href="#note-indication-1" data-ref="note"></a>` | 上付きの 1 |

図 (表以外の囲み) には `<figure class="fig">` を付ける。表を含む `<figure>` は自動で表として採番される。注に id を付けるには、リスト項目の先頭に `<a id="…"></a>` を置く (VFM の属性記法 `{#id}` は見出しにしか効かない)。VFM は空のインライン要素の直後の空白を落とすため、参照の後に和文以外が続くときは `&nbsp;` を置く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                        | 既定値                                                        | 説明                                     |
| ------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------- |
| `--vs-color-foreground` | `#1a1a1a` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-font-family`                          | `'Noto Serif JP', serif`                                      | 本文書体                                 |
| `--vs--heading-font-family`                 | `'Noto Sans JP', ...`                                         | 見出しの表示書体                         |
| `--vs-font-family-alt`                     | `'Noto Sans JP', ...`                                         | 表・キャプション等のゴシック書体         |
| `--vs-color-border`                    | `--vs-color-foreground` × `--vs-color-background` 25% | 柱下の罫・表罫・注の区切り罫の色         |
| `--vs-color-background-alt`                    | `--vs-color-foreground` × `--vs-color-background` 90% | 表ヘッダ・推奨ボックスの地色             |
| `--vs-columns`                              | `2`                                                           | 版面の段数                               |
| `--vs-page--mbox-top-left-content`          | `env(doc-title)`                                              | 柱に出すガイドライン名                   |
| `--vs-section--h2-marker-content`           | `counter(vs-counter-sec-h2) '.'`                              | 章番号の書式                             |
| `--vs-table--marker-content`         | `'表' counter(vs-counter-sec-h2) '-' counter(vs-counter-tbl)` | 表番号の書式 (`:root:lang(ja)` で上書き) |
| `--vs-figure--marker-content`         | `'図' counter(vs-counter-sec-h2) '-' counter(vs-counter-fig)` | 図番号の書式 (`:root:lang(ja)` で上書き) |
| `--vs-theme-split-body-recommendation-box--recommendation-marker-content` | `'推奨 ' counters(vs-counter-sections, '-')`                  | 推奨ボックスの番号の書式                 |
| `--vs-theme-split-body-recommendation-box--note-marker-content`           | `counter(vs-counter-note)`                                    | 注番号の書式                             |
| `--vs-theme-split-body-recommendation-box--note-call-content`             | `target-counter(…, vs-counter-note)`                          | 注の合印の書式                           |

章番号・ノンブルを途中から起こすには、原稿側 (example/example.css) で
`--vs-section--root-counter-sections` / `--vs-section--root-counter-sec-h2` と
`--vs-document-first-page-counter-reset` を指定する。
