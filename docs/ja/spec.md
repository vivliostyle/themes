<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [仕様](#%E4%BB%95%E6%A7%98)
  - [Theme 名](#theme-%E5%90%8D)
  - [Theme に含めるスタイル](#theme-%E3%81%AB%E5%90%AB%E3%82%81%E3%82%8B%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB)
  - [ディレクトリ構造](#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E6%A7%8B%E9%80%A0)
  - [package.json](#packagejson)
    - [`keywords` プロパティ](#keywords-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
    - [`vivliostyle.theme` プロパティ](#vivliostyletheme-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
      - [`style` プロパティ](#style-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
      - [`category` プロパティ](#category-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
      - [`topics` プロパティ](#topics-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
  - [example/](#example)
  - [scss/](#scss)
  - [\*.css](#%5Ccss)
  - [vivliostyle.config.js](#vivliostyleconfigjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 仕様

Theme を npm package として公開する場合は以下の仕様に従ってください。[create-vivliostyle-theme][] を使うと、この仕様に従った Theme を簡単に作成することができます。

## Theme 名

Theme の名前は自由に決められます。ただし、以下の点を考慮することを推奨します。

- 用途が明確な場合は、用途を表す端的な用語を含める
- 変更可能なスタイルに関する用語を避ける
  - 出版物のサイズや組み方向などは、将来的には Vivliostyle Pub などでユーザが簡単に変更できるようになる予定です。したがって、これらの変更可能なスタイルに関する用語を使うことは避けてください。
  - 避けるべき名前の例：vivliostyle-theme-a4book、vivliostyle-theme-tategaki など

## Theme に含めるスタイル

Theme は、出版物の特定の部分のみ（図表のみ、脚注のみなど）のスタイルを含んだものではなく、出版物全体のスタイルを含めるものとします。

以下に、Theme に含めることが望ましい代表的なスタイルを示します。[create-vivliostyle-theme][] で作成した Theme の雛形はこれらのスタイルを含んでいます。

- ページ（余白、柱など）
- 見出し
- 段落
- 数式
- 図とキャプション
- 表とキャプション
- ソースコード
- 脚注
- ルビ

## ディレクトリ構造

```
vivliostyle-theme-mybook/
├── LICENSE
├── README.md
├── package.json           # required
├── example/               # required
│   ├── ...
│   └── default.md
├── scss/                  # required
│   ├── ...
│   ├── theme_common.scss
│   ├── theme_print.scss
│   └── theme_screen.scss
├── theme_common.css       # required
├── theme_print.css        # required
├── theme_screen.css       # required
└── vivliostyle.config.js  # required
```

[create-vivliostyle-theme][] で Theme の雛形を作成すると、上のようなファイルが自動生成されます。次の節からは代表的なファイルの詳細を見ていきます。

## package.json

```package.json
{
  "name": "vivliostyle-theme-mybook",
  "author": "John Doe <john@example.com>",
  "keywords": [                      // 以下で説明
    "vivliostyle",
    "vivliostyle-theme"
  ],
  "files": [
    "*.css",
    "*.css.map",
    "scss",
    "example",
    "vivliostyle.config.js"
  ],
  "vivliostyle": {                   // 以下で説明
    "theme": {
      "style": "./theme_print.css", // required
      "name": "Mybook",
      "author": "John Doe",
      "category": "novel",
      "topics": ["paperback"]
    }
  }
}
```

### `keywords` プロパティ

任意。

このプロパティの値に `"vivliostyle-theme"` を含めておくと、[Create Book][] を使って出版物を作る際、利用可能な Theme の一覧にあなたの Theme が表示されます。ただし、そのためには Theme を npm package として公開している必要があります。

Theme は Vivliostyle に関連する npm package であるため、`"vivliostyle"` も含めておくとよいでしょう。

### `vivliostyle.theme` プロパティ

#### `style` プロパティ

必須。Theme で使うメインの CSS を指定します。

package.json のトップレベルに `style` や `main` を指定することもできます。`vivliostyle.theme.style` と同じ意味を持ちますが、優先順位は `vivliostyle.theme.style` > `style` > `main` です。

```package.json
{
  "style": "theme_print.css"
}
```

```package.json
{
  "main": "theme_print.css"
}
```

#### `category` プロパティ

任意。このプロパティは、あなたの Theme を初めて使おうとするユーザが Theme の主な用途を知るためのヒントになります。Theme にもっともあてはまるものを以下のリストから選んでください。

- `"novel"`
- `"magazine"`
- `"journal"`
- `"report"`
- `"misc"`

なお、このリストは今後更新される場合があります。

#### `topics` プロパティ

任意。Theme の用途を `category` プロパティよりも具体的に説明したい場合、ここにリストアップして記述しておくとよいでしょう。

## example/

example/ ディレクトリには、Theme の端的なサンプルとなるような Markdown ファイルを 1 つ以上含めてください。ファイル名は任意です。

Markdown ファイルでは [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm)が利用できます。

## scss/

Theme のスタイルを定義したスタイルシートを含めてください。組版用のスタイル定義は複雑になることが多いうえ、Theme を使うユーザがスタイルシートを編集して独自にカスタマイズすることもあります。そのため、変数や mixin が使える SCSS の使用を推奨しています。

Theme には複数のスタイルシートを含めることができます。詳細は [issue (vivliostyle/vivliostyle-cli #143)](https://github.com/vivliostyle/vivliostyle-cli/issues/143#issuecomment-791990973) を参照してください。たとえば、以下に示す用途を想定した 3 種類のスタイルシートを用意することができます。

- theme_print.scss: PDF として出力する場合や、Vivliostyle Viewer で閲覧する場合のスタイルを定義
- theme_screen.scss: HTML などの webpub 形式で出力する場合のスタイルを定義
- theme_common.scss: 上の 2 つに共通するスタイルを定義

## \*.css

scss/ ディレクトリのスタイルシートから生成された CSS ファイル群です。

## vivliostyle.config.js

```vivliostyle.config.js
module.exports = {
  language: "ja",
  theme: "theme_print.css",
  entry: ["example/default.md"],
  output: [
    "book.pdf",
    {
      path: "./book",
      format: "webpub",
    },
  ],
};
```

example/ 内の Markdown ファイルから出版物を生成するための設定ファイルです。開発者が Theme を開発する際に使うほか、Theme を使うユーザがサンプル出版物を生成する際にも使います。

[create-vivliostyle-theme]: /ja/development
[create book]: https://github.com/vivliostyle/create-book
