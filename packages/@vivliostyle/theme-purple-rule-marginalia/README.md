# @vivliostyle/theme-purple-rule-marginalia

新書判 (105×173mm) 横組1段の紀行エッセイ向けテーマ。Shippori Mincho の随筆本文に濃紫の細罫・小口の傍注・線描挿画・版面下部の脚注を重ねる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-purple-rule-marginalia',
};
```

## 原稿の書き方

1 章 = 1 ファイル。frontmatter に `class: chapter` を書くと、その章に「第一章」「第二章」…が自動で付く。

```md
---
title: '書名 — 章題'
lang: ja
class: chapter
---

# 章題 {#chap-id}

<aside class="sidebar">

小口に流れる傍注。

</aside>

本文<span class="footnote">版面下部に送られる脚注。</span>。

他章への参照は<a href="chap-04.html#yuya" data-ref="chap"></a>のように書く。
```

- 章番号は原稿に書かない。番号を付けない章 (あとがき等) は frontmatter の `class` から `chapter` を外し、見出しを `# あとがき #` と閉じ `#` 付きで書く。
- 柱には `#` の章題がそのまま流れる。
- `data-ref="chap"` の参照は「→第N章」に展開される。参照の直後に語が続くときは、VFM が空インライン要素直後の空白を落とすので `&nbsp;` を置く (句読点が続くときは不要)。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                               | 既定値                                                   | 説明                         |
| ---------------------------------- | -------------------------------------------------------- | ---------------------------- |
| `--vs-theme-purple-rule-marginalia--color-accent`         | `#330066`                                                | 罫・注記号・相互参照の濃紫   |
| `--vs-theme-purple-rule-marginalia--color-rule`           | `#b9aecb`                                                | 挿画の枠の薄紫               |
| `--vs-theme-purple-rule-marginalia--font-display`         | `'Zen Old Mincho', ...`                                  | 章題・章番号の書体           |
| `--vs-theme-purple-rule-marginalia--font-gothic`          | `'Zen Kaku Gothic New', ...`                             | 柱・傍注・脚注のゴシック書体 |
| `--vs-theme-purple-rule-marginalia--chapref-call-content` | `'→第' target-counter(...) '章'`                         | `data-ref="chap"` の参照文字 |
| `--vs-font-family`                 | `'Shippori Mincho', ...`                                 | 本文書体                     |
| `--vs-section--h1-marker-content`  | `'第' counter(vs-counter-chapter, cjk-ideographic) '章'` | 章番号の表記                 |
