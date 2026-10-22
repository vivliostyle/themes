# @vivliostyle/theme-green-circled-number-two-column

A5縦・2段組のコンパクトなお弁当レシピ本向けテーマ。左右の段に弁当おかず1品ずつを完結配置し、フレッシュグリーンを丸数字見出し・データバー・表罫に反復する実用的なレシピ紙面を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-green-circled-number-two-column',
};
```

## 原稿の書き方

- `## 品名` が 1 品で、段の頭から始まる。品番は見出しの順序から自動で振られるので、見出しに番号を書かない。品数のぶんだけ段が増え、段が尽きればページが増える。
- 詰め方のコツなどレシピ以外の読み物は閉じ `#` を付けて `## 見出し ##` と書く。VFM がセクションに包まないので、番号バッジが付かず、段をまたいで流れる。
- 調理時間・分量・保存期間のデータバーは `<div class="stat-block">` に 4 項目のリストを書く。
- 手順の番号 (`ol`) はカウンタが振る。項目のあいだに空行を入れない (空行を入れると各項目が段落になり、番号が本文と別行に落ちる)。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                | 既定値                                             | 説明                                         |
| ----------------------------------- | -------------------------------------------------- | -------------------------------------------- |
| `--vs-font-family`                  | `'Noto Sans JP', ...`                              | 本文書体                                     |
| `--vs-columns`                      | `2`                                                | 段数                                         |
| `--vs-theme-green-circled-number-two-column--recipe-marker-content` | `counter(vs-counter-sec-h2, decimal-leading-zero)` | 品番の体裁                                   |
| `--vs-theme-green-circled-number-two-column--step-marker-content`   | `counter(vs-counter-step)`                         | 手順番号の体裁                               |
| `--vs-theme-green-circled-number-two-column--color-accent`          | `#66cc00`                                          | 丸数字見出し・データバー・表罫のアクセント色 |
| `--vs-theme-green-circled-number-two-column--color-rule`            | `#b8e386`                                          | 段境・行罫の淡いグリーン                     |
| `--vs-theme-green-circled-number-two-column--color-tint`            | `#eef8e0`                                          | 材料表ヘッダーの地色                         |
| `--vs-theme-green-circled-number-two-column--color-heading`         | `#1a1a1a`                                          | レシピ見出しの文字色                         |
