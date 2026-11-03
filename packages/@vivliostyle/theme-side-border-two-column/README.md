# @vivliostyle/theme-side-border-two-column

2段組の一覧表テーマ。コード・名称・説明の3列罫線表を、side-border 見出しの部ごとにブロック化する参照ページ向け。

## 使い方

```css
@import '@vivliostyle/theme-side-border-two-column';
```

節は `#` 見出し、部は `##` 見出しで書く。番号は base の `vs-counter-sec-h1` / `vs-counter-sec-h2` が振るので原稿には書かない。節はページを起こし、見出しと導入文が両段抜きになる。

柱には「第N章　章題」が出る。章番号は base のドキュメントカウンタ `vs-counter-chapter`（frontmatter に `class: chapter` を書くと章ごとに増える）、章題は frontmatter の `title`（`env(doc-title)`）から取る。

部の表は段に収まらなくなると表頭を繰り返して次の段・次ページへ続く。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                                                 | 既定値                                                    | 説明                                     |
| -------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------- |
| `--vs-theme-side-border-two-column--color-accent`               | `--vs-color-foreground-alt` と同じ                        | 見出し左罫・表頭下罫・ヘッダールールの青 |
| `--vs-theme-side-border-two-column--color-foreground-secondary` | `--vs-color-foreground` × `--vs-color-background` 30%     | 導入文・説明欄の文字色                   |
