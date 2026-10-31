# @vivliostyle/theme-single-column-mono-chapter

英国ケンブリッジ式の博士論文向けテーマ。A4縦1段組・EB Garamond1書体・墨1色で組み、イタリックの柱とヘアライン、下部中央のノンブル、版面下部に短い罫の注欄、線画挿図のキャプションを配する。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-single-column-mono-chapter',
};
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

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                         | 既定値                           | 説明                              |
| -------------------------------------------- | -------------------------------- | --------------------------------- |
| `--vs-color-foreground` | `#1a1a1a` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-font-family`                           | `'EB Garamond', ...`             | 本文・見出し共通の書体            |
| `--vs-page--margin-left` / `-right`          | `30mm` / `20mm`                  | ノド・小口の余白 (片面印刷前提)   |
| `--vs-page--mbox-top-left-content`           | `env(pub-title)`                 | 柱 (イタリック) の内容            |
| `--vs-page--border-width-top`                | `0.5pt`                          | 柱の下のヘアライン (版面の上罫)   |
| `--vs-theme-single-column-mono-chapter--chapter-call-content`           | `'Chapter ' target-counter(...)` | `data-ref="chapter"` の参照文字列 |
| `--vs-footnote--area-before-size-inline`     | `62%`                            | 注欄の区切り罫の長さ              |
| `--vs-toc--ol-indent-size`                   | `9mm`                            | 目次の番号欄・字下げ幅            |
