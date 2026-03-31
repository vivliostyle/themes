<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [Themeの開発](#theme%E3%81%AE%E9%96%8B%E7%99%BA)
  - [Themeを作成する](#theme%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)
  - [雛形をカスタマイズする](#%E9%9B%9B%E5%BD%A2%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B)
  - [Themeを公開する](#theme%E3%82%92%E5%85%AC%E9%96%8B%E3%81%99%E3%82%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Themeの開発

## Themeを作成する

### create-vivliostyle-themeによる雛形生成

`create-vivliostyle-theme` CLIを使って、テーマプロジェクトの雛形を生成します。

```bash
npm create vivliostyle-theme <theme-name>
```

対話形式で以下の項目を入力します。

| 項目 | 説明 |
|---|---|
| `description` | テーマの説明 |
| `author` | 作者名 |
| `email` | メールアドレス |
| `license` | ライセンス（MIT、Apache-2.0等） |
| `category` | テーマの分類（`novel` / `magazine` / `journal` / `report` / `misc`） |

実行後、`vivliostyle-theme-<theme-name>` ディレクトリが生成されます。

### 生成されるファイル構成

```
vivliostyle-theme-<name>/
├── .gitignore
├── package.json          # パッケージ定義（vivliostyle.theme 設定を含む）
├── README.md             # テーマの説明・使い方
├── theme.css             # テーマのメイン CSS
├── vivliostyle.config.js # プレビュー用の設定ファイル
└── example/
    └── default.md        # サンプル原稿（VFM 形式）
```

各ファイルの役割:

| ファイル | 役割 |
|---|---|
| `package.json` | テーマのメタ情報。`vivliostyle.theme` プロパティでテーマ名・作者・メインCSS・カテゴリを定義 |
| `theme.css` | テーマのスタイル定義本体。theme-baseの `@import` とCSS変数のカスタマイズが初期設定済み |
| `vivliostyle.config.js` | `vivliostyle preview` でテーマの動作確認に使用。entryに `example/default.md` を指定 |
| `example/default.md` | テーマ適用例を示すサンプルMarkdown。[VFM](https://vivliostyle.github.io/vfm/#/vfm) 記法に対応 |

## 雛形をカスタマイズする

### theme.cssの編集

生成直後の `theme.css` にはtheme-baseの全モジュールインポートとCSS変数のカスタマイズ例が含まれています。

```css
/* theme-base の全モジュールをインポート */
@import url(../@vivliostyle/theme-base/theme-all.css);

/* コードハイライト（Prism）を追加 */
@import url(../@vivliostyle/theme-base/css/lib/prism/base.css);
@import url(../@vivliostyle/theme-base/css/lib/prism/theme-okaidia.css);

:root {
  /* 基本スタイル */
  --vs-font-family: 'Times New Roman', serif;
  --vs-font-size: 12px;
  --vs--heading-line-height: 1.3;
  --vs--h1-font-size: 2.5em;

  /* 脚注 */
  --vs-footnote--call-content: '[' counter(footnote) ']';

  /* ページレイアウト */
  --vs-page--mbox-content-bottom-center: counter(page);
  --vs-page--mbox-content-top-left: env(doc-title);

  /* 目次 */
  --vs-toc--marker-margin-inline: 8rem;
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

theme-baseは機能ごとにモジュール分割されています。全モジュールが不要な場合は、`theme-all.css` の代わりに必要なモジュールのみをインポートできます。

```css
/* 基本モジュールのみ */
@import url(../@vivliostyle/theme-base/css/common/meta-properties.css);
@import url(../@vivliostyle/theme-base/css/common/reset.css);
@import url(../@vivliostyle/theme-base/css/common/basic.css);

/* 必要な機能モジュールを追加 */
@import url(../@vivliostyle/theme-base/css/partial/toc.css);
@import url(../@vivliostyle/theme-base/css/partial/footnote.css);
```

利用可能なモジュール一覧:

| カテゴリ | モジュール | CSS変数プレフィックス |
|---|---|---|
| common | `meta-properties.css` — ドキュメント全体のメタプロパティ | `--vs-` |
| common | `reset.css` — CSSリセット | — |
| common | `basic.css` — 基本HTMLタグのスタイル | `--vs--` |
| partial | `crossref.css` — 図表・引用の相互参照 | `--vs-crossref--` |
| partial | `endnote.css` — 後注 | `--vs-endnote--` |
| partial | `footnote.css` — 脚注 | `--vs-footnote--` |
| partial | `footnote-external-link.css` — 外部リンクの脚注化 | `--vs-footnote--` |
| partial | `page.css` — ページメディア | `--vs-page--` |
| partial | `section.css` — 見出し番号・節参照 | `--vs-section--` |
| partial | `toc.css` — 目次 | `--vs-toc--` |
| partial | `utility-classes.css` — ユーティリティクラス | — |
| lib | `prism/base.css` — コードハイライト基盤 | `--vs-prism--` |
| lib | `prism/theme-prism.css` — Prismデフォルトテーマ | `--vs-prism--` |
| lib | `prism/theme-okaidia.css` — Okaidiaテーマ | `--vs-prism--` |

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

  /* 相互参照のカウンタスタイル */
  --vs-crossref--counter-style: upper-roman;

  /* ページヘッダ・フッタ */
  --vs-page--mbox-content-top-left: env(pub-title);
  --vs-page--mbox-content-top-right: env(doc-title);
  --vs-page--mbox-content-bottom-center: counter(page);
}
```

実際のテーマでの活用例として、[theme-techbook](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-techbook) はテーマ固有のCSS変数（`--vs-theme--*`）を公開しています:

```css
:root {
  --vs-theme--anchor-color-body: #3498db;
  --vs-theme--blockquote-color-bg: #ecf0f1;
  --vs-theme--inline-code-color-bg: #ecf0f1;
  --vs-theme--image-resolution-for-figure-image: 300dpi;
  --vs-theme--page-top-left-content: env(pub-title);
  --vs-theme--page-bottom-content: counter(page);
}
```

### example/ ディレクトリの編集

`example/` にはテーマの適用例を示すサンプルMarkdownを配置します。

- 最低1つのMarkdownファイルが必要です
- [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm) 記法が利用できます
- テーマが対応する主要なスタイル（見出し、コードブロック、脚注、画像、数式等）を網羅する内容を推奨します

プレビューで動作確認:

```bash
npm run preview
```

## Themeを公開する

### 事前検証

公開前に `vivliostyle-theme-scripts validate` を実行して、パッケージの妥当性を検証します。

```bash
npm run validate
```

検証項目:

| チェック | 種別 | 内容 |
|---|---|---|
| スタイルロケータ | エラー | `vivliostyle.theme.style`、`style`、`main` のいずれかが設定されていること |
| 作者情報 | 警告 | `vivliostyle.theme.author` または `author` が設定されていること |

### プレビュー確認

```bash
npm run preview
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

| フィールド | 必須 | 説明 |
|---|---|---|
| `vivliostyle.theme.style` | ✅ | メインCSSファイルのパス |
| `vivliostyle.theme.author` | ✅ | テーマの作者名 |
| `vivliostyle.theme.name` | — | テーマの表示名 |
| `vivliostyle.theme.category` | — | `novel` / `magazine` / `journal` / `report` / `misc` |
| `vivliostyle.theme.topics` | — | テーマの用途を示すトピックの配列 |
| `keywords` | — | `"vivliostyle"` と `"vivliostyle-theme"` を含めることを推奨 |

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
