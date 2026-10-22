# @vivliostyle/theme-vertical-line-drawing-spec-table

新書判 (105×173mm)・墨一色のポケット野鳥図鑑テーマ。1種 = `#` 見出し1つを1ページに起こし、線画に識別スペック表を回り込ませ、その下に観察メモの傍注と丸数字の節を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-vertical-line-drawing-spec-table',
};
```

## 原稿の書き方

- `# 種名<span class="latin">学名</span>` — 種の通し番号は `vs-counter-sec-h1` が自動で振る。原稿に番号は書かない。
- `## 節見出し` — 丸数字 (①②③…) が自動で付く。番号を振りたくない見出しは閉じ `#` を付けて `## 見出し ##` と書く (VFM がセクションに包まないので番号が付かない)。
- 識別スペック表は通常の Markdown 表。見出し行は紙面に出さず、1列目が項目名 (全角コロン付き) になる。
- 観察メモは `<aside class="note">` で書く。傍注として左に置かれ、本文が回り込む。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                  | 既定値                       | 説明                       |
| ------------------------------------- | ---------------------------- | -------------------------- |
| `--vs-font-family`                    | `'Noto Sans JP', sans-serif` | 本文・見出し書体           |
| `--vs-theme-vertical-line-drawing-spec-table--font-sub`                | `'BIZ UDPGothic', ...`       | 観察メモ傍注の書体         |
| `--vs-theme-vertical-line-drawing-spec-table--font-latin`              | `'Noto Sans', ...`           | 学名 (欧文斜体) の書体     |
| `--vs-theme-vertical-line-drawing-spec-table--plate-size-inline`       | `37mm`                       | 線画の幅                   |
| `--vs-theme-vertical-line-drawing-spec-table--plate-margin-inline-end` | `3.5mm`                      | 線画と識別スペック表の間隔 |
| `--vs-theme-vertical-line-drawing-spec-table--note-size-inline`        | `20mm`                       | 観察メモ傍注の幅           |
| `--vs-theme-vertical-line-drawing-spec-table--note-margin-inline-end`  | `4mm`                        | 傍注と本文の間隔           |
| `--vs-color-foreground`                     | `#1c1c1c`                    | 本文・罫の墨色             |
| `--vs-color-background`               | `#f6f4ee`                    | 地色                       |

柱は各原稿の frontmatter `title`、ノンブルは `counter(page)` から生成する。
