# @vivliostyle/theme-single-column-double-spaced

北米APA論文様式 第7版に準拠した学位論文本文向けテーマ。1段組・ダブルスペース、番号付き見出し階層、水平罫3本のみのAPA式表、上付き脚注、全大文字のランニングヘッドを組む。

## 使い方

```css
@import '@vivliostyle/theme-single-column-double-spaced';
```

原稿の書き方:

- 章は `# 章題`、節は `## 節題`、小節は `### 小節題`。番号 (`1` / `1.2` / `2.1.1`) はカウンタが振るので原稿には書かない。番号を付けない見出し (Abstract / References など) は `# 見出し #` と閉じ `#` を付ける。
- ランニングヘッド (APA の短縮タイトル) は本文の先頭に `<p class="running-head">Auditory Texture and Recall</p>` と書く。紙面には出ず、柱で全大文字になる。
- 表は `<figure class="tbl" id="id">` に `<figcaption>タイトル</figcaption>` と表を入れる。`Table 1` の番号はカウンタが振り、太字で1行取りになる。
- 参照は `<a href="#id" data-ref="tbl"></a>` (Table 3)、`<a href="#id" data-ref="sec"></a>` (Section 5.4)、`<a href="#id" data-ref="chapter"></a>` (Chapter 4)。VFM は空要素の直後の空白を落とすので、続けて語が来る場合は `&nbsp;` を書く。
- 脚注は `<span class="footnote">…</span>` (base の footnote)。番号は自動で振られる。
