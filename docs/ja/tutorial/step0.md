<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [はじめに](#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
  - [バージョン情報](#%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E6%83%85%E5%A0%B1)
  - [チュートリアルの設定](#%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB%E3%81%AE%E8%A8%AD%E5%AE%9A)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# はじめに

このチュートリアルでわかることは以下の通りです。

- オリジナルの Theme の作り方
- [create-vivliostyle-theme][] の使い方
- 組版用の CSS の書き方
  - カウンタ
  - 見出し
  - 目次
  - など……

CSS やサンプル原稿などの具体的な部分は Theme ごとに変わりますが、作成手順はどの Theme も同じです。なお、このチュートリアルで作成する Theme の完成品は [yamasy1549/vivliostyle-theme-my-doujin](https://github.com/yamasy1549/vivliostyle-theme-my-doujin) にあります。

## バージョン情報

- [create-vivliostyle-theme][]: 0.4.0
- [@vivliostyle/cli](https://github.com/vivliostyle/vivliostyle-cli): 4.3.2
- [@vivliostyle/vfm](https://github.com/vivliostyle/vfm/): 1.0.2

## チュートリアルの設定

今回作るのは、複数人の書き手による小説合同誌のための Theme です。執筆者は複数人おり、1 人が 1 章分（1 つの Markdown 原稿ファイル）を担当することになっています。合同誌制作にあたって、執筆者たちから次のような要望を受けています。

- 全体を通した**ページ番号**、**章番号**がほしい
- **目次**がほしい
- 見た目は統一するが、章（原稿ファイル）ごとに**テーマカラー**を変えたい

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme

このチュートリアルは、[Vivliostyle で本を作ろう Vol.5](https://vivliostyle.org/ja/make-books-with-vivliostyle/#vivliostyle-%E3%81%A7%E6%9C%AC%E3%82%92%E4%BD%9C%E3%82%8D%E3%81%86-vol52021%E5%B9%B47%E6%9C%8811%E6%97%A5) の[Vivliostyle Theme のつくりかた](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol5/content/yamasy/index.html)をもとにしています。
