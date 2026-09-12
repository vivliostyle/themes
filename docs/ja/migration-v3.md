# Vivliostyle Themes v3への移行

Vivliostyle Themes v3では`@vivliostyle/theme-base`を大きく書き直しました。パッケージはnpmパッケージ名でインポートするモジュールの集まりになり、文書全体の色とフォントは役割ベースのデザイントークンに統一され、カスタムプロパティは制御するCSSプロパティと同じ名前になるよう改名されたうえ、これまで素のCSSを書く必要があった部分にも変数が追加されました。公式テーマはこの新しい基盤の上に作り直されています。

このガイドは既存のプロジェクトやテーマに影響し得る変更をすべて挙げ、更新方法を示します。アップグレード後に表示が期待どおりでない場合は、使っている変数やスタイルシートを以下の表から探してください。

対象パッケージと新しいバージョン：

| パッケージ                                                                                      | バージョン    |
| :---------------------------------------------------------------------------------------------- | :------------ |
| `@vivliostyle/theme-base`                                                                       | 2.1.1 → 3.0.0 |
| `@vivliostyle/theme-academic`、`-bunko`、`-gutenberg`、`-slide`、`-techbook`                    | 2.0.2 → 3.0.0 |
| `@vivliostyle/theme-epub3j`                                                                     | 1.1.1 → 2.0.0 |
| `create-vivliostyle-theme`                                                                      | 1.0.2 → 11.3.1（Vivliostyle CLIに統合されます。[`create-vivliostyle-theme`](#手順9-create-vivliostyle-theme-vivliostyle-theme-scripts)を参照） |
| `vivliostyle-theme-scripts`                                                                    | 0.3.7 → 廃止（Vivliostyle CLIに統合されます。[`vivliostyle-theme-scripts`](#手順9-create-vivliostyle-theme-vivliostyle-theme-scripts)を参照） |

## 必要な作業の目安

- 公式テーマを`vivliostyle.config.js`から使っているだけの場合は、Vivliostyle CLIをアップグレードします（[手順1](#手順1-vivliostyle-cliのアップグレード)）。次に[公式テーマ](#手順8-公式テーマ)の節を確認してください。外部リンクは脚注にならなくなり、`theme-bunko`・`theme-techbook`・`theme-gutenberg`の柱（ランニングヘッド）用の変数は置き換えられました。
- カスタムスタイルシートで`--vs-*`変数を上書きしている場合は、上記に加えて設定している変数を改名し（[手順3](#手順3-変数の改名)）、[削除された変数](#手順4-削除された変数)と[既定値の変更](#手順5-既定値の変更)を確認します。
- `@vivliostyle/theme-base`の上に独自のテーマを作っている場合は、[インポート](#手順2-スタイルシートのインポートの更新)から始めて、すべての手順を確認してください。

## 手順1 Vivliostyle CLIのアップグレード

すべてのパッケージが`@vivliostyle/cli` 11.3.1以降を必要とします（従来は`>=7`、`theme-epub3j`は`>=8`）。

- スタイルシートがCSS Nestingを使っており、CLI 11.3.0に同梱されるVivliostyle.jsが必要です。
- スタイルシートは`@vivliostyle/theme-base`をnpmパッケージ名でインポートし、パッケージの`exports`フィールドに依存します。この解決はCLI 11.3.0で追加されたもので、それより前のリリースでは読み込みに失敗します。
- テーマの`example/`のように、自身が属するパッケージを名前でインポートするスタイルシートは、CLI 11.3.1以降でそのパッケージ自身に解決されます。11.3.0では同名のパッケージをnpmからインストールしていました。

```sh
npm install --save-dev @vivliostyle/cli@latest
```

`@vivliostyle/theme-base`はそれをインポートするプロジェクトにインストールされている必要があります。theme-baseに依存するテーマパッケージも同様で、`dependencies`に宣言してください。

## 手順2 スタイルシートのインポートの更新

### プリセットの廃止

`theme-all.css`と`theme-basic.css`はなくなり、`css/common/`・`css/partial/`・`css/lib/`ディレクトリもなくなりました。パッケージエントリが含むのは基本モジュール、つまりCSSリセット・変数の既定値・基本的なHTMLタグのスタイルだけです。それ以外の機能はすべて、固有のサブパスでインポートするモジュールになりました。

| 変更前（v2）                                  | 変更後（v3）                                                                      |
| :-------------------------------------------- | :-------------------------------------------------------------------------------- |
| `theme-basic.css`                             | `@vivliostyle/theme-base`                                                         |
| `theme-all.css`                               | `@vivliostyle/theme-base`と、使う機能モジュール（後述）                            |
| `css/common/meta-properties.css`              | `@vivliostyle/theme-base/define`                                                  |
| `css/common/reset.css`                        | `@vivliostyle/theme-base/reset`                                                   |
| `css/common/basic.css`                        | `@vivliostyle/theme-base/basic`                                                   |
| `css/partial/crossref.css`                    | `@vivliostyle/theme-base/figure`・`/table`・`/citation`（参照の種類ごとに1モジュール） |
| `css/partial/endnote.css`                     | `@vivliostyle/theme-base/endnote`                                                 |
| `css/partial/footnote.css`                    | `@vivliostyle/theme-base/footnote`                                                |
| `css/partial/footnote-external-link.css`      | `@vivliostyle/theme-base/footnote/external-links`                                 |
| `css/partial/page.css`                        | `@vivliostyle/theme-base/page`                                                    |
| `css/partial/section.css`                     | `@vivliostyle/theme-base/section`                                                 |
| `css/partial/toc.css`                         | `@vivliostyle/theme-base/toc`                                                     |
| `css/partial/utility-classes.css`             | 削除。[ユーティリティクラス](#ユーティリティクラス)を参照                          |
| `css/lib/prism/base.css`                      | `@vivliostyle/theme-base/prism`                                                   |
| `css/lib/prism/theme-prism.css`               | `@vivliostyle/theme-base/prism/theme-prism`                                       |
| `css/lib/prism/theme-okaidia.css`             | `@vivliostyle/theme-base/prism/theme-okaidia`                                     |

`@import url(../theme-base/theme-all.css)`のような、themesディレクトリからの相対パスではなく、パッケージ名でインポートしてください。

### CSSの場合

```css
/* 変更前 */
@import url(@vivliostyle/theme-base/theme-all.css);

/* 変更後：エントリに続けて、使うモジュールを並べる */
@import '@vivliostyle/theme-base';
@import '@vivliostyle/theme-base/figure';
@import '@vivliostyle/theme-base/table';
@import '@vivliostyle/theme-base/citation';
@import '@vivliostyle/theme-base/endnote';
@import '@vivliostyle/theme-base/footnote';
@import '@vivliostyle/theme-base/page';
@import '@vivliostyle/theme-base/section';
@import '@vivliostyle/theme-base/toc';
```

上のリストは`theme-all.css`が読み込んでいたものを再現しますが、2点だけ異なります。

- `footnote-external-link.css`は`theme-all.css`に含まれていました。外部リンクを脚注にする挙動を残すには`@import '@vivliostyle/theme-base/footnote/external-links';`を追加してください。
- `utility-classes.css`は削除されました。[ユーティリティクラス](#ユーティリティクラス)を参照してください。

v3で新しく追加され、対応するマークアップを使うなら追加する価値のあるモジュール：`listing`・`equation`・`theorem`・`appendix`・`math`・`sidenote`。[新機能](#手順10-新機能)を参照してください。

### `vivliostyle.config.js`の場合

`import`オプションも同じサブパスを解決します。`import: 'theme-all.css'`と`import: 'theme-basic.css'`は解決できなくなりました。

```js
// 変更前
export default {
  theme: { specifier: '@vivliostyle/theme-base', import: 'theme-all.css' },
};

// 変更後：エントリはパッケージそのもの、モジュールはそれぞれ別のimportで指定する
export default {
  theme: [
    '@vivliostyle/theme-base',
    { specifier: '@vivliostyle/theme-base', import: 'footnote' },
    { specifier: '@vivliostyle/theme-base', import: 'page' },
  ],
};
```

Vivliostyle CLI 11.3.0以降はCSSからインポートされたVivliostyle Themeは自動でインストールされるようになったため、`@import`を並べたカスタムスタイルシートを用意して設定ファイルからそれを指す方が短く済みます。

## 手順3 変数の改名

以下の改名はすべて機械的なものです。設定していた値は新しい名前のままで引き続き有効です。左列の名前でスタイルシートを検索してください。

### デザイントークン

文書全体の色とフォントは、役割ベースの8つのトークンになりました。`-alt`トークンは副次的な役割（控えめな文字色・網掛けの背景・薄い罫線・第2のフォント）を表し、既定では主トークンの値を継承するため、何も設定しないテーマの見た目は変わりません。

| 変更前                     | 変更後                                                                        |
| :------------------------- | :---------------------------------------------------------------------------- |
| `--vs-color-body`          | `--vs-color-foreground`                                                       |
| `--vs-color-bg`            | `--vs-color-background`                                                       |
| `--vs-border-color`        | `--vs-color-border`                                                           |
| `--vs--html-font-size`     | `--vs-font-size`（中継変数は廃止。`--vs-font-size`を直接設定する）            |
| （新規）                   | `--vs-color-foreground-alt`・`--vs-color-background-alt`・`--vs-color-border-alt` |
| （新規）                   | `--vs-font-family-alt`・`--vs-font-family-monospace`                          |

基本スタイルシートは`-alt`トークンを要素の既定値として使用しません。使う場合は、`--vs--figcaption-text-color: var(--vs-color-foreground-alt)`のようにテーマ側で要素変数から参照してください。

### CSSプロパティから推測可能な名前への改名

色の変数はプロパティ名（`color`には`text-color`、`background-color`はそのまま）を使います。残りの改名は、適用される論理的な辺を明示するか、綴りの誤りを直すものです。

| 変更前                                                                            | 変更後                                                                                    |
| :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `--vs--anchor-color`                                                              | `--vs--anchor-text-color`                                                                 |
| `--vs-footnote--color-body`                                                       | `--vs-footnote--text-color`                                                               |
| `--vs-page--color-bg`                                                             | `--vs-page--background-color`                                                             |
| `--vs-page--mbox-color-bg`                                                        | `--vs-page--mbox-background-color`                                                        |
| `--vs-page--mbox-color-body`                                                      | `--vs-page--mbox-text-color`                                                              |
| `--vs-prism--color`                                                               | `--vs-prism--text-color`                                                                  |
| `--vs-prism--color-<token>`（`atrule`〜`variable`の30トークン）                   | `--vs-prism--<token>-text-color`（例：`--vs-prism--comment-text-color`）                  |
| `--vs--hr-border-width`                                                           | `--vs--hr-border-width-block-start`                                                       |
| `--vs-endnote--section-hr-border-width`                                           | `--vs-endnote--section-hr-border-width-block-start`                                       |
| `--vs-footnote--area-before-border-{style,color,width}`                           | `--vs-footnote--area-before-border-{style,color,width}-block-start`                       |
| `--vs-footnote--font-synthesize`                                                  | `--vs-footnote--font-synthesis`                                                           |
| `--vs-section--marker-margin-inline`                                              | `--vs-section--marker-margin-inline-end`                                                  |
| `--vs-section--h1-marker-margin-inline`〜`--vs-section--h6-marker-margin-inline`  | `--vs-section--h1-marker-margin-inline-end`〜`--vs-section--h6-marker-margin-inline-end`  |

### ページ余白とマージンボックス

ボックスごとの変数は`--vs-page--mbox-<box>-<property>`の順になり、左右で反転するページのための変数が追加されました。

| 変更前                                                              | 変更後                                                                                                                        |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| `--vs-page--mbox-content-<box>`（`top-left-corner`〜`bottom-right-corner`の16ボックス） | `--vs-page--mbox-<box>-content`（例：`--vs-page--mbox-top-left-content`）                                        |
| `--vs-page--margin-inner`・`--vs-page--margin-outer`                | `--vs-page--margin-inside`・`--vs-page--margin-outside`                                                                       |
| `--vs-page--margin-top`・`--vs-page--margin-bottom`                 | 名前は同じ。ただし新設の`--vs-page--margin`（既定`18mm`）にフォールバックするようになった（[既定値の変更](#手順5-既定値の変更)を参照） |
| `--vs-page--mbox-padding-{top,bottom,left,right}-{inner,outer}`     | 辺ごとの`--vs-page--mbox-{top,bottom,left,right}-padding-*`と、ボックスごとの`--vs-page--mbox-<box>-padding-*`               |

左右ページで異なる柱に`@page :left`／`@page :right`は不要になりました。`--vs-page--mbox-top-outside-content`・`--vs-page--mbox-bottom-inside-content`などの`inside`／`outside`と名のつく変数は、ページの左右に応じて左右どちらのボックスかに解決されます。

```css
/* 変更前 */
@page :left {
  --vs-page--mbox-content-top-left: counter(page);
}
@page :right {
  --vs-page--mbox-content-top-right: counter(page);
}

/* 変更後 */
:root {
  --vs-page--mbox-top-outside-content: counter(page);
}
```

### `-on-screen`／`-on-print`／`-on-hover`接尾辞の廃止

メディアや状態ごとに専用の変数を用意する代わりに、メディアクエリの中やホバーされる要素で元の変数を再定義します。

| 削除                                                                                      | 代わりに使うもの                       |
| :---------------------------------------------------------------------------------------- | :------------------------------------- |
| `--vs-font-size-on-screen`・`--vs-font-size-on-print`                                     | `--vs-font-size`                       |
| `--vs--pre-white-space-on-screen`・`--vs--pre-white-space-on-print`                       | `--vs--pre-white-space`                |
| `--vs--table-container-overflow-x-on-screen`・`--vs--table-container-overflow-x-on-print` | `--vs--table-container-overflow-x`     |
| `--vs--anchor-text-decoration-on-hover`                                                   | `--vs--anchor-text-decoration`         |
| `--vs-crossref--anchor-text-decoration-on-hover`                                          | `--vs--crossref-call-text-decoration`  |
| `--vs-crossref--call-fig-content-on-screen`                                               | `--vs-figure--call-content`            |
| `--vs-crossref--call-tbl-content-on-screen`                                               | `--vs-table--call-content`             |
| `--vs-crossref--call-cite-content-on-screen`                                              | `--vs-citation--call-content`          |
| `--vs-endnote--anchor-text-decoration-on-hover`                                           | `--vs-endnote--anchor-text-decoration` |
| `--vs-endnote--backlink-display-on-print`                                                 | `--vs-endnote--backlink-display`       |
| `--vs-section--anchor-text-decoration-on-hover`                                           | `--vs--crossref-call-text-decoration`  |
| `--vs-toc--anchor-text-decoration-on-hover`                                               | `--vs-toc--anchor-text-decoration`     |

```css
/* 変更前 */
:root {
  --vs--pre-white-space-on-print: pre-wrap;
  --vs-toc--anchor-text-decoration-on-hover: underline;
}

/* 変更後 */
@media print {
  :root {
    --vs--pre-white-space: pre-wrap;
  }
}
@media (hover: hover) {
  :is(#toc, [role='doc-toc']) li > a:hover {
    --vs-toc--anchor-text-decoration: underline;
  }
}
```

### 相互参照：種類ごとにモジュールと名前空間を分離

`crossref.css`は`figure`・`table`・`citation`モジュールに分割されました（さらに新規の`listing`・`equation`・`theorem`・`appendix`とページ参照が加わります）。`--vs-crossref--`名前空間は廃止され、種類ごとの変数はそれぞれの名前空間へ、共通の既定値は基本スタイルシートに含まれるルートレベルの変数へ移りました。

| 変更前                                                          | 変更後                                                                                         |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `--vs-crossref--anchor-text-decoration`                         | `--vs--crossref-call-text-decoration`                                                          |
| `--vs-crossref--call-text-color`                                | `--vs--crossref-call-text-color`                                                               |
| `--vs-crossref--call-margin-inline`                             | `--vs--crossref-call-margin-inline`                                                            |
| `--vs-crossref--call-display`                                   | `--vs--crossref-call-display`、または種類ごと（`--vs-figure--call-display`など）               |
| `--vs-crossref--counter-style`                                  | `--vs-counter-style`（共通）、`--vs-<type>--counter-style`（種類ごと）                          |
| `--vs-crossref--marker-counter-prefix`                          | `--vs-crossref-marker-counter-prefix`                                                          |
| `--vs-crossref--call-counter-prefix`                            | `--vs-crossref-call-counter-prefix`                                                            |
| `--vs-crossref--call-{fig,tbl,cite}-content`                    | `--vs-figure--call-content`・`--vs-table--call-content`・`--vs-citation--call-content`         |
| `--vs-crossref--marker-{fig,tbl,cite}-content`                  | `--vs-figure--marker-content`・`--vs-table--marker-content`・`--vs-citation--marker-content`   |
| `--vs-crossref--marker-{fig,tbl,cite}-margin-inline`            | `--vs-figure--marker-margin-inline`・`--vs-table--…`・`--vs-citation--…`                       |
| `--vs-crossref--marker-display`・`--vs-crossref--marker-margin-inline` | 種類ごと：`--vs-figure--marker-display`・`--vs-table--marker-margin-inline`など          |
| `--vs-crossref--root-counter-{fig,tbl,cite}`                    | `--vs-figure--root-counter-fig`・`--vs-table--root-counter-tbl`・`--vs-citation--root-counter-cite` |
| `--vs-crossref--root-counter-reset`                             | 種類ごとの`--vs-<type>--root-counter-reset`                                                    |
| `--vs-section--anchor-text-decoration`・`--vs-section--call-margin-inline` | 節参照は共通の`--vs--crossref-call-*`既定値を使う                                    |

```css
/* 変更前 */
@import url(@vivliostyle/theme-base/css/partial/crossref.css);
:root {
  --vs-crossref--counter-style: upper-roman;
  --vs-crossref--marker-fig-content: 'Fig. ' counter(vs-counter-fig) ' ';
  --vs-crossref--marker-display: none;
}

/* 変更後 */
@import '@vivliostyle/theme-base/figure';
@import '@vivliostyle/theme-base/table';
@import '@vivliostyle/theme-base/citation';
:root {
  --vs-counter-style: upper-roman;
  --vs-figure--marker-content: 'Fig. ' counter(vs-counter-fig) ' ';
  --vs-figure--marker-display: none;
  --vs-table--marker-display: none;
  --vs-citation--marker-display: none;
}
```

## 手順4 削除された変数

1対1の代替がない変数です。

| 削除                                                                         | 対応                                                                                                                          |
| :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `--vs--ul-minimum-inline-indent-size`・`--vs--ol-minimum-inline-indent-size` | `--vs--ul-padding-inline-start`／`--vs--ol-padding-inline-start`、または共通の`--vs--lists-padding-inline-start`でインデントを直接設定する |
| `--vs-page--cover-break-before`・`--vs-page--cover-break-after`              | どの規則からも参照されていなかった。表紙要素自体に`break-before`／`break-after`を設定する                                     |
| 公式テーマの`--vs-theme--page-*`                                             | [公式テーマ](#手順8-公式テーマ)を参照                                                                                             |

## 手順5 既定値の変更

| 変数                               | 変更前                            | 変更後                                           |
| :--------------------------------- | :-------------------------------- | :----------------------------------------------- |
| `--vs-page--margin-top`・`--vs-page--margin-bottom` | `22mm`           | `18mm`（新設の`--vs-page--margin`経由）。`22mm`を保つには明示的に設定する |
| `--vs--lists-padding-inline-start` | `var(--vs-spacing-inline-indent)` | `2rem`。さらに最上位のリストにインデントが付くようになった（[リスト](#リストのインデント)を参照） |
| `--vs--blockquote-margin-inline`   | `var(--vs-spacing-inline-indent)` | `var(--vs-spacing-inline-indent) 0`              |
| `--vs--figure-item-padding-inline` | `var(--vs-spacing-inline-indent)` | `0`。適用対象も置換要素のみになった              |
| `--vs--pre-overflow-x`             | `auto`                            | 画面では`auto`、印刷では`visible`                |
| `--vs--p-hanging-punctuation`      | `var(--vs-hanging-punctuation)`   | 既定値なし。祖先要素から設定できる               |
| `--vs--anchor-text-color`          | `inherit`（`--vs--anchor-color`として） | `var(--vs-color-foreground)`               |
| `--vs-page--mbox-text-color`       | `inherit`（`--vs-page--mbox-color-body`として） | `var(--vs-color-foreground)`       |

## 手順6 挙動の変更

### リストのインデント

`ul`／`ol`の最上位は`max(var(--vs--ul-padding-inline-start), var(--vs--ul-minimum-inline-indent-size))`で配置されていました。どちらの変数にも既定値がなかったため宣言全体が無効になり、最上位のリストにはインデントが付かず、マーカーが本文ブロックの外にはみ出していました。リストは`--vs--lists-padding-inline-start`（既定`2rem`）でインデントされるようになります。以前の表示を保つには`0`を設定してください。

### テーマが書いた規則が効くようになった

- テーマの`th, td { border-width: … }`は`tr:not(:last-child)`と`th:not(:last-child), td:not(:last-child)`に負けていました。これらのセレクタは`:where()`で包まれました。
- `figure > *`は置換要素（`img`・`video`など）以外には`padding-inline`を受けなくなり、figure内の`pre`・`div`・`table`の使用サイズが変わらなくなりました。
- `b`・`strong`・`th`は`--vs--heading-font-family`にフォールバックしなくなりました。見出し全体のフォントを設定しても、本文の太字や表見出しは変わりません。
- 未設定の`--vs-footnote--*`プロパティは文書の既定値に固定されず、呼び出し元から継承されます。

### 名前付きページは`html`または`body`で指定する

文書の役割に対応する名前付きページ（`chapter`・`part`・`appendix`・`toc`・`cover`・`bibliography`・`colophon`など）は`:is(html, body):is(.<name>, [role='doc-<name>'])`で照合されます。文書内部の要素に付けた`role="doc-*"`属性では名前付きページが切り替わらなくなったので、クラスかroleを`html`または`body`に付けてください（例：VFMのフロントマター経由）。文書途中の表紙は要素レベルのフック（`.cover`、`section:has(> .cover:first-child)`）をそのまま使えます。DPUB-ARIAのrole `doc-chapter`・`doc-part`もクラスに加えて章／部のカウンタを進めるようになり、`toc`／`cover`の検出は`body`だけでなく`html`にも一致します。

### 見出しカウンタは親セクションでリセットされる

`vs-counter-sec-h2`〜`vs-counter-sec-h6`は親セクションでリセットされるようになり、各`h2`配下の最初の`h3`は1から数えます。カウンタが文書全体を通して進む挙動に依存していたテーマは、独自のカウンタを定義してください。

```css
:root {
  --vs-document-root-counter-reset: non-reset-h2 non-reset-h3;
  --vs-section--h2-marker-content: counter(non-reset-h2);
  --vs-section--h3-marker-content: counter(non-reset-h2) '.' counter(non-reset-h3);
}
section:has(> h2:first-child) {
  counter-increment: vs-counter-sections vs-counter-sec-h2 non-reset-h2;
}
section:has(> h3:first-child) {
  counter-increment: vs-counter-sections vs-counter-sec-h3 non-reset-h3;
}
```

### ホバースタイルはホバーできる環境だけで適用

ホバー時のスタイル（アンカーの下線、目次や注のリンク）は`@media (hover: hover)`が一致する環境だけで適用され、タッチ専用デバイスでは効かなくなりました。

### 相互参照の呼び出し

- テーマ独自の種類を含むすべての`a[data-ref]`から既定の下線がなくなりました。`--vs--crossref-call-text-decoration: underline`で戻せます。
- 引用参照の画面向けプレースホルダ`[???]`は定義されていたのに参照されておらず、`a[data-ref='cite']`は画面で何も表示していませんでした。表示されるようになります。
- 既定の`--vs-<type>--call-content`は、カウンタ接頭辞の`var()`のフォールバックが空だったためVivliostyleでは空として描画されていました。表示されるようになります。

### 外部リンクは既定では脚注にならない

`footnote-external-link.css`は`theme-all.css`に含まれていました。v3ではこのスタイルシートは`footnote/external-links`モジュールとなり、エントリからも公式テーマからもインポートされません。維持するには`@import '@vivliostyle/theme-base/footnote/external-links';`を追加してください。

### ユーティリティクラス

`break-before`・`break-after`・`break-inside`・`writing-mode`・`text-orientation`・`text-combine-upright`・`font-variant-numeric`の値ごとにクラスを提供していた`utility-classes.css`は削除されました。代わりに自分の規則でプロパティを宣言してください。

```css
/* 変更前：<h2 class="break-before-page"> */

/* 変更後 */
h2 {
  break-before: page;
}
```

### 脚注領域のat-rule

脚注領域はVivliostyle独自の`@-adapt-footnote-area`ではなく標準の`@footnote` at-ruleでスタイル付けされます。`@-adapt-footnote-area`を対象にしていた独自の規則は`@footnote`に書き換えてください。

## 手順7 `theme-base`の上にテーマを作る

- まずエントリを、次にモジュールをインポートします。変数の既定値（`define`）はエントリに含まれます。
- 変数の既定値は各スタイルシートに分散して定義され、`css/define.css`に集約されます。既定値のないものを含むすべての変数は、生成される`@vivliostyle/theme-base/css-variables.json`に記述されています（対応するCSSプロパティ、`@property`構文、既定値）。
- 長さには単位が必要です。`0`は`<number>`であり、それを保持する変数は長さが要求される場所では無効になります。
- プロパティを再宣言するのではなく`--vs--*`変数を設定してください。規則は論理プロパティを使っており、物理的な`margin`／`padding`ショートハンドでは確実に打ち消せません。

## 手順8 公式テーマ

すべての公式テーマが`@vivliostyle/cli` 11.3.1以降を必要とします。スタイルシートは`@vivliostyle/theme-base`をパッケージ名でインポートするので、`vivliostyle.config.js`の`theme`配列にベーススタイルシートを列挙する必要はなくなりました（`@vivliostyle/theme-base`は依存関係として同梱されます）。

### 柱とノンブル

`theme-bunko`・`theme-techbook`・`theme-gutenberg`は柱（ランニングヘッド）とノンブルを`theme-base`のページ変数で設定するようになりました。テーマ固有の変数は削除されています。

| テーマ            | 削除                                                                                                         | 代替                                                                                                                                                                    |
| :---------------- | :----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-bunko`     | `--vs-theme--page-top-left-content`・`--vs-theme--page-top-right-content`                                    | `--vs-page--mbox-top-outside-content`（`counter(page)`。左ページは`@page :left`で`counter(page) '　' env(doc-title)`に上書き）                                          |
| `theme-techbook`  | `--vs-theme--page-top-left-content`・`--vs-theme--page-top-right-content`・`--vs-theme--page-bottom-content` | `--vs-page--mbox-top-outside-content`（`env(doc-title)`。左ページは`@page :left`で`env(pub-title)`）、`--vs-page--mbox-bottom-outside-content`（`counter(page)`）       |
| `theme-gutenberg` | `--vs-theme--page-top-content`・`--vs-theme--page-top-color-body`・`--vs-theme--page-bottom-content`         | `--vs-page--mbox-top-center-content`（`env(pub-title)`）、`--vs-page--mbox-text-color`（`gray`）、`--vs-page--mbox-bottom-outside-content`（`counter(page)`）           |

### その他の変更

- `theme-academic`・`theme-bunko`・`theme-gutenberg`・`theme-techbook`は`theme-all.css`を読み込んでいたため、外部リンクが脚注になっていました。この挙動はなくなります。戻すにはカスタムスタイルシートに`footnote/external-links`のインポートを追加してください。
- `theme-slide`はユーティリティクラス（`break-before-page`など）をインポートしなくなりました。[ユーティリティクラス](#ユーティリティクラス)を参照してください。
- 公式テーマが公開している`theme-base`の変数は、上記の改名に従います。

## 手順9 `create-vivliostyle-theme` `vivliostyle-theme-scripts`

`create-vivliostyle-theme`と`vivliostyle-theme-scripts`は、Vivliostyle CLIに統合され、`vivliostyle theme`コマンドで置き換えられました。

- `create-vivliostyle-theme`パッケージは引き続き提供されます。このパッケージは`vivliostyle theme create`コマンドのエイリアスとして機能します。
- `vivliostyle-theme-scripts`パッケージは廃止されます。使用している場合は、以下のコマンドに置き換えてください。
  - `vivliostyle-theme preview` コマンドは、Vivliostyle CLIのプレビュー（`vivliostyle preview`）に置き換えられます。
  - `vivliostyle-theme validate` コマンドは、`vivliostyle theme validate` に置き換えられます。

## 手順10 新機能

上記の変更に加えて、v3では次の機能が追加されました。

- モジュール：`listing`（コードリスト、`lst`）・`equation`（`eq`）・`theorem`（`thm`）・`appendix`（`appendix`）・ページ参照（`page`、`page`モジュールに含まれる）・`math`（VFMの`mathml`／`mathjax`レンダラーの数式出力）・`sidenote`（インライン末尾側にフロートする番号付きの傍注）。相互参照の各種類には`--vs-<type>--label`・`--vs-<type>--counter-style`と固有の`root-counter-*`変数があり、`--vs-crossref-{marker,call}-counter-prefix`で既定のマーカーと呼び出しすべてに章番号を前置できます。
- 後注：`ol`マーカーでは足りないレイアウト向けのカウンタベースの番号付け（`--vs-endnote--marker-*`・`--vs-endnote--call-content`）、後注セクションのボックス用変数（`--vs-endnote--section-*`）、呼び出しとマーカーのタイポグラフィ。
- 引用リスト：`--vs-citation--items-*`・`--vs-citation--item-*`・`--vs-citation--marker-text-color`。
- 要素変数：これまで素のCSSが必要だった部分を埋めるもの。見出し（色・背景・パディング・罫線・`string-set`）、キャプション、表（部位ごとの罫線・行の縞・セルのタイポグラフィ）、リスト（`--vs--li-*`・`li::marker`）、`pre`、`blockquote`、インライン要素（`sup`・`sub`・`ruby`・`cite`）、段落（`--vs--p-first-text-indent`）、`hr`、ページ罫線（`--vs-page--border-*`）、見開きを考慮したページ余白（`--vs-page--{margin,padding}-{inside,outside}`）とマージンボックス。
- `css-variables.json`：すべての変数を機械可読な形で記述したファイル。`@vivliostyle/theme-base/css-variables.json`として公開されます。

各モジュールのドキュメントは[`src/<module>/README.md`](https://github.com/vivliostyle/themes/tree/main/packages/%40vivliostyle/theme-base/src)にあり、[パッケージREADME](https://github.com/vivliostyle/themes/tree/main/packages/%40vivliostyle/theme-base#readme)に一覧があります。

## チェックリスト

1. `@vivliostyle/cli`が11.3.1以降である。
2. `theme-all.css`・`theme-basic.css`・`css/common/`・`css/partial/`・`css/lib/`・themesディレクトリからの相対パスをインポートしているスタイルシートがない。
3. 外部リンクを脚注にしたい場合、`footnote/external-links`をインポートしている。
4. スタイルシートに`--vs-color-body`・`--vs-color-bg`・`--vs-border-color`・`--vs--html-font-size`・`-color-body`・`-color-bg`・`-on-screen`・`-on-print`・`-on-hover`・`--vs-crossref--`・`--vs-page--mbox-content-`が残っていない。
5. 既定値の変更後も、ページ余白・リストのインデント・blockquoteの余白が意図どおりである。
6. 名前付きページは`html`／`body`に指定してあり、見出しカウンタが期待どおりに番号を振っている。
