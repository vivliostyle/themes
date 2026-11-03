# @vivliostyle/theme-landscape-ruled-ledger

横書きの帳簿テーマ。日付(月/日)・摘要・金額欄の全幅罫組み表を、外枠・列罫・記入行罫の3階調で組む実務帳簿。

## 使い方

```css
@import '@vivliostyle/theme-landscape-ruled-ledger';
```

帳票名は `#` 見出しで書く。番号は base の `vs-counter-sec-h1` が振るので原稿には書かない。記入枠を帳票名の右に並べるには、見出しの中に `<span class="field"><label>年<span class="answer-space"></span></label></span>` のようにインライン HTML を書く。

記入行は Markdown の表で書く。1・2 列目を月・日、3 列目を摘要、4 列目以降を金額として組む。行数に関わらず表頭を繰り返して次ページへ続く。

- **月頭の繰越行**…月欄に月を書いた行（`| 4 | 1 | 前月繰越 | … |`）。摘要がやや太くなる。
- **月計行**…摘要を太字で書いた行（`| | | **4月 計** | … |`）。淡い地・太字・上下の罫で締められる。
