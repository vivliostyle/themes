# @vivliostyle/theme-fine-rule-marginalia

横組1段のエッセイ向けテーマ。Shippori Mincho の随筆本文に細罫・小口の傍注・線描挿画・版面下部の脚注を重ねる。

## 使い方

```css
@import '@vivliostyle/theme-fine-rule-marginalia';
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

他章への参照は<a href="chap-04.html#chap-id" data-ref="chap"></a>のように書く。
```

- 章番号は原稿に書かない。番号を付けない章 (あとがき等) は frontmatter の `class` から `chapter` を外し、見出しを `# あとがき #` と閉じ `#` 付きで書く。
- 柱には `#` の章題がそのまま流れる。
- `data-ref="chap"` の参照は「→第N章」に展開される。参照の直後に語が続くときは、VFM が空インライン要素直後の空白を落とすので `&nbsp;` を置く (句読点が続くときは不要)。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                               | 既定値                                                   | 説明                         |
| ---------------------------------- | -------------------------------------------------------- | ---------------------------- |
| `--vs-theme-fine-rule-marginalia--color-accent`         | `--vs-color-foreground-alt` と同じ | 罫・注記号・相互参照の濃紫   |
