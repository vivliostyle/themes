# @vivliostyle/theme-landscape-grid-drawing

横向きの展覧会図録テーマ。上半分は5mm方眼の上に平面図・立面図・断面図を規則配置し、下半分に作品番号付きの見出しと解説文、小口側に仕様表を約2:1で組む技術図面レイアウト。

## 使い方

```css
@import '@vivliostyle/theme-landscape-grid-drawing';
```

## 原稿の書き方

- 1作品 = 1 entry (md ファイル)。frontmatter に `class: chapter` を書くと、その md ごとに作品番号 (`vs-counter-chapter`) が増え、`# 作品名` の頭に「01」「02」…が付く。序文・略歴など番号を持たない頁は `class` から `chapter` を外し、見出しを閉じ `#` 付きの `# 見出し #` と書く (VFM がセクションに包まないので番号が付かない)。
- 図面は `<div class="drawings">` の中に Markdown 画像で並べる。`{.plan}` を付けた平面図が左に回り込み、`{.elevation}` `{.section}` がその右に上下で入る。図番は SVG 側に描いてあるものとして、キャプション (alt) は紙面に出さない。
- 図面帯と解説帯は `---` (`<hr>`) で分ける。
- 仕様表は `<aside class="spec">` に `<h2>表題</h2>` と Markdown の表を入れる。見出しより前に置くと小口側の上端から始まる。
- 他の作品の番号は `<a href="別ファイル.html#id" data-ref="work"></a>` で引く (VFM は `.md` リンクを書き換えないので `.html` で書く)。参照先の見出しには `# 作品名 {#id}` で id を付ける。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                                  | 既定値                                                | 説明                             |
| ----------------------------------------------------- | ----------------------------------------------------- | -------------------------------- |
| `--vs-theme-landscape-grid-drawing--grid-pitch`       | `5mm`                                                 | 図面の方眼の目                   |
| `--vs-theme-landscape-grid-drawing--spec-size-inline` | `105mm`                                               | 仕様表パネルの幅                 |
