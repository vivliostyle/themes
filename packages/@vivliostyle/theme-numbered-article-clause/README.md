# @vivliostyle/theme-numbered-article-clause

A4判・単段の定款テーマ。明朝体の条文を「第N章」「第N条」の番号付き見出しで組み、項・号を字下げの階層で示す。柱に現在章名、下中央にノンブルを添えた端正な法務文書。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-numbered-article-clause',
};
```

## 原稿の書き方

章・条・項・号の番号はすべてカウンタで生成する。原稿の見出しには番号を書かない。

```md
## 総則          <!-- → 第1章　総則 -->

### （名称） {#art-name}   <!-- → 第1条（名称） -->

1. 本法人は、…と称する。   <!-- 第1項は無番号 -->
2. 本法人は、…            <!-- → 2 -->
   1. …                  <!-- 号 → 一 -->

## 附則 ##               <!-- 閉じ # を付けると番号の付かない章になる -->
```

条文の参照は空のアンカーで書く。番号は参照先から `target-counter()` で解決される。

| 記法                                        | 出力   |
| ------------------------------------------- | ------ |
| `<a href="#chap-fund" data-ref="chap"></a>` | 第7章  |
| `<a href="#art-name" data-ref="art"></a>`   | 第12条 |
| `<a href="#art-name-2" data-ref="kou"></a>` | 第2項  |
| `<a href="#id" data-ref="gou"></a>`         | 第3号  |

「第20条第2項」のような複合参照は、参照先の項に置いた `<a id="…"></a>` を `art` と `kou` の 2 つのアンカーで指す。項・号に id を付けるには、リスト項目の先頭に `<a id="…"></a>` を置く (VFM の属性記法 `{#id}` は見出しにしか効かない)。

なお VFM は空のインライン要素の直後の空白を落とすため、参照の後に和文以外が続くときは `&nbsp;` を置く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                 | 既定値                                            | 説明                           |
| ------------------------------------ | ------------------------------------------------- | ------------------------------ |
| `--vs-color-foreground` | `#171717` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-font-family`                   | `'Noto Serif JP', ...`                            | 本文書体                       |
| `--vs--heading-font-family`          | `'Noto Serif JP', ...`                            | 章・条見出しの書体             |
| `--vs-color-foreground-alt`            | `--vs-color-foreground` × `--vs-color-background` 25% | 発行主体・改定履歴・柱の濃灰色 |
| `--vs--table-border-color`           | `--vs-color-foreground` × `--vs-color-background` 45% | 社員名簿等の規程表の罫線色     |
| `--vs-page--mbox-top-left-content`   | `string(chaptitle)`                               | 柱に表示する現在章名           |
| `--vs-section--h2-marker-content`    | `'第' counter(vs-counter-sec-h2) '章'`            | 章番号の書式                   |
| `--vs-section--h3-marker-content` | `'第' counter(vs-counter-article) '条'`           | 条番号の書式                   |
| `--vs-theme-numbered-article-clause--kou-marker-content`     | `counter(vs-counter-kou)`                         | 項番号の書式                   |
| `--vs-theme-numbered-article-clause--gou-marker-content`     | `counter(vs-counter-gou, cjk-ideographic)`        | 号番号の書式                   |
| `--vs-theme-numbered-article-clause--article-counter-style`  | `decimal`                                         | 条番号のカウンタスタイル       |
| `--vs-theme-numbered-article-clause--kou-counter-style`      | `decimal`                                         | 項番号のカウンタスタイル       |
| `--vs-theme-numbered-article-clause--gou-counter-style`      | `cjk-ideographic`                                 | 号番号のカウンタスタイル       |
| `--vs-theme-numbered-article-clause--chapter-call-content`   | `'第' target-counter(…, vs-counter-sec-h2) '章'`  | 章参照の書式                   |
| `--vs-theme-numbered-article-clause--article-call-content`   | `'第' target-counter(…, vs-counter-article) '条'` | 条参照の書式                   |
| `--vs-theme-numbered-article-clause--kou-call-content`       | `'第' target-counter(…, vs-counter-kou) '項'`     | 項参照の書式                   |
| `--vs-theme-numbered-article-clause--gou-call-content`       | `'第' target-counter(…, vs-counter-gou) '号'`     | 号参照の書式                   |

表題直下の発行主体・制定改定履歴は `.issuer` / `.revision-record` を付けた段落として書く。
