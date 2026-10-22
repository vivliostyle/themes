# @vivliostyle/theme-dot-grid-checkbox

5mm ドット方眼を敷いた A5 のバレットジャーナル向けデイリーページテーマ。角チェックボックスのタスクリストと丸印のメモを、罫線を使わず短いアクセント罫だけで整列させる。

## 組み方

- 1 ファイル = 1 コレクション (キー・月間ログ・デイリーログ・リスト) として entry に並べる。内容が 1 ページに収まらなければ次ページへ流れる。
- ページ番号は小口下に自動で入る。インデックスは `<nav role="doc-toc">` に `<a href="…html#id">` を並べれば、点リーダとページ番号 (`target-counter`) が自動で付く。
- 日付は見出しの前に `<p class="meta"><time datetime="…">…</time></p>` を置く。マストヘッドの右肩に回り込む。
- スケッチのキャプションに `fig.` と書く必要はない。`figcaption` の頭に自動で付く。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-dot-grid-checkbox',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                | 既定値             | 説明                                          |
| ----------------------------------- | ------------------ | --------------------------------------------- |
| `--vs-font-family`                  | `'Noto Sans', ...` | 本文書体                                      |
| `--vs--heading-font-family`         | `'Inter', ...`     | 見出し・ラベルの表示書体                      |
| `--vs-color-foreground`                   | `#27313a`          | 本文の文字色                                  |
| `--vs-color-background`             | `#fcfbf7`          | 地色 (ドット方眼の紙色)                       |
| `--vs-theme-dot-grid-checkbox--font-display`          | `'Inter', ...`     | 日付・図キャプションの表示書体                |
| `--vs-theme-dot-grid-checkbox--color-accent`          | `#34495e`          | 見出し・チェックボックス・罫のアクセント色    |
| `--vs-theme-dot-grid-checkbox--color-muted`           | `#87929a`          | 完了タスク・図キャプション・ノンブルの色      |
| `--vs-theme-dot-grid-checkbox--sketch-size-inline`    | `70mm`             | スケッチ図版の幅 (これより狭い図は拡大しない) |
| `--vs-theme-dot-grid-checkbox--sketch-marker-content` | `'fig. — '`        | `figcaption` の頭に付く標識                   |

## 見開きで組む

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
