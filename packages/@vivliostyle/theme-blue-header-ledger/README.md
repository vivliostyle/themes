# @vivliostyle/theme-blue-header-ledger

A5判・単段の個人向け銀行口座取引明細書テーマ。青ベタ白抜きヘッダーの台帳をタブラー数字で桁を揃えて組み、細い青罫の柱と発行者ロゴタイプの口座情報ボックスを添える。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-blue-header-ledger',
};
```

台帳は Markdown の表で書く。1 列目を日付、2 列目を摘要、3 列目以降を金額とみなして組版する（最終列は残高として強調される）。行数が版面を越えると表頭を繰り返して次ページへ継続する。

柱・ノンブルは原稿から導出する。

- 天の左…その md の frontmatter `title`（`env(doc-title)`）
- 天の右…そのページが始まる時点の `##` 見出し（`string(section-title, start)`）
- 地の左…`<p class="footer-note">…</p>` を原稿に置くと running element として全ページの地に出る
- 地の右…ノンブル

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                     | 既定値                    | 説明                                 |
| ---------------------------------------- | ------------------------- | ------------------------------------ |
| `--vs-color-foreground` | `#1a1a1a` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#0066cc` | アクセント色 |
| `--vs-theme-blue-header-ledger--color-accent`               | `--vs-color-foreground-alt` と同じ | ヘッダー帯・柱罫・強調文字の基調色   |
| `--vs-theme-blue-header-ledger--color-accent-deep`          | `--vs-color-foreground-alt` × `--vs-color-foreground` 20% | 発行者ロゴタイプの欧文部分の色       |
| `--vs-color-background-alt`                 | `--vs-color-foreground-alt` × `--vs-color-background` 90% | 口座情報ボックス・偶数行の淡色地     |
| `--vs-color-border-alt`          | `--vs-color-foreground-alt` × `--vs-color-background` 65% | 口座情報ボックスの枠線色             |
| `--vs-theme-blue-header-ledger--color-foreground-secondary`              | `--vs-color-foreground` × `--vs-color-background` 15% | 日付列とノンブルの文字色             |
| `--vs-font-family-alt`               | `'IBM Plex Sans JP', ...` | 日付・金額列のタブラー数字書体       |
| `--vs-theme-blue-header-ledger--ledger-date-width`          | `14%`                     | 台帳 1 列目（日付）の幅              |
| `--vs-theme-blue-header-ledger--ledger-description-width`   | `38%`                     | 台帳 2 列目（摘要）の幅              |
| `--vs-theme-blue-header-ledger--ledger-amount-width`        | `16%`                     | 台帳 3 列目以降（金額）の幅          |
| `--vs-theme-blue-header-ledger--section-margin-block-start` | `5mm`                     | 節が続くときに見出しの前に入れる余白 |
| `--vs--table-border-color`               | `--vs-color-foreground-alt` × `--vs-color-background` 85% | 台帳の行罫の色                       |
