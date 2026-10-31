# @vivliostyle/theme-vertical-mincho-photo-caption

四六判 (127×188mm)・縦組み1段の自分史向けテーマ。明朝の縦組み本文に右肩の章題、版面下端のモノクロ写真とキャプション、章末の注、天の柱と漢数字ノンブルを静かに組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-vertical-mincho-photo-caption',
};
```

## 原稿の組み立て

md ファイル (ドキュメント) の種別を frontmatter の `class` で指定する。章番号・柱・目次はここから導出されるので、md には番号を書かない。

| `class`      | 用途             | 見出しの構成                                                  |
| ------------ | ---------------- | ------------------------------------------------------------- |
| `chapter`    | 本章             | h1 = 章題。「第N章」の N は `class: chapter` の文書順で数える |
| `title-page` | 標題紙           | h1 = 書名、以降の段落が著者名・刊記。柱・ノンブルを出さない   |
| (なし)       | 目次・あとがき等 | h1 = 表題 (章番号は付かない)                                 |

柱は「書名 (`env(pub-title)`)　第N章　章題」になる。書名は `vivliostyle.config.js` の `title`、章題は h1 から `string-set` で取る。

注は VFM の `[^n]` 記法で書く。theme-base の endnote モジュールで章末に組まれ、番号は縦中横で表示される。

目次は `<nav role="doc-toc">` の中に番号なしの tight list で書き、章へのリンクに `{data-ref=chapter}` を付けると「第N章」が前に付く。ページ番号は theme-base が `target-counter()` で入れる。

```md
<nav role="doc-toc">

1. [生まれた家](02-birth-house.html#birth-house){data-ref=chapter}

</nav>
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                    | 既定値                                      | 説明                               |
| --------------------------------------- | ------------------------------------------- | ---------------------------------- |
| `--vs-page--size`                       | `127mm 188mm`                               | 判型 (四六判)                      |
| `--vs-font-family`                      | `'Noto Serif JP', ...`                      | 本文書体                           |
| `--vs--heading-font-family`             | `'Noto Serif JP', ...`                      | 章題の書体                         |
| `--vs-color-foreground`                       | `#1a1a1a` | 本文・罫の墨色                     |
| `--vs-color-background`                 | `#f7f5f0` | 生成り地の色                       |
| `--vs-color-foreground-alt`               | `--vs-color-foreground` × `--vs-color-background` 15% | 注番号・キャプションの色           |
| `--vs-color-border`                | `--vs-color-foreground` × `--vs-color-background` 60% | 章題下・注の区切り罫の色           |
| `--vs-theme-vertical-mincho-photo-caption--color-photo-frame`         | `--vs-color-foreground` × `--vs-color-background` 80% | 図版の枠線の色                     |
| `--vs-theme-vertical-mincho-photo-caption--chapter-title-size-inline` | `80mm`                                      | 章題の行長 (縦方向の長さ)          |
| `--vs-section--h1-marker-content`    | `'第' counter(...) '章　'`                  | 章題に付く章番号                   |
| `--vs-theme-vertical-mincho-photo-caption--chapter-toc-content`       | `'第' target-counter(...) '章　'`           | 目次の `data-ref="chapter"` の番号 |
| `--vs-theme-vertical-mincho-photo-caption--running-head-content`      | `env(pub-title) '　' string(chapter-title)` | 柱の内容                           |
| `--vs-theme-vertical-mincho-photo-caption--folio-content`             | `counter(page, cjk-decimal)`                | ノンブルの内容                     |
