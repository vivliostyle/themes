# @vivliostyle/theme-mincho-thick-underline

A4縦・明朝1段組の国内研究会配布資料向けテーマ。右寄せの柱と細下罫、太下罫付きの章見出し、上下太罫の学術表、巻末の注を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-mincho-thick-underline',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                        | 既定値                                 | 説明                           |
| ------------------------------------------- | -------------------------------------- | ------------------------------ |
| `--vs-font-family`                          | `'Noto Serif JP', ...`                 | 本文書体                       |
| `--vs-color-foreground`                           | `#1a1a1a` | 本文・罫の墨色                 |
| `--vs-color-background`                     | `#f7f5f0` | 地色                           |
| `--vs--h2-font-size`                        | `14pt`                                 | 章見出しの文字サイズ           |
| `--vs--p-text-indent`                       | `1em`                                  | 段落先頭の字下げ量             |
| `--vs-page--border-color-top`            | `var(--vs-color-foreground)`                 | 柱の下罫の色                   |
| `--vs-theme-mincho-thick-underline--running-rule-width`            | `0.4pt`                                | 柱の下罫の太さ                 |
| `--vs-theme-mincho-thick-underline--running-rule-margin-block-end` | `6.5mm`                                | 柱の下罫から版面までの空き     |
| `--vs-theme-mincho-thick-underline--steps-min-size-inline`         | `27mm`                                 | ブロック図の枠 1 個の最小幅    |
| `--vs-theme-mincho-thick-underline--equation-marker-content`       | `'(' counter(vs-counter-eq) ')'` | 数式の右端に出す式番号         |
| `--vs-theme-mincho-thick-underline--equation-call-content`         | `'式(' target-counter(…) ')'`          | 本文から式を参照したときの表示 |
| `--vs-theme-mincho-thick-underline--endnote-marker-content`        | `'*' counter(vs-counter-endnote) ' '`  | 巻末注の番号                   |

## 原稿の書きかた

- 章・節の番号は theme-base の `--vs-section--*` が付ける (h2 が「1.」、h3 が「2.1」)。Markdown の見出しには番号を書かない。番号を付けたくない見出し (謝辞・参考文献など) は `## 謝辞 ##` のように閉じ `#` を付けてセクション化を止める。
- 柱には原稿の `h1` (論題) が流れる (`string-set`)。
- 章・節の参照は `<a href="#sec-id" data-ref="sec"></a>章` のように、番号だけをリンクにして「章」「節」は本文側に書く。
- 図は `<figure class="fig" id="fig-id">` (Markdown 画像なら `![…](x.svg){#fig-id}`)、表は `<figure class="tbl" id="tbl-id">`。`<figcaption>` に番号は書かない。本文からは `data-ref="fig"` / `data-ref="tbl"` で参照する。
- ディスプレイ数式は `<div class="eq" id="eq-id">` で包む。式番号はカウンタが付け、本文からは `<a href="#eq-id" data-ref="eq"></a>` で参照する。
- 参考文献は `<ol class="cite-items">` + `<li id="ref-id">`、本文からは `<a href="#ref-id" data-ref="cite"></a>`。注は VFM の `[^1]` 記法で巻末注になる。
