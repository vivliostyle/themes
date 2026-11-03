# @vivliostyle/theme-vertical-mincho-photo-caption

縦組み1段の自分史向けテーマ。明朝の縦組み本文に右肩の章題、版面下端の写真とキャプション、章末の注、天の柱と漢数字ノンブルを静かに組む。

## 使い方

```css
@import '@vivliostyle/theme-vertical-mincho-photo-caption';
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

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                    | 既定値                                      | 説明                               |
| --------------------------------------- | ------------------------------------------- | ---------------------------------- |
| `--vs-theme-vertical-mincho-photo-caption--running-head-content`      | `env(pub-title) '　' string(chapter-title)` | 柱の内容                           |
| `--vs-theme-vertical-mincho-photo-caption--folio-content`             | `counter(page, cjk-decimal)`                | ノンブルの内容                     |
