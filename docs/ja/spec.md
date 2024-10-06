<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Vivliostyle Theme の仕様](#vivliostyle-theme-%E3%81%AE%E4%BB%95%E6%A7%98)
  - [テーマ名](#%E3%83%86%E3%83%BC%E3%83%9E%E5%90%8D)
  - [テーマに含めるスタイル](#%E3%83%86%E3%83%BC%E3%83%9E%E3%81%AB%E5%90%AB%E3%82%81%E3%82%8B%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB)
  - [ディレクトリ構造](#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E6%A7%8B%E9%80%A0)
  - [package.json](#packagejson)
    - [`keywords` プロパティ](#keywords-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
    - [`vivliostyle.theme` プロパティ](#vivliostyletheme-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
      - [`style` プロパティ](#style-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
      - [`author` プロパティ](#author-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
      - [`category` プロパティ](#category-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
      - [`topics` プロパティ](#topics-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)
  - [example/](#example)
  - [theme.css](#themecss)
  - [vivliostyle.config.js](#vivliostyleconfigjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vivliostyle Theme の仕様

Vivliostyle Theme を npm package として公開する場合は以下の仕様に従ってください。[create-vivliostyle-theme][] を使うと、この仕様に従ったテーマを簡単に作成することができます。

## テーマ名

テーマの名前は自由に決められます。ただし、以下の点を考慮することを推奨します。

- 用途が明確な場合は、用途を表す端的な用語を含める
- 変更可能なスタイルに関する用語を避ける
  - 出版物のサイズや組み方向などは、将来的には Vivliostyle Pub などでユーザーが簡単に変更できるようになる予定です。したがって、これらの変更可能なスタイルに関する用語を使うことは避けてください。
  - 避けるべき名前の例：vivliostyle-theme-a4book、vivliostyle-theme-tategaki など

## テーマに含めるスタイル

テーマは、出版物の特定の部分のみ（図表のみ、脚注のみなど）のスタイルを含んだものではなく、出版物全体のスタイルを含めるものとします。

以下に、テーマに含めることが望ましい代表的なスタイルを示します。[create-vivliostyle-theme][] で作成したテーマの雛形はこれらのスタイルを含んでいます。

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
├── package.json
├── example/
│   ├── ...
│   └── default.md
├── theme.css
└── vivliostyle.config.js
```

[create-vivliostyle-theme][] でテーマの雛形を作成すると、上のようなファイルが自動生成されます。次の節からは代表的なファイルの詳細を見ていきます。

## package.json

```json
{
  "name": "vivliostyle-theme-mybook",
  "author": "John Doe <john@example.com>",
  "main": "theme.css",
  "keywords": [
    // 以下で説明
    "vivliostyle",
    "vivliostyle-theme"
  ],
  "vivliostyle": {
    // 以下で説明
    "theme": {
      "style": "./theme.css",
      "name": "Mybook",
      "author": "John Doe",
      "category": "novel",
      "topics": ["paperback"]
    }
  }
}
```

[vivliostyle-theme-scripts](https://github.com/vivliostyle/themes/tree/master/packages/vivliostyle-theme-scripts) を使うと、作成したテーマの package.json が仕様に従っているかをチェックできます。

```bash
$ vivliostyle-theme validate
```

### `keywords` プロパティ

任意。

このプロパティの値に `"vivliostyle-theme"` を含めておくと、[Create Book][] を使って出版物を作る際、利用可能なテーマの一覧にあなたのテーマが表示されます。ただし、そのためにはテーマを npm package として公開している必要があります。

テーマは Vivliostyle に関連する npm package であるため、`"vivliostyle"` も含めておくとよいでしょう。

### `vivliostyle.theme` プロパティ

#### `style` プロパティ

必須。テーマで使うメインの CSS を指定します。

package.json のトップレベルに `style` や `main` を指定することもできます。`vivliostyle.theme.style` と同じ意味を持ちますが、優先順位は `vivliostyle.theme.style` > `style` > `main` です。

```json
{
  "main": "theme.css",
  "style": "theme.css"
}
```

#### `author` プロパティ

必須。

#### `category` プロパティ

任意。このプロパティは、あなたのテーマを初めて使おうとするユーザーがテーマの主な用途を知るためのヒントになります。テーマにもっともあてはまるものを以下のリストから選んでください。

- `"novel"`
- `"magazine"`
- `"journal"`
- `"report"`
- `"misc"`

なお、このリストは今後更新される場合があります。

#### `topics` プロパティ

任意。テーマの用途を `category` プロパティよりも具体的に説明したい場合、ここにリストアップして記述しておくとよいでしょう。

## example/

example ディレクトリには、テーマの端的なサンプルとなるような Markdown ファイルを 1 つ以上含めてください。ファイル名は任意です。

Markdown ファイルでは [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm)が利用できます。

## theme.css

テーマのスタイルを定義したスタイルシートを含めてください。複雑なテーマを作成するために SCSS などの拡張スタイルシートを任意で使用することもできますが、実際の npm package には CSS にビルドした結果を含めるようにしてください。

テーマには複数のスタイルシートを含めることができます。たとえば、デフォルトの `theme.css` 以外に以下に示す用途を想定した種類のスタイルシートを用意する使い方などがあります。

- theme_print.css: PDF として出力する場合や、Vivliostyle Viewer で閲覧する場合のスタイルを定義
- theme_screen.css: HTML などの webpub 形式で出力する場合のスタイルを定義

Vivliostyle CLI でデフォルト以外のスタイルシートを指定する場合、以下のように `specifier` と `import` プロパティを設定します。

```js
theme: {
  specifier: 'vivliostyle-theme-mybook',
  import: 'theme_print.css',
},
```

## vivliostyle.config.js

```js
/** @type {import('@vivliostyle/cli').VivliostyleConfigSchema} */
module.exports = {
  language: 'en',
  theme: ['node_modules/@vivliostyle/theme-base', '.'],
  entry: ['example/default.md'],
  workspaceDir: '.vivliostyle',
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
```

example 内の Markdown ファイルから出版物を生成するための設定ファイルです。開発者がテーマを開発する際に使うほか、テーマを使うユーザーがサンプル出版物を生成する際にも使います。

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme
[create book]: https://github.com/vivliostyle/create-book
