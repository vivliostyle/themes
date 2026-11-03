# @vivliostyle/theme-dense-grid-table-two-column

2段組の高密度報告書テーマ。天の柱と下部中央のノンブル、段間の縦罫、全セル罫の表で公的書類らしい硬い体裁を組む。

## 使い方

```css
@import '@vivliostyle/theme-dense-grid-table-two-column';
```

## 原稿の書き方

- 見出しには「第2」(`#`)、「2」(`##`)、「(1)」(`###`)、「①」(`####`)、「(a)」(`#####`) が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける。
- 天の柱は各原稿の frontmatter の `title` を表示する (`env(doc-title)`)。
- 図表は `<figure>` で囲み `<figcaption>` を置くと「図1　」「表1　」が自動で付く。表は `<figure class="tbl">` を使う。
- 本文からの参照は `<a href="#tbl-cashflow" data-ref="tbl"></a>` / `data-ref="fig"` / `data-ref="sec"` と書く。番号・見出し名は参照先から生成されるので原稿には書かない。参照の直後に欧文が続く場合は `&nbsp;` を挟む (VFM が空要素直後の空白を落とすため)。
- (注) 書きは `<div class="note">` の中に番号なしの Markdown 番号リストを置く。「(注)」のラベルと「1.」「2.」の連番は CSS が付ける。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                                        | 既定値                                                | 説明                                 |
| ----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------ |
| `--vs-theme-dense-grid-table-two-column--table-label-size-inline` | `26%`                                                 | 表の 1 列目の幅 (表ごとに上書きする) |
| `--vs-theme-dense-grid-table-two-column--note-marker-size-inline` | `1.4em`                                               | (注) 書きの項番のぶら下げ幅          |
