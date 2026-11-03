# @vivliostyle/theme-two-column-verse-number

2段組で章節番号を左段冒頭に配置する、節番号付き本文向けテーマ。柱(奇数ページ右)と脚注により注釈を層状に組み、静けさを保った組版にする。

## 使い方

```css
@import '@vivliostyle/theme-two-column-verse-number';
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
- 節番号を付けない段落 (前書き・結びなど) は `{.unnumbered}` を付けた段落にする。
- 脚注は `<span class="footnote">…</span>`、その中の出典は `<span class="meta">…</span>` で囲む。

### 節への参照

同じ巻に収めた節を指すときは、参照先の節の頭に空のアンカーを置き、参照側を `data-ref="verse"` の空リンクで書く。「章:節」は参照先のカウンタから解決される (書名は巻をまたぐため原稿に書く)。

```md
<!-- 参照先 (chapter-02.md) の第9節 -->

<a id="s07-9"></a>割れたる器を捨つるなかれ。…

<!-- 参照元 -->

…とみなす。<span class="meta">cf. 静謐の書 <a href="chapter-02.html#s07-9" data-ref="verse"></a></span>
```

別ファイルを指すときは、ビルド後の HTML 名 (`<md のファイル名>.html`) を href に書く。この巻に収めていない典籍への参照は、これまで通り本文にそのまま書く。
