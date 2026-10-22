# @vivliostyle/theme-centered-heading-bracket-subhead

B5判・単段の民事判例解説テーマ。中央寄せの事件名見出しと裁判所名・事件番号の階層表示、【事実の概要】【判旨】の隅付き小見出し、争点整理の罫線表、末尾の「注」ブロックで組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-centered-heading-bracket-subhead',
};
```

## 原稿の書き方

事件番号 (h1)・解説の項番号 (h3の「一・二・三」)・注番号はすべてカウンタで生成する。原稿の見出しには番号を書かない。h1 は事件ごとに改ページする。

```md
---
title: 契約の成立と意思表示 # 柱に出る章題
class: chapter # base の章カウンタを増やす (柱の「第N章」)
---

# 売買契約における錯誤と動機の表示  <!-- → 12  売買契約における… -->

<p class="subhead">甲山地方裁判所　令和6年3月19日判決</p>

<p class="meta">令和5年(ワ)第1234号　売買代金返還請求事件</p>

## 【事実の概要】 <!-- 隅付き見出しには番号を付けない -->

本文…[^1] <!-- 注は VFM の脚注記法。巻末に (1)(2)… で組まれる -->

## 【解説】

### 本判決の意義 <!-- → 一　本判決の意義 -->
```

注どうしの参照は空のアンカーで書く。`<a href="#fn12" data-ref="note"></a>` が「注(12)」になる (VFM は `[^12]` の定義に `id="fn12"` を振る)。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                 | 既定値                                                   | 説明                       |
| ------------------------------------ | -------------------------------------------------------- | -------------------------- |
| `--vs-theme-centered-heading-bracket-subhead--font-display`           | `'Shippori Mincho B1', ...`                              | 事件名見出し(h1)の表示書体 |
| `--vs-color-background`              | `#fdfcf8`                                                | 地色(生成り)               |
| `--vs-theme-centered-heading-bracket-subhead--color-thead-bg`         | `#ececea`                                                | 争点整理表ヘッダー行の地色 |
| `--vs-theme-centered-heading-bracket-subhead--color-rule`             | `#555555`                                                | 罫線色(柱・表・注の区切り) |
| `--vs-page--mbox-top-center-content` | `'第' counter(vs-counter-chapter) '章　' env(doc-title)` | 柱の内容                   |
| `--vs-section--h1-marker-content`    | `counter(vs-counter-sec-h1)`                             | 事件番号の書式             |
| `--vs-section--h3-marker-content`    | `counter(vs-counter-sec-h3, cjk-ideographic)`            | 解説の項番号の書式         |
| `--vs-theme-centered-heading-bracket-subhead--note-marker-content`    | `'(' counter(vs-counter-endnote) ')'`                    | 注番号の書式               |
| `--vs-theme-centered-heading-bracket-subhead--note-call-content`      | `'注(' target-counter(…, vs-counter-endnote) ')'`        | 注参照の書式               |

章番号・事件番号・ノンブルを途中から起こすには、原稿側 (example/example.css) で
`--vs-section--root-counter-sec-h1` と `--vs-document-first-page-counter-reset` を指定する。
