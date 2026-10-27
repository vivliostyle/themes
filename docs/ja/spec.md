# Vivliostyle Themeの仕様

Vivliostyle Themeをnpm packageとして公開する場合は以下の仕様に従ってください。[create-vivliostyle-theme][] を使うと、この仕様に従ったテーマを簡単に作成することができます。

## テーマ名

テーマの名前は自由に決められます。ただし、以下の点を考慮することを推奨します。

- 用途が明確な場合は、用途を表す端的な用語を含める
- 変更可能なスタイルに関する用語を避ける
  - 出版物のサイズや組み方向などは、将来的にはVivliostyle Pubなどでユーザーが簡単に変更できるようになる予定です。したがって、これらの変更可能なスタイルに関する用語を使うことは避けてください。
  - 避けるべき名前の例：vivliostyle-theme-a4book、vivliostyle-theme-tategakiなど

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
├── template/
│   └── default/
│       ├── ...
│       ├── manuscript.md
│       └── vivliostyle.config.json
├── theme.css
└── vivliostyle.config.js
```

[create-vivliostyle-theme][] でテーマの雛形を作成すると、上のようなファイルが自動生成されます。ただしサンプルは`template/`ではなく`example/`に置かれるため、[template/](#template)を参考にテンプレートにしてください。次の節からは代表的なファイルの詳細を見ていきます。

## package.json

```json
{
  "name": "vivliostyle-theme-mybook",
  "description": "Theme for paperback novels",
  "author": "John Doe <john@example.com>",
  "main": "theme.css",
  "files": ["*.css", "template"],
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
      "topics": ["literature", "vertical-writing", "paperback"],
      "i18n": {
        "ja": { "description": "文庫本の小説向けのテーマ" }
      }
    },
    "template": {
      "default": {
        "name": "Mybook sample",
        "source": "./template/default"
      }
    }
  }
}
```

[Vivliostyle CLI](https://github.com/vivliostyle/vivliostyle-cli) の `theme validate` コマンドを使うと、作成したテーマのpackage.jsonが仕様に従っているかをチェックできます。

```bash
$ vivliostyle theme validate
```

### `description` プロパティ

推奨。英語で書いてください。npmと[theme.vivliostyle.org](https://theme.vivliostyle.org)は、これをテーマの概要として表示します。翻訳は[`vivliostyle.theme.i18n`](#i18n-プロパティ)に書きます。

### `keywords` プロパティ

任意。

このプロパティの値に `"vivliostyle-theme"` を含めておくと、[Create Book][] を使って出版物を作る際、利用可能なテーマの一覧にあなたのテーマが表示されます。ただし、そのためにはテーマをnpm packageとして公開している必要があります。

テーマはVivliostyleに関連するnpm packageであるため、`"vivliostyle"` も含めておくとよいでしょう。

### `vivliostyle.theme` プロパティ

#### `style` プロパティ

必須。テーマで使うメインのCSSを指定します。

package.jsonのトップレベルに `style` や `main` を指定することもできます。`vivliostyle.theme.style` と同じ意味を持ちますが、優先順位は `vivliostyle.theme.style` > `style` > `main` です。

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

なお、このリストは今後更新される場合があります。ジャンルなど、より具体的な用途は`topics`で表します。

#### `topics` プロパティ

任意。テーマの用途を`category`プロパティよりも具体的に表すキーワードです。[theme.vivliostyle.org](https://theme.vivliostyle.org)は、これをテーマを絞り込むためのタグとして表示します。

- 各トピックは、`two-column`のように小文字のkebab-caseの英語で書きます。
- [`vocabulary/topics.json`](https://github.com/vivliostyle/themes/blob/main/vocabulary/topics.json)の統制語彙に該当する語があれば、それを優先し、語の`id`で書きます。語彙には、段組、組方向、書体、ジャンル、雰囲気のファセットがあります。語の`aliases`は別の表記で、受け付けますが`id`に正規化されます。
- それ以外のトピックは自由タグとして表示されます。

このリポジトリの公式テーマは`pnpm run validate`で検査され、`node scripts/check-metadata.ts --fix`でトピックを正規化できます。

#### `i18n` プロパティ

任意。テーマの`name`とパッケージの`description`の翻訳を、言語コードをキーにして書きます。theme.vivliostyle.orgはその言語のページでこれを表示し、翻訳がなければ元の値を使います。

```json
"i18n": {
  "ja": {
    "name": "マイブック",
    "description": "文庫本の小説向けのテーマ"
  }
}
```

### `vivliostyle.template` プロパティ

任意ですが、推奨します。テーマを使うプロジェクトのテンプレートを、テンプレートIDをキーにして書きます。Vivliostyle CLIは`vivliostyle create`でテーマが選ばれたあとにこれを選択肢として示し、theme.vivliostyle.orgはこれを描画してテーマのサムネイル（最初のテンプレート）とプレビューに使います。テンプレートがない場合は、どちらもVivliostyle CLIの`basic`テンプレートを使います。

| フィールド    | 必須 | 説明                                       |
| ------------- | ---- | ------------------------------------------ |
| `name`        |      | テンプレートを選ぶときに表示する名前       |
| `description` |      | 名前と一緒に表示する短い説明               |
| `source`      | ✔   | テンプレートのファイルの場所               |
| `prompt`      |      | プロジェクトの作成時に追加で尋ねる質問     |

`source`には、`./`で始まるテーマのパッケージ内のパスか、`gh:user/repo/template`のような[giget](https://github.com/unjs/giget)形式のソースを書きます。パッケージ内のパスを推奨します。パッケージ内のパスは選ばれたテーマと同じバージョンのパッケージから読み込まれるため、テンプレートが常にテーマと一致します。giget形式のソースは、リポジトリのブランチの内容に追従します。パッケージ内のパスを使うには、Vivliostyle CLI 11.5.0以降が必要です。

`prompt`と、テンプレートで使える変数については、[Vivliostyle CLIのテンプレートのガイド](https://github.com/vivliostyle/vivliostyle-cli/blob/main/docs/ja/templates.md)を参照してください。

## template/

テンプレートは`template/`の下にそれぞれディレクトリを作って置き、package.jsonの`files`に`template`を含めてください。テンプレートには、`vivliostyle.config.json`と、テーマの特徴がわかるMarkdownファイルを1つ以上含めます。Markdownファイルでは[VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm)が利用できます。

`vivliostyle create`は、ファイルを新しいプロジェクトにコピーし、すべてのテキストファイルの[Handlebars](https://handlebarsjs.com/)の式を埋めます。テンプレートの`vivliostyle.config.json`では、これを使ってユーザーが入力した値を受け取ります。Vivliostyle PubはJavaScriptの設定ファイルを実行しないため、JavaScriptではなくJSONで書いてください。

```json
{
  "title": {{json (proper title)}},
  "author": {{json author}},
  "language": "ja",
  "theme": {{#if theme}}{{json theme}}{{else}}"vivliostyle-theme-mybook"{{/if}},
  "entry": ["manuscript.md"]
}
```

`theme`は、選ばれたパッケージとそのバージョンの範囲です（例：`"vivliostyle-theme-mybook@^1.0.0"`）。パッケージ内の別のスタイルシートを使う場合は、`{ "specifier": {{json theme}}, "import": "theme_print.css" }`のように書きます。

サンプルの文章のコードブロックなどで、`{{`をそのまま残したい場合は`\{{`と書きます。

このリポジトリの公式テーマは、`node scripts/example-to-template.ts <package-dir>`で`example/`から変換しました。

## theme.css

テーマのスタイルを定義したスタイルシートを含めてください。CSSカスタムプロパティ（CSS変数）を活用することで、ユーザーがテーマのスタイルを柔軟にカスタマイズできるようにすることを推奨します。

テーマには複数のスタイルシートを含めることができます。たとえば、デフォルトの `theme.css` 以外に以下に示す用途を想定した種類のスタイルシートを用意する使い方などがあります。

- theme_print.css: PDFとして出力する場合や、Vivliostyle Viewerで閲覧する場合のスタイルを定義
- theme_screen.css: HTMLなどのwebpub形式で出力する場合のスタイルを定義

Vivliostyle CLIでデフォルト以外のスタイルシートを指定する場合、以下のように `specifier` と `import` プロパティを設定します。

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
  theme: '.',
  entry: ['template/default/manuscript.md'],
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

プロジェクトを作らずに、テンプレートのMarkdownファイルを開発中のスタイルシートでビルドするための設定ファイルです。この場合はHandlebarsの式が埋められないため、コードブロック内の`\{{`はバックスラッシュが残ったまま表示されます。

[create-vivliostyle-theme]: https://www.npmjs.com/package/create-vivliostyle-theme
[create book]: https://github.com/vivliostyle/create-book
