# @vivliostyle/theme-reversed-header-ledger

単段の取引明細書テーマ。ベタ白抜きヘッダーの台帳をタブラー数字で桁を揃えて組み、細罫の柱と発行者ロゴタイプ、口座情報ボックスを添える。

## 使い方

```css
@import '@vivliostyle/theme-reversed-header-ledger';
```

台帳は Markdown の表で書く。1 列目を日付（幅 14%）、2 列目を摘要（38%）、3 列目以降を金額（各 16%）とみなして組版する（最終列は残高として強調される）。行数が版面を越えると表頭を繰り返して次ページへ継続する。

柱・ノンブルは原稿から導出する。

- 天の左…その md の frontmatter `title`（`env(doc-title)`）
- 天の右…そのページが始まる時点の `##` 見出し（`string(section-title, start)`）
- 地の左…`<p class="footer-note">…</p>` を原稿に置くと running element として全ページの地に出る
- 地の右…ノンブル

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                     | 既定値                    | 説明                                 |
| ---------------------------------------- | ------------------------- | ------------------------------------ |
| `--vs-theme-reversed-header-ledger--color-accent`               | `--vs-color-foreground-alt` と同じ | ヘッダー帯・柱罫・強調文字の基調色   |
| `--vs-theme-reversed-header-ledger--color-accent-deep`          | `--vs-color-foreground-alt` × `--vs-color-foreground` 20% | 発行者ロゴタイプの欧文部分の色       |
| `--vs-theme-reversed-header-ledger--color-foreground-secondary`              | `--vs-color-foreground` × `--vs-color-background` 15% | 日付列とノンブルの文字色             |
