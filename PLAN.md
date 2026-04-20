# Vivliostyle Themes ドキュメント拡充 開発計画

> ブランチ: `docs/update-theme-guides`
> 作成日: 2026-03-31

## 概要

現在の `docs` はテーマ仕様（spec）・公式採用ガイドライン（official）・ギャラリー（gallery）のみで、**「テーマの使い方」と「テーマの作り方」に関する実用的なガイドが欠如**している。これらを新規ページとして追加し、既存ページのナビゲーション・SCSS 言及の修正も行う。日本語版を主として作成し、英語版も同時に整備する。

本リポジトリは `docs2.vivliostyle.org` の submodule であるため、最終的にはドキュメントサイト側の統合作業（Phase 4）も必要。

---

## 現状の課題

| # | 課題 | 詳細 |
|---|------|------|
| 1 | 使い方ガイドがない | テーマのインストール・適用方法を説明するドキュメントが存在しない |
| 2 | 作り方ガイドが空 | `docs/ja/development.md` は見出しのみのスタブ。英語版には該当ファイル自体がない |
| 3 | ツール説明がない | `create-vivliostyle-theme` と `vivliostyle-theme-scripts`（preview/validate）の使い方が docs に未記載 |
| 4 | theme-base の説明がない | モジュール構成や CSS 変数によるカスタマイズ方法が docs に書かれていない |
| 5 | ナビゲーションが貧弱 | README.md/index.md のリンク構成が最小限で、新ページへの導線がない |
| 6 | SCSS 言及が残存 | spec.md（英語・日本語）に「SCSSなどの拡張スタイルシート」への言及があるが、実態は全テーマがプレーン CSS＋CSS 変数ベースに移行済み |

---

## 対象ファイル一覧

### 新規作成（themes リポジトリ）

| ファイル | 内容 |
|----------|------|
| `docs/ja/usage.md` | テーマの使い方ガイド（日本語版） |
| `docs/usage.md` | テーマの使い方ガイド（英語版） |
| `docs/development.md` | テーマ開発ガイド（英語版） |

### 修正（themes リポジトリ）

| ファイル | 内容 |
|----------|------|
| `docs/ja/spec.md` | L148: SCSS 言及を CSS 変数に書き換え |
| `docs/spec.md` | L150: SCSS 言及を CSS 変数に書き換え |
| `docs/ja/development.md` | 空スタブを実体化（テーマ開発ガイド・日本語版） |
| `docs/ja/README.md` | ナビゲーション追加 |
| `docs/ja/index.md` | ナビゲーション追加（README.md と同内容） |
| `docs/README.md` | ナビゲーション追加（英語版） |
| `docs/index.md` | ナビゲーション追加（英語版・README.md と同内容） |
| `docs/ja/gallery.md` | カスタマイズ情報の追記（任意） |
| `docs/gallery.md` | カスタマイズ情報の追記（任意） |

### 修正（docs2.vivliostyle.org リポジトリ — Phase 4）

| ファイル | 内容 |
|----------|------|
| `submodules/themes` | submodule 参照を最新コミットに更新 |
| `vivliostyle.config-themes-ja.js` | entry に `usage` ページを追加 |
| `vivliostyle.config-themes-en.js` | entry に `usage` / `development` ページを追加 |

### 参照元（コンテンツソース）

| ファイル | 参照内容 |
|----------|----------|
| `packages/create-vivliostyle-theme/src/cli.ts` | CLI の動作・カテゴリ選択肢 |
| `packages/create-vivliostyle-theme/templates/default/` | テンプレート構成 |
| `packages/vivliostyle-theme-scripts/src/cli.ts` | preview / validate コマンド |
| `packages/vivliostyle-theme-scripts/src/index.ts` | `validatePackage()` のチェック項目 |
| `packages/@vivliostyle/theme-base/README.md` | theme-base のモジュール説明・CSS 変数 |
| 各テーマの `README.md` | CSS 変数カスタマイズ例 |

---

## Phase 0: 既存ドキュメントの修正（SCSS → CSS 変数）

### 対象

- `docs/ja/spec.md` L148
- `docs/spec.md` L150

### 変更内容

**日本語版（現在）:**
> テーマのスタイルを定義したスタイルシートを含めてください。複雑なテーマを作成するために SCSS などの拡張スタイルシートを任意で使用することもできますが、実際の npm package には CSS にビルドした結果を含めるようにしてください。

**日本語版（変更後）:**
> テーマのスタイルを定義したスタイルシートを含めてください。CSS カスタムプロパティ（CSS 変数）を活用することで、ユーザーがテーマのスタイルを柔軟にカスタマイズできるようにすることを推奨します。

**英語版（現在）:**
> Include the stylesheet that defines the theme's styles. You can optionally use extended stylesheets like SCSS to create complex themes, but ensure to include the compiled CSS result in the actual npm package.

**英語版（変更後）:**
> Include the stylesheet that defines the theme's styles. Using CSS custom properties (CSS variables) is recommended so that users can flexibly customize the theme's styles.

