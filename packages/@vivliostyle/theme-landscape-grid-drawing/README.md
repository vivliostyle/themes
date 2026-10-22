# @vivliostyle/theme-landscape-grid-drawing

B4横判の建築展図録テーマ。上半分は5mm方眼の上に平面図・立面図・断面図を規則配置し、下半分に作品番号付きの見出しと解説文、小口側に仕様表を約2:1で組む技術図面レイアウト。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-landscape-grid-drawing',
};
```

## 原稿の書き方

- 1作品 = 1 entry (md ファイル)。frontmatter に `class: chapter` を書くと、その md ごとに作品番号 (`vs-counter-chapter`) が増え、`# 作品名` の頭に「01」「02」…が付く。序文・略歴など番号を持たない頁は `class` から `chapter` を外し、見出しを閉じ `#` 付きの `# 見出し #` と書く (VFM がセクションに包まないので番号が付かない)。
- 図面は `<div class="drawings">` の中に Markdown 画像で並べる。`{.plan}` を付けた平面図が左に回り込み、`{.elevation}` `{.section}` がその右に上下で入る。図番は SVG 側に描いてあるものとして、キャプション (alt) は紙面に出さない。
- 図面帯と解説帯は `---` (`<hr>`) で分ける。
- 仕様表は `<aside class="spec">` に `<h2>表題</h2>` と Markdown の表を入れる。見出しより前に置くと小口側の上端から始まる。
- 他の作品の番号は `<a href="別ファイル.html#id" data-ref="work"></a>` で引く (VFM は `.md` リンクを書き換えないので `.html` で書く)。参照先の見出しには `# 作品名 {#id}` で id を付ける。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                | 既定値                | 説明                             |
| ----------------------------------- | --------------------- | -------------------------------- |
| `--vs-theme-landscape-grid-drawing--font-tabular`          | `'Roboto Mono', ...`  | 図面注記・仕様表の数値の等幅書体 |
| `--vs-theme-landscape-grid-drawing--color-muted`           | `#555555`             | 解説文・表見出しの控えめな文字色 |
| `--vs-theme-landscape-grid-drawing--color-accent`          | `#cccccc`             | 見出し左の色帯                   |
| `--vs-theme-landscape-grid-drawing--color-rule`            | `#e4e4e1`             | 方眼線・表罫の淡い色             |
| `--vs-theme-landscape-grid-drawing--color-fill-soft`       | `#f1f1ee`             | 仕様表1列目の淡い地色            |
| `--vs-theme-landscape-grid-drawing--grid-pitch`            | `5mm`                 | 図面の方眼の目                   |
| `--vs-theme-landscape-grid-drawing--plan-size-inline`      | `136mm`               | 平面図の版面上の幅               |
| `--vs-theme-landscape-grid-drawing--elevation-size-inline` | `107mm`               | 立面図の版面上の幅               |
| `--vs-theme-landscape-grid-drawing--section-size-inline`   | `118mm`               | 断面図の版面上の幅               |
| `--vs-theme-landscape-grid-drawing--drawing-gap`           | `8mm`                 | 平面図と右側の図版とのアキ       |
| `--vs-theme-landscape-grid-drawing--spec-size-inline`      | `105mm`               | 仕様表パネルの幅                 |
| `--vs-theme-landscape-grid-drawing--spec-gap`              | `14mm`                | 解説と仕様表パネルのアキ         |
| `--vs-theme-landscape-grid-drawing--work-call-content`     | `target-counter(…)`   | 作品番号の参照の表記             |
| `--vs-font-family`                  | `'Noto Sans JP', ...` | 本文書体                         |
| `--vs-color-background`             | `#fafaf8`             | 地色                             |

ノンブルは `counter(page)` から生成し、小口下に3桁で入れる。判型 (B4横) は `--vs-page--size: 364mm 257mm` で指定している。
