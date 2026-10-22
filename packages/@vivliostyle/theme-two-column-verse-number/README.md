# @vivliostyle/theme-two-column-verse-number

A4判・2段組で章節番号を左段冒頭に配置する聖典本文向けテーマ。柱(奇数ページ右)と脚注により注釈を層状に組み、静けさを保った組版にする。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-two-column-verse-number',
};
```

## 原稿の書き方

1 章 = 1 ファイル。frontmatter の `title` に書名を書き、章題を `##` で立てる。章番号 (第N章) と節番号はカウンタで生成されるので、原稿には書かない。節は段落 1 つが 1 節にあたる。

```md
---
title: 静謐の書
---

## 初めの灯

夜は古く、灯はそれより若し。…

一つの焔、丘の背に起これり。…
```

- 柱には「書名　章番号」が出る。書名は `env(doc-title)`、章番号は `vs-counter-sec-h2` から取る。
- 抜粋を組むときは、章番号の起点を `--vs-section--root-counter-sec-h2` (第7章から始めるなら `6`)、ノンブルの起点を `--vs-document-first-page-counter-reset: page N` で与える。
- 節番号を付けない段落 (前書き・結びなど) は `{.unnumbered}` を付けた段落にする。
- 脚注は `<span class="footnote">…</span>`、その中の出典は `<span class="meta">…</span>` で囲む。

### 節への参照

同じ巻に収めた節を指すときは、参照先の節の頭に空のアンカーを置き、参照側を `data-ref="verse"` の空リンクで書く。「章:節」は参照先のカウンタから解決される (書名は巻をまたぐため原稿に書く)。

```md
<!-- 参照先 (bible-02.md) の第9節 -->

<a id="s07-9"></a>割れたる器を捨つるなかれ。…

<!-- 参照元 -->

…とみなす。<span class="meta">cf. 静謐の書 <a href="bible-02.html#s07-9" data-ref="verse"></a></span>
```

別ファイルを指すときは、ビルド後の HTML 名 (`<md のファイル名>.html`) を href に書く。この巻に収めていない典籍への参照は、これまで通り本文にそのまま書く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                         | 既定値                                                                         | 説明                        |
| -------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------- |
| `--vs-font-family`                           | `'Shippori Mincho', ...`                                                       | 本文書体                    |
| `--vs--heading-font-family`                  | `'Noto Serif JP', ...`                                                         | 章題の書体                  |
| `--vs-theme-two-column-verse-number--font-sans`                      | `'Noto Sans JP', ...`                                                          | 柱・脚注参照の書体          |
| `--vs-color-foreground`                            | `#171613`                                                                      | 本文の文字色                |
| `--vs-color-background`                      | `#f7f4ec`                                                                      | 地色                        |
| `--vs-color-foreground-alt`                      | `#4e4b45`                                                                      | 柱・脚注の淡色              |
| `--vs-theme-two-column-verse-number--color-rule`                     | `#a7a198`                                                                      | 段間罫・ヘッダー罫の色      |
| `--vs-section--h2-marker-content`            | `'第' counter(vs-counter-sec-h2, cjk-ideographic) '章'`                        | 章番号の書式                |
| `--vs-theme-two-column-verse-number--chapter-counter-style`          | `cjk-ideographic`                                                              | 章題見出しの章番号の数字    |
| `--vs-theme-two-column-verse-number--pillar-content`                 | `env(doc-title) counter(vs-counter-sec-h2)`                                    | 柱の内容                    |
| `--vs-theme-two-column-verse-number--verse-marker-content`           | `counter(vs-counter-verse)`                                                    | 節番号の書式                |
| `--vs-theme-two-column-verse-number--verse-counter-style`            | `decimal`                                                                      | 節番号の数字                |
| `--vs-theme-two-column-verse-number--verse-marker-font-size`         | `1.06em`                                                                       | 節番号の大きさ              |
| `--vs-theme-two-column-verse-number--verse-opening-marker-font-size` | `1.72em`                                                                       | 章頭の第1節の節番号の大きさ |
| `--vs-theme-two-column-verse-number--verse-call-content`             | `target-counter(…, vs-counter-sec-h2) ':' target-counter(…, vs-counter-verse)` | 節参照の書式                |

柱とノンブルは小口側の `--vs-page--mbox-top-outside-content` / `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右、左ページでは左に置かれる。片面で右に固定したい場合は `--vs-page--mbox-top-right-content` / `--vs-page--mbox-bottom-right-content` で上書きする。
