# @vivliostyle/theme-dot-grid-checkbox

5mm ドット方眼を敷いたバレットジャーナル向けデイリーページテーマ。角チェックボックスのタスクリストと丸印のメモを、罫線を使わず短いアクセント罫だけで整列させる。

## 組み方

- 1 ファイル = 1 コレクション (キー・月間ログ・デイリーログ・リスト) として entry に並べる。内容が 1 ページに収まらなければ次ページへ流れる。
- ページ番号は小口下に自動で入る。インデックスは `<nav role="doc-toc">` に `<a href="…html#id">` を並べれば、点リーダとページ番号 (`target-counter`) が自動で付く。
- 日付は見出しの前に `<p class="meta"><time datetime="…">…</time></p>` を置く。マストヘッドの右肩に回り込む。
- スケッチのキャプションに `fig.` と書く必要はない。`figcaption` の頭に自動で付く。

## 使い方

```css
@import '@vivliostyle/theme-dot-grid-checkbox';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                | 既定値             | 説明                                          |
| ----------------------------------- | ------------------ | --------------------------------------------- |
| `--vs-theme-dot-grid-checkbox--color-accent`          | `--vs-color-foreground-alt` と同じ | 見出し・チェックボックス・罫のアクセント色    |
| `--vs-theme-dot-grid-checkbox--color-foreground-secondary`           | `--vs-color-foreground-alt` × `--vs-color-background` 45% | 完了タスク・図キャプション・ノンブルの色      |