### 理由

- リポジトリ内に `.scss` ファイルは一切存在しない
- 全テーマが CSS 変数（`--vs-*`）ベースに移行済み
- ドキュメントを実態に合わせる

---

## Phase 1: テーマの使い方ガイド（新規作成）

### 1-1. `docs/ja/usage.md` — 日本語版

以下のセクション構成で作成する:

#### テーマとは

- Vivliostyle Theme の概要説明
- テーマを使うメリット（スタイルの統一・簡単な切り替え）

#### テーマのインストール

- npm パッケージとしてインストール:
  ```bash
  npm install @vivliostyle/theme-techbook
  ```

#### テーマの指定方法

- `vivliostyle.config.js` での設定:
  ```js
  module.exports = {
    theme: '@vivliostyle/theme-techbook',
  };
  ```
- 複数テーマ・特定 CSS ファイルの指定方法:
  ```js
  theme: {
    specifier: '@vivliostyle/theme-gutenberg',
    import: 'alice.css',
  }
  ```

#### CSS 変数によるカスタマイズ

- `--vs-*` 命名規則の概要
- カスタマイズ用 CSS ファイルでのオーバーライド例:
  ```css
  :root {
    --vs--color-body: #333;
    --vs--font-size-body: 10.5pt;
  }
  ```
- theme-base の CSS 変数カテゴリ: common（`--vs--*`）、module 別（`--vs-{module}--*`）

#### 公式テーマの選び方

- 用途別一覧表（テーマ名 / 用途 / 特徴）
- 詳細は [ギャラリー](./gallery.md) を参照

#### theme-base を直接使う

- `theme-all.css`（全モジュール込み）vs `theme-basic.css`（基本のみ）の違い
- 詳細は [theme-base README](../../packages/@vivliostyle/theme-base/README.md) を参照

### 1-2. `docs/usage.md` — 英語版

上記日本語版と同内容を英語で作成。

---

## Phase 2: テーマの作り方ガイド（既存スタブの拡充 + 英語版新規）

### 2-1. `docs/ja/development.md` — 日本語版（既存スタブを拡充）

以下のセクション構成で作成する:

#### Theme を作成する

- `create-vivliostyle-theme` CLI の使い方:
  ```bash
  npm create vivliostyle-theme <theme-name>
  ```
- 対話で聞かれる内容: description, author, email, license, **category**（`novel` / `magazine` / `journal` / `report` / `misc`）
- 生成されるファイル構成:
  ```
  vivliostyle-theme-<name>/
  ├── .gitignore
  ├── package.json
  ├── README.md
  ├── theme.css
  ├── vivliostyle.config.js
  └── example/
  ```
- 各ファイルの役割の簡潔な説明

#### 雛形をカスタマイズする

- **theme.css の編集**
  - ページ設定（`@page` ルール）
  - 見出し・段落等の基本スタイル
- **theme-base の活用**
  - `@import` による部分モジュールの取り込み:
    ```css
    @import '@vivliostyle/theme-base/css/common/meta-properties.css';
    @import '@vivliostyle/theme-base/css/common/basic.css';
    @import '@vivliostyle/theme-base/css/partial/toc.css';
    ```
  - 利用可能モジュール一覧（common / partial / lib）
- **CSS 変数のオーバーライド**
  - `--vs-*` 変数を `:root` で上書きする方法
  - 実際のテーマ（theme-techbook 等）での具体例
- **example/ の編集**
  - サンプル Markdown の作成（VFM 対応）
  - プレビュー確認

#### Theme を公開する

- **事前検証**:
  ```bash
  vivliostyle-theme validate
  ```
  - チェック項目: `vivliostyle.theme.style` / `style` / `main` の存在、`author` の存在
- **プレビュー確認**:
  ```bash
  vivliostyle-theme preview theme.css
  ```
- **package.json の必須フィールド**:
  - `keywords`: `["vivliostyle", "vivliostyle-theme"]`
  - `vivliostyle.theme.style`: メイン CSS ファイルパス（必須）
  - `vivliostyle.theme.author`: 作者名（必須）
  - `vivliostyle.theme.category`: カテゴリ（任意）
  - `vivliostyle.theme.topics`: トピックス（任意）
  - 詳細は [仕様](./spec.md) を参照
- **npm への公開**:
  ```bash
  npm publish
  ```
- **公式テーマとして提案する場合**: [公式 Theme の採用](./official.md) を参照

### 2-2. `docs/development.md` — 英語版（新規）

上記日本語版と同内容を英語で作成。

---

## Phase 3: 既存ページの整備

### 3-1. ナビゲーション更新

**`docs/ja/README.md` / `docs/ja/index.md`（変更後）:**

