# @vivliostyle/theme-landscape-ruled-ledger

B5判横書きの現金出納帳テーマ。日付(月/日)・摘要・収入・支出・残高の全幅罫組み表を、外枠・列罫・記入行罫の3階調で組む実務帳簿。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-landscape-ruled-ledger',
};
```

帳票名は `#` 見出しで書く。番号は base の `vs-counter-sec-h1` が振るので原稿には書かない。記入枠を帳票名の右に並べるには、見出しの中に `<span class="field"><label>年<span class="answer-space"></span></label></span>` のようにインライン HTML を書く。

記入行は Markdown の表で書く。1・2 列目を月・日、3 列目を摘要、4 列目以降を金額として組む。行数に関わらず表頭を繰り返して次ページへ続く。

- **月頭の繰越行**…月欄に月を書いた行（`| 4 | 1 | 前月繰越 | … |`）。摘要がやや太くなる。
- **月計行**…摘要を太字で書いた行（`| | | **4月 計** | … |`）。淡い地・太字・上下の罫で締められる。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                   | 既定値                 | 説明                         |
| -------------------------------------- | ---------------------- | ---------------------------- |
| `--vs-font-family`                     | `'Noto Sans JP', ...`  | 本文・帳票名の書体           |
| `--vs-color-background`                | `#faf9f5`              | 帳簿用紙の地色               |
| `--vs-theme-landscape-ruled-ledger--font-mono`                | `'IBM Plex Mono', ...` | 日付・金額欄の等幅数字書体   |
| `--vs-theme-landscape-ruled-ledger--color-rule-strong`        | `#242424`              | 外枠・表頭罫の濃色           |
| `--vs-theme-landscape-ruled-ledger--color-rule`               | `#777777`              | 列罫・月計行罫の中間色       |
| `--vs-theme-landscape-ruled-ledger--color-rule-soft`          | `#b8b8b8`              | 記入行罫の淡色               |
| `--vs-theme-landscape-ruled-ledger--color-muted`              | `#666666`              | 補助文字・ノンブルの色       |
| `--vs-theme-landscape-ruled-ledger--color-tint`               | `#f0efe9`              | 月計行の地色                 |
| `--vs-theme-landscape-ruled-ledger--ledger-date-width`        | `7%`                   | 月欄・日欄の幅               |
| `--vs-theme-landscape-ruled-ledger--ledger-description-width` | `39%`                  | 摘要欄の幅                   |
| `--vs-theme-landscape-ruled-ledger--ledger-amount-width`      | `18%`                  | 金額欄の幅                   |
| `--vs-theme-landscape-ruled-ledger--date-group-label`         | `'日付'`               | 月/日 にまたがる表頭の見出し |
| `--vs-theme-landscape-ruled-ledger--date-group-block-size`    | `4.6mm`                | その表頭帯の高さ             |

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page, decimal-leading-zero)` のように物理位置の変数で上書きする。
