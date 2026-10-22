# @vivliostyle/theme-dense-mono-two-column

EDINET提出書類の本文ページを模した、A4縦・2段組の高密度モノクロ有価証券報告書テーマ。天の柱と下部中央のノンブル、段間の縦罫、全セル罫の経営指標表で法定開示らしい硬い体裁を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-dense-mono-two-column',
};
```

## 原稿の書き方

- 見出しには「第2」(`#`)、「2」(`##`)、「(1)」(`###`)、「①」(`####`)、「(a)」(`#####`) が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける。
- 天の柱は各原稿の frontmatter の `title` を表示する (`env(doc-title)`)。
- 図表は `<figure>` で囲み `<figcaption>` を置くと「図1　」「表1　」が自動で付く。表は `<figure class="tbl">` を使う。
- 本文からの参照は `<a href="#tbl-cashflow" data-ref="tbl"></a>` / `data-ref="fig"` / `data-ref="sec"` と書く。番号・見出し名は参照先から生成されるので原稿には書かない。参照の直後に欧文が続く場合は `&nbsp;` を挟む (VFM が空要素直後の空白を落とすため)。
- (注) 書きは `<div class="note">` の中に番号なしの Markdown 番号リストを置く。「(注)」のラベルと「1.」「2.」の連番は CSS が付ける。
- 抜粋を組む場合など、部番号を途中から始めるには原稿側の CSS で `--vs-section--root-counter-sec-h1: <開始値 - 1>` を指定する。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                  | 既定値                         | 説明                                      |
| ------------------------------------- | ------------------------------ | ----------------------------------------- |
| `--vs-font-family`                    | `'Noto Serif JP', ...`         | 本文・見出し共通の明朝書体                |
| `--vs-color-foreground`                     | `#1a1a1a`                      | 本文・柱・罫の墨色                        |
| `--vs-color-background`               | `#f7f6f2`                      | 用紙の地色                                |
| `--vs-theme-dense-mono-two-column--color-rule`              | `#333333`                      | 段間罫の色                                |
| `--vs-theme-dense-mono-two-column--table-label-size-inline` | `26%`                          | 指標表の科目名列の幅 (表ごとに上書きする) |
| `--vs-theme-dense-mono-two-column--note-label-content`      | `'(注)'`                       | (注) 書きの肩のラベル                     |
| `--vs-theme-dense-mono-two-column--note-label-size-inline`  | `2.4em`                        | (注) ラベルの占める幅                     |
| `--vs-theme-dense-mono-two-column--note-marker-content`     | `counter(vs-counter-note) '.'` | (注) 書きの項番                           |
| `--vs-theme-dense-mono-two-column--note-marker-size-inline` | `1.4em`                        | (注) 書きの項番のぶら下げ幅               |
| `--vs--table-border-color`            | `#333333`                      | 経営指標表の罫色                          |
| `--vs--table-border-width-outer`      | `0.7pt`                        | 経営指標表の外枠の太さ                    |
| `--vs--table-border-width-cell`       | `0.4pt`                        | 経営指標表のセル内罫の太さ                |