```markdown
# Vivliostyle Themes

![Vivliostyle Themes のロゴ](../assets/themes-logo.jpg)

Vivliostyle Theme は、Vivliostyle で出版物を作る際に使うスタイルテーマです。Vivliostyle Themes を使うことで簡単に出版物のスタイルを変更することができます。

- [テーマの使い方](./usage.md)
- [テーマの開発](./development.md)
- [Vivliostyle Theme の仕様](./spec.md)

- ### 運用ガイドライン

  - [公式 Theme の採用](./official.md)
  - [Vivliostyle Themes ギャラリー](./gallery.md)
```

**`docs/README.md` / `docs/index.md`（変更後）:**

```markdown
# Vivliostyle Themes

![Vivliostyle Themes logo](./assets/themes-logo.jpg)

Vivliostyle Theme is a style theme used for creating publications with Vivliostyle. With Vivliostyle Themes, you can effortlessly change the style of your publications.

- [Using Themes](./usage.md)
- [Developing Themes](./development.md)
- [Spec of Vivliostyle Theme](./spec.md)

- ### Operational Guidelines

  - [Adoption of the Official Theme](./official.md)
  - [Vivliostyle Themes Gallery](./gallery.md)
```

### 3-2. gallery.md の更新（任意）

- 各テーマエントリに「CSS 変数でカスタマイズ可能」の情報を追記検討
- 各テーマの README へのリンクを明示

---

## Phase 4: docs2.vivliostyle.org への統合

### 4-1. themes リポジトリ

- Phase 0〜3 の成果を `docs/update-theme-guides` ブランチでコミット
- PR を作成し、レビュー後に `main` へマージ

### 4-2. docs2.vivliostyle.org リポジトリ

1. **submodule 参照の更新**:
   ```bash
   cd docs2.vivliostyle.org
   git submodule update --remote submodules/themes
   ```

2. **`vivliostyle.config-themes-ja.js`** — entry に usage ページを追加:
   ```js
   entry: [
     'dist/ja/themes/index.html',
     'dist/ja/themes/usage/index.html',      // 追加
     'dist/ja/themes/development/index.html', // 既存
     'dist/ja/themes/official/index.html',
     'dist/ja/themes/gallery/index.html',
     'dist/ja/themes/spec/index.html',
   ],
   ```

3. **`vivliostyle.config-themes-en.js`** — entry に usage / development を追加:
   ```js
   entry: [
     'dist/en/themes/index.html',
     'dist/en/themes/usage/index.html',       // 追加
     'dist/en/themes/development/index.html',  // 追加
     'dist/en/themes/official/index.html',
     'dist/en/themes/gallery/index.html',
     'dist/en/themes/spec/index.html',
   ],
   ```

4. **ルーティング確認**: Astro の動的ルーティング（`src/pages/{ja,en}/themes/[...slug].astro`）が submodule の新ファイルを自動認識するか確認

5. **ローカル確認 → PR → マージ → デプロイ**:
   ```bash
   npm run dev  # ローカルで確認
   ```
   GitHub Actions で `docs.vivliostyle.org` に自動デプロイ

---

## 検証チェックリスト

- [ ] Phase 0: spec.md の SCSS 言及が CSS 変数に正しく書き換わっていること
- [ ] Phase 1: usage.md 内の相対リンクが正しく機能すること
- [ ] Phase 1: 日本語版と英語版で内容の対応が取れていること
- [ ] Phase 2: `create-vivliostyle-theme` CLI の手順が記載通りに動作すること
- [ ] Phase 2: `vivliostyle-theme-scripts validate` / `preview` の記載が実動作と一致すること
- [ ] Phase 3: README.md/index.md からの新ページへのリンクが正しいこと
- [ ] Phase 4: docs2.vivliostyle.org で `npm run dev` し新ページが正しく表示されること
- [ ] Phase 4: `[...slug].astro` ルーティングが新規 .md を自動認識すること
- [ ] Phase 4: vivliostyle.config の entry 追加後、PDF 生成が正常に動作すること

---

## 判断事項メモ

| 判断 | 理由 |
|------|------|
| 日本語版を主、英語版も同時整備 | 日本語コミュニティが主要ターゲット |
| usage.md は新規ファイルとして分離 | spec.md は仕様書であり初心者向けガイドとは性質が異なる |
| development.md のファイル名を維持 | 既存の日本語スタブをそのまま活用 |
| spec.md の SCSS 言及は CSS 変数に置換 | SCSS ファイルは全パッケージから完全に除去済み |
| docs2.vivliostyle.org 統合を最終ゴール | submodule 更新 + config 更新 + デプロイまで完了して初めてゴール |

## 決定事項（旧・未決定事項）

1. **リファレンス形式を採用**: usage.md / development.md はリファレンス（項目別解説）形式で書く。チュートリアル形式のガイドは別途 [vivliostyle.org のチュートリアル](https://github.com/vivliostyle/vivliostyle.org/pull/171) として整備中のため、本 docs ではリファレンスに徹する。
2. **スクリーンショット/キャプチャを追加する**: 主要ステップにキャプチャを追加（`docs/assets/captures/` に配置）。
3. **theme-base 解説は概要レベル**: usage.md では概要レベルに留め、詳細は theme-base の README へリンクする。
