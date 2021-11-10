# Step 6. 完成！

おつかれさまです！　これで Theme が完成しました。

## Theme を公開したい場合

npm package として公開する場合は、[仕様](/ja/spec)に従ってください。

`yarn publish` して npm package として公開すると、Create Book で出版物を作る際に、以下のように Theme を選択できるようになります。

```bash
$ yarn create book test
yarn create v1.22.10
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-book@0.5.0" with binaries:
      - create-book
? description description
? author name
? author email
? license AGPL-3.0
? choose theme (Use arrow keys)
❯ @vivliostyle/theme-bunko - 文庫用のテーマ
  @vivliostyle/theme-slide - Slide theme
  @vivliostyle/theme-techbook - Techbook (技術同人誌) theme
  @vivliostyle/theme-academic - Academic theme
  vivliostyle-theme-dnd-5e-phb - D&D 5e PHB theme for Vivliostyle
  // ここにあなたの Theme が表示されます！
(Move up and down to reveal more choices)
```

## もっとスタイルを編集したい場合

- [Vivliostyle がサポートする CSS 機能](https://docs.vivliostyle.org/#/ja/supported-css-features)
  - スタイルシート内で使える値、セレクタ、@ルール、メディアクエリ、プロパティなどが一覧でまとまっています。
- 公式ブログ記事
  - 直近で使えるようになった機能などが紹介されています。
  - 2021 年 11 月現在は以下のブログ記事がおすすめです。
    - [最近の Vivliostyle.js の進化について](https://vivliostyle.org/ja/blog/2021/10/12/recent-vivliostyle-js-updates/)
    - [Vivliostyle の最新アップデート — CLI 改良と CSS Paged Media サポートの充実](https://vivliostyle.org/ja/blog/2021/04/21/vivliostyle-improved-css-paged-media-support/)
- Vivliostyle Core のテストケース
  - テストケースは Vivliostyle の使用例として良いサンプルになっています。CSS 組版でどのようなことができるかに興味があれば、是非チェックしてみてください。
    - [テストケース一覧](https://raw.githack.com/vivliostyle/vivliostyle.js/master/packages/core/test/files/)
    - [テストケースに対応する HTML/CSS のセット一覧](https://github.com/vivliostyle/vivliostyle.js/tree/master/packages/core/test/files)
