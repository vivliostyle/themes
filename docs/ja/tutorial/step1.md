<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [Step 1. 雛形の生成](#step-1-%E9%9B%9B%E5%BD%A2%E3%81%AE%E7%94%9F%E6%88%90)
  - [雛形に含まれるファイル](#%E9%9B%9B%E5%BD%A2%E3%81%AB%E5%90%AB%E3%81%BE%E3%82%8C%E3%82%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB)
  - [雛形のプレビュー](#%E9%9B%9B%E5%BD%A2%E3%81%AE%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Step 1. 雛形の生成

[create-vivliostyle-theme][] というツールを使って、`npm` または `yarn` で Theme の原型を作成します（このチュートリアルでは `yarn` を使います）。create-vivliostyle-theme は、オリジナルの Theme を作るのに便利な雛形を生成できるツールです。

```bash
$ yarn create vivliostyle-theme my-doujin
? description すごい合同誌のTheme
? author name わたし
? author email watashi@example.com
? license AGPL-3.0
? choose category novel

Success! Created vivliostyle-theme-my-doujin.

1. cd vivliostyle-theme-my-doujin
2. edit scss/*.scss
3. publish to npm ($ npm publish)

✨  Done in 46.57s.
```

## 雛形に含まれるファイル

これが Theme の原型です。雛形には、出版物に必須の基本的なスタイルとサンプル原稿が含まれています。🖋 マークがついたファイルをこれから編集していきます。

```bash
$ cd vivliostyle-theme-my-doujin
$ tree . -I node_modules
.
├── LICENSE
├── README.md
├── example/                 サンプル原稿
│   └── default.md           🖋 Markdownを書く
├── package.json             🖋 Themeの情報を書く
├── scss/                    デフォルトで3つのスタイルファイル
│   ├── ...
│   ├── theme_common.scss    🖋 Themeの共通部分
│   ├── theme_print.scss     🖋 出版物 (PDFなど) 印刷用スタイル
│   └── theme_screen.scss    🖋 出版物 (HTMLなど) 閲覧用スタイル
├── vivliostyle.config.js    🖋 Themeプレビュー用設定ファイル
└── yarn.lock
```

example/ にはその Theme の適用例となるサンプル原稿を置きます。サンプル原稿は、ユーザが [Create Book](https://github.com/vivliostyle/create-book) を使って出版物を作る際、デフォルトの原稿として採用されます。

scss/ にはスタイルを置きます。Vivliostyle Theme では SCSS を推奨しています。デフォルトで 3 つの SCSS ファイルが作成されており、それぞれの役割は以下のとおりです。もちろん、SCSS ファイルを増やしてもかまいません。

- theme_print.scss：PDF 形式の出版物を印刷するときに適用するスタイル。トンボのスタイルなどはここで定義するとよいでしょう。
- theme_screen.scss：HTML 形式の出版物を閲覧するときに適用するスタイル。コンテンツが画面幅いっぱいに表示されるのを防ぐために表示幅を制限したり、文字サイズを調整したりするとよいでしょう。
- theme_common.scss：theme_print.scss や theme_screen.scss で共通して使うスタイル。

## 雛形のプレビュー

Theme を作り始める前に、まずは雛形のスタイルを確認してみましょう。以下のコマンドを実行すると、Vivliostyle Viewer (Chromium) が起動してプレビューが表示されます。Chromium がインストールされていない場合はインストールが始まります。

```bash
$ yarn dev
```

雛形には、組版に使う基本的なスタイルがすでに定義されています。以下がそのプレビュー画面です。デフォルトでは scss/theme_print.scss が適用されています。このスタイルファイルには、トンボや左上の theme_print という文字を表示するようなスタイルが定義されています。雛形で定義されているスタイルは自由に書き換えてかまいません。

![雛形のプレビュー画面](/assets/theme-sample.png)

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme
