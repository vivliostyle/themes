# @vivliostyle/theme-small-caps-dot-leader

1段組のメニュー向けテーマ。細罫と欧文スモールキャップ、点線リーダーの品目表、プルクオート、二重枠のおすすめボックスで華やかな紙面を組む。

## 使い方

```css
@import '@vivliostyle/theme-small-caps-dot-leader';
```

## 原稿の書き方

- `## 分類名 <span class="subhead">― 和名</span>` が品目分類の単位。分類はページをまたいで割られず、入る分だけ順にページへ流れる。
- 品目表は GFM の 2 列表を「品名行 / 説明行」の交互で書く (品名行は `_品名_` と価格、説明行は説明だけ)。見出し行は紙面に出ない。
- 図版は役割クラスで幅が決まる。`{.mark}` = 店章、`{.flourish}` = 飾り罫、`{.dish}` = 品目の図版。高さは画像の実寸比から決まるので、SVG には `width`/`height` 属性を持たせておく。
- 品目表の脇に図版を添えるときだけ `<div class="grid">` で表と図版を囲む。図版がなければラッパは不要。
- 引用は `<blockquote class="pull-quote">`、囲みのおすすめは `<div class="note">` に書く。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                                                 | 既定値                                                    | 説明                             |
| -------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------- |
| `--vs-theme-small-caps-dot-leader--color-accent`               | `--vs-color-foreground-alt` と同じ                        | 見出し枠・引用符のアクセント色   |
| `--vs-theme-small-caps-dot-leader--color-accent-strong`        | `--vs-color-foreground-alt` × `--vs-color-foreground` 20% | 見出し枠の主線・点線リーダーの色 |
| `--vs-theme-small-caps-dot-leader--color-foreground-secondary` | `--vs-color-foreground` × `--vs-color-background` 20%     | 説明文・キャプションの文字色     |
