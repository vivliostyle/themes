# Themeの開発

## Themeを作成する

### `vivliostyle theme create`による雛形生成

Vivliostyle CLIでテーマプロジェクトの雛形を生成します。`npm create vivliostyle-theme` は同じコマンドのエイリアスです。

```bash
npx vivliostyle theme create <directory>
# または
npm create vivliostyle-theme <directory>
```

対話形式で以下の項目を入力します。いずれもコマンドラインオプションで指定できます。

| 項目         | オプション      | 説明                                                                 |
| ------------ | --------------- | -------------------------------------------------------------------- |
| パッケージ名 | `--name`        | テーマのnpmパッケージ名（既定値: `vivliostyle-theme-<directory>`）   |
| 説明         | `--description` | テーマの説明                                                         |
| 作者         | `--author`      | 作者名                                                               |
| 分類         | `--category`    | テーマの分類（`novel` / `magazine` / `journal` / `report` / `misc`） |

### 生成されるファイル構成

```
<directory>/
├── .gitignore
├── package.json          # パッケージ定義（vivliostyle.theme 設定を含む）
├── README.md             # テーマの説明・使い方
├── theme.css             # テーマのメイン CSS
├── vivliostyle.config.js # プレビュー用の設定ファイル
└── example/
    ├── 01_typography.md      # サンプル原稿（VFM 形式）
    ├── 02_figures-and-tables.md
    ├── 03_code-and-math.md
    └── assets/
```

各ファイルの役割:

