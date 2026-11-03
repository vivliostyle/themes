# @vivliostyle/theme-single-column-italic-running-head

英国ケンブリッジ式の博士論文向けテーマ。1段組・EB Garamond1書体で組み、イタリックの柱とヘアライン、下部中央のノンブル、版面下部に短い罫の注欄、線画挿図のキャプションを配する。

## 使い方

```css
@import '@vivliostyle/theme-single-column-italic-running-head';
```

原稿の書き方:

- 1 章 = 1 ファイル。章のファイルは frontmatter に `body: class: chapter` を書くと、章番号 (見出し・図表番号・参照) が base のドキュメントカウンタ `vs-counter-chapter` から振られる。本文の最初の章には `chapter bodymatter-start` を書くと、そこでノンブルが 1 に戻る。
- 前付 (Declaration / Abstract / Acknowledgements / Contents) は `body: class: frontmatter` を書くと小ローマ数字になる。番号を付けない見出しは `# 見出し #` と閉じ `#` を付ける。
- 章題は `# 章題 {#id}`、節は `## 節題 {#id}`。番号は原稿に書かない。
- 柱には `vivliostyle.config.js` の `title` (`env(pub-title)`) が入る。
- 図表は `<figure id="id">` に `<figcaption>説明</figcaption>` を入れる。`Figure 3.1` / `Table 4.1` の番号はカウンタが振る。
- 参照は `<a href="ファイル.html#id" data-ref="chapter|sec|fig|tbl"></a>` で、別ファイルへの参照も番号が解決される。VFM は空要素の直後の空白を落とすので、続けて語が来る場合は `&nbsp;` を書く。
- 注は `<span class="footnote">…</span>` (base の footnote)。呼び出したページの下部に番号付きで組まれる。
- 目次は `<nav id="toc" role="doc-toc">` の中に `.toc-front` / `.toc-body` / `.toc-back` の 3 つのリストを置く。番号もノンブルもリンク先から引く。
