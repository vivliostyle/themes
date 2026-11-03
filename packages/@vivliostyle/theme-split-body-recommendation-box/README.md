# @vivliostyle/theme-split-body-recommendation-box

横書き2段組のガイドライン本編向けテーマ。節ごとに改ページし、左段に本文と節末の注、右段に表と推奨ボックスを配置して、濃淡の階調で情報階層を表現する。

## 使い方

```css
@import '@vivliostyle/theme-split-body-recommendation-box';
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