| ファイル                | 役割                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `package.json`          | テーマのメタ情報。`vivliostyle.theme` プロパティでテーマ名・作者・メインCSS・カテゴリを定義   |
| `theme.css`             | テーマのスタイル定義本体。theme-baseの `@import` とCSS変数のカスタマイズが初期設定済み        |
| `vivliostyle.config.js` | `vivliostyle preview` でテーマの動作確認に使用。entryに `example/` の原稿を指定               |
| `example/*.md`          | テーマ適用例を示すサンプルMarkdown。[VFM](https://vivliostyle.github.io/vfm/#/vfm) 記法に対応 |

## 雛形をカスタマイズする

### theme.cssの編集

生成直後の `theme.css` は、theme-baseのモジュールをインポートし、CSS変数でカスタマイズする次のような構成になっています。

```css
/* theme-base の基本モジュールをインポート */
@import '@vivliostyle/theme-base';

/* 機能モジュールをインポート */
@import '@vivliostyle/theme-base/appendix';
@import '@vivliostyle/theme-base/citation';
@import '@vivliostyle/theme-base/endnote';
@import '@vivliostyle/theme-base/equation';
@import '@vivliostyle/theme-base/figure';
@import '@vivliostyle/theme-base/footnote';
@import '@vivliostyle/theme-base/listing';
@import '@vivliostyle/theme-base/math';
@import '@vivliostyle/theme-base/page';
@import '@vivliostyle/theme-base/section';
@import '@vivliostyle/theme-base/sidenote';
@import '@vivliostyle/theme-base/table';
@import '@vivliostyle/theme-base/theorem';
@import '@vivliostyle/theme-base/toc';

/* コードハイライト（Prism）を追加 */
@import '@vivliostyle/theme-base/prism';
@import '@vivliostyle/theme-base/prism/theme-okaidia';

:root {
  /* 基本スタイル */
  --vs-font-family: 'Times New Roman', serif;
  --vs-font-size: 12px;
  --vs--heading-line-height: 1.3;
  --vs--h1-font-size: 2.5em;

  /* 脚注 */
  --vs-footnote--call-content: '[' counter(footnote) ']';

  /* ページレイアウト */
  --vs-page--mbox-bottom-center-content: counter(page);
  --vs-page--mbox-top-left-content: env(doc-title);

  /* 目次 */
  --vs-toc--ol-indent-size: 1.5rem;
}
```

独自のスタイルを追加するには、このファイルの末尾にルールを記述します。ページサイズの設定例:

```css
@page {
  size: A5;
  margin: 20mm 15mm;
}
```

### theme-baseのモジュール活用

theme-baseは機能ごとにモジュール分割されています。パッケージエントリに含まれるのは基本モジュールだけなので、必要な機能モジュールのインポートだけを残せます。

```css
/* 基本モジュールのみ */
@import '@vivliostyle/theme-base';

/* 必要な機能モジュールを追加 */
@import '@vivliostyle/theme-base/toc';
@import '@vivliostyle/theme-base/footnote';
```

利用可能なモジュール一覧（`@vivliostyle/theme-base/<サブパス>` でインポート）:

| サブパス                                                                    | 内容                                            | CSS変数プレフィックス |
| --------------------------------------------------------------------------- | ----------------------------------------------- | --------------------- |
| （パッケージエントリ）                                                      | CSSリセット・変数の規定値・基本HTMLタグのスタイル | `--vs-`, `--vs--`     |
| `figure`                                                                    | 図の採番・相互参照                              | `--vs-figure--`       |
| `table`                                                                     | 表の採番・相互参照                              | `--vs-table--`        |
| `citation`                                                                  | 引用文献の採番・相互参照                        | `--vs-citation--`     |
| `listing`                                                                   | コードリストの採番・相互参照                    | `--vs-listing--`      |
| `equation`                                                                  | 数式の採番・相互参照                            | `--vs-equation--`     |
| `theorem`                                                                   | 定理の採番・相互参照                            | `--vs-theorem--`      |
| `appendix`                                                                  | 付録の採番・相互参照                            | `--vs-appendix--`     |
| `endnote`                                                                   | 後注                                            | `--vs-endnote--`      |
| `footnote`                                                                  | 脚注                                            | `--vs-footnote--`     |
| `footnote/external-links`                                                   | 外部リンクの脚注化                              | `--vs-footnote--`     |
| `page`                                                                      | ページメディア                                  | `--vs-page--`         |
| `section`                                                                   | 見出し番号・節参照                              | `--vs-section--`      |
| `toc`                                                                       | 目次                                            | `--vs-toc--`          |
| `math`                                                                      | 数式 (MathML / MathJax) の表示                  | `--vs-math--`         |
| `sidenote`                                                                  | 番号付き傍注                                    | `--vs-sidenote--`     |
| `prism`                                                                     | コードハイライト基盤                            | `--vs-prism--`        |
| `prism/theme-prism`                                                         | Prismデフォルトテーマ                           | `--vs-prism--`        |
| `prism/theme-okaidia`                                                       | Okaidiaテーマ                                   | `--vs-prism--`        |

詳細は [theme-baseのREADME](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-base#available-modules-and-css-variables) を参照してください。

### CSS変数のオーバーライド

theme-baseや各テーマが公開するCSS変数を `:root` で上書きすることで、テーマをカスタマイズできます。

```css
:root {
  /* フォント設定 */
  --vs-font-family: 'Noto Serif JP', serif;
  --vs-font-size: 10.5pt;

  /* 見出し */
  --vs--h1-font-size: 2em;
  --vs--heading-line-height: 1.4;

  /* 相互参照の共通カウンタスタイル */
  --vs-counter-style: upper-roman;

  /* ページヘッダ・フッタ */
  --vs-page--mbox-top-left-content: env(pub-title);
  --vs-page--mbox-top-right-content: env(doc-title);
  --vs-page--mbox-bottom-center-content: counter(page);
}
```

実際のテーマでの活用例として、[theme-techbook](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-techbook) はテーマ固有のCSS変数（`--vs-theme-<name>--*`）を公開しています:

```css
:root {
  --vs-theme-techbook--inline-code-color-bg: #ecf0f1;
  --vs-theme-techbook--inline-code-color-body: #34495e;
  --vs-theme-techbook--footnote-color-bg-on-screen: #e6f6d7;
  --vs-theme-techbook--image-resolution-for-figure-image: 300dpi;
}
```

### example/ ディレクトリの編集

`example/` にはテーマの適用例を示すサンプルMarkdownを配置します。

- 最低1つのMarkdownファイルが必要です
- [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm) 記法が利用できます
- テーマが対応する主要なスタイル（見出し、コードブロック、脚注、画像、数式等）を網羅する内容を推奨します

プレビューで動作確認:

```bash
npm run example:preview
```

## Themeを公開する

### 事前検証

公開前に `vivliostyle theme validate` を実行して、パッケージの妥当性を検証します。生成された雛形では `npm run validate` に割り当てられています。

```bash
npm run validate
```

検証項目:

| チェック         | 種別   | 内容                                                                             |
| ---------------- | ------ | --------------------------------------------------------------------------------- |
| スタイルロケータ | エラー | `vivliostyle.theme.style`、`style`、`main` のいずれかが設定されていること        |
| スタイルファイル | エラー | パッケージ内に実在すること（拡張子が `.css` でない場合は警告）                   |
| 作者情報         | 警告   | `vivliostyle.theme.author` または `author` が設定されていること                  |
| キーワード       | 警告   | `keywords` に `vivliostyle-theme` が含まれていること                             |
| 分類             | 警告   | `vivliostyle.theme.category` が上記の分類のいずれかであること                    |

### プレビュー確認

```bash
npm run example:preview
```

`vivliostyle.config.js` の設定に基づき、`example/` のサンプル原稿にテーマを適用した状態でプレビューが表示されます。

### package.jsonの必須フィールド

```json
{
  "name": "vivliostyle-theme-<name>",
  "main": "theme.css",
  "keywords": ["vivliostyle", "vivliostyle-theme"],
  "vivliostyle": {
    "theme": {
      "name": "Theme Display Name",
      "author": "Author Name",
      "style": "theme.css",
      "category": "misc",
      "topics": []
    }
  }
}
```

| フィールド                   | 必須 | 説明                                                        |
| ---------------------------- | ---- | ----------------------------------------------------------- |
| `vivliostyle.theme.style`    | ✅   | メインCSSファイルのパス                                     |
| `vivliostyle.theme.author`   | ✅   | テーマの作者名                                              |
| `vivliostyle.theme.name`     | —    | テーマの表示名                                              |
| `vivliostyle.theme.category` | —    | `novel` / `magazine` / `journal` / `report` / `misc`        |
| `vivliostyle.theme.topics`   | —    | テーマの用途を示すトピックの配列                            |
| `keywords`                   | —    | `"vivliostyle"` と `"vivliostyle-theme"` を含めることを推奨 |

詳細な仕様は [Vivliostyle Themeの仕様](./spec.md) を参照してください。

### npmへの公開

```bash
npm publish
```

公開後、テーマは以下から検索可能になります:

- [GitHub Topics: vivliostyle-theme](https://github.com/topics/vivliostyle-theme)
- [npm: vivliostyle-theme](https://www.npmjs.com/search?q=keywords%3Avivliostyle-theme)

### 公式テーマとして提案する

自作したテーマは、ぜひVivliostyle公式テーマとして提案してください。詳細は [公式Themeの採用](./official.md) を参照してください。
