# @vivliostyle/theme-single-column-double-spaced

北米APA論文様式 第7版に準拠した学位論文本文向けテーマ。Letter判1段組・ダブルスペース、番号付き見出し階層、水平罫3本のみのAPA式表、上付き脚注、全大文字のランニングヘッドを組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-single-column-double-spaced',
};
```

原稿の書き方:

- 章は `# 章題`、節は `## 節題`、小節は `### 小節題`。番号 (`1` / `1.2` / `2.1.1`) はカウンタが振るので原稿には書かない。番号を付けない見出し (Abstract / References など) は `# 見出し #` と閉じ `#` を付ける。
- ランニングヘッド (APA の短縮タイトル) は本文の先頭に `<p class="running-head">Auditory Texture and Recall</p>` と書く。紙面には出ず、柱で全大文字になる。
- 表は `<figure class="tbl" id="id">` に `<figcaption>タイトル</figcaption>` と表を入れる。`Table 1` の番号はカウンタが振り、太字で1行取りになる。
- 参照は `<a href="#id" data-ref="tbl"></a>` (Table 3)、`<a href="#id" data-ref="sec"></a>` (Section 5.4)、`<a href="#id" data-ref="chapter"></a>` (Chapter 4)。VFM は空要素の直後の空白を落とすので、続けて語が来る場合は `&nbsp;` を書く。
- 脚注は `<span class="footnote">…</span>` (base の footnote)。番号は自動で振られる。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                     | 既定値                             | 説明                              |
| ---------------------------------------- | ---------------------------------- | --------------------------------- |
| `--vs-color-foreground` | `#111111` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-font-family`                       | `'Tinos', ...`                     | 本文書体                          |
| `--vs-line-height`                       | `2`                                | 本文行送り (ダブルスペース)       |
| `--vs-page--mbox-top-left-content`       | `string(running-head)`             | ランニングヘッド (全大文字)       |
| `--vs-section--counter-style`            | `decimal`                          | 章・節番号の書式                  |
| `--vs-theme-single-column-double-spaced--chapter-call-content`       | `'Chapter ' target-counter(...)`   | `data-ref="chapter"` の参照文字列 |
| `--vs-table--marker-content`      | `'Table ' counter(vs-counter-tbl)` | 表番号                            |
| `--vs--table-border-color`               | `--vs-color-foreground` と同じ | APA式表の水平罫の色               |
| `--vs-footnote--font-size`               | `10pt`                             | 脚注の文字サイズ                  |
| `--vs-footnote--area-before-size-inline` | `50mm`                             | 脚注の区切り罫の長さ              |
