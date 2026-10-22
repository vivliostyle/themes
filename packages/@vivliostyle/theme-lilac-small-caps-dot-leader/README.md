# @vivliostyle/theme-lilac-small-caps-dot-leader

A5判・1段組のパティスリーメニュー向けテーマ。ライラックの細罫と欧文スモールキャップ、点線リーダーの品目表、プルクオート、二重枠のおすすめボックスで華やかな菓子店の世界観を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-lilac-small-caps-dot-leader',
};
```

## 原稿の書き方

- `## 分類名 <span class="subhead">― 和名</span>` が品目分類の単位。分類はページをまたいで割られず、入る分だけ順にページへ流れる。
- 品目表は GFM の 2 列表を「品名行 / 説明行」の交互で書く (品名行は `_品名_` と価格、説明行は説明だけ)。見出し行は紙面に出ない。
- 図版は役割クラスで幅が決まる。`{.mark}` = 店章、`{.flourish}` = 飾り罫、`{.dish}` = 品目の図版。高さは画像の実寸比から決まるので、SVG には `width`/`height` 属性を持たせておく。
- 品目表の脇に図版を添えるときだけ `<div class="grid">` で表と図版を囲む。図版がなければラッパは不要。
- 引用は `<blockquote class="pull-quote">`、囲みのおすすめは `<div class="note">` に書く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                              | 既定値                      | 説明                             |
| --------------------------------- | --------------------------- | -------------------------------- |
| `--vs--h1-font-family`            | `'Cormorant Garamond', ...` | タイトルの表示書体               |
| `--vs-font-family`                | `'Noto Serif JP', serif`    | 本文書体                         |
| `--vs-theme-lilac-small-caps-dot-leader--font-display`        | `'Cormorant Garamond', ...` | 見出し・引用符・ノンブルの書体   |
| `--vs-theme-lilac-small-caps-dot-leader--color-accent`        | `#d4a8d8`                   | 見出し枠・引用符のアクセント色   |
| `--vs-theme-lilac-small-caps-dot-leader--color-accent-strong` | `#b98cc0`                   | 見出し枠の主線・点線リーダーの色 |
| `--vs-theme-lilac-small-caps-dot-leader--color-accent-tint`   | `#faf5fb`                   | 季節のおすすめボックスの地色     |
| `--vs-theme-lilac-small-caps-dot-leader--color-muted`         | `#5f5459`                   | 説明文・キャプションの文字色     |
| `--vs-theme-lilac-small-caps-dot-leader--color-folio`         | `#8d7f90`                   | ノンブルの文字色                 |
