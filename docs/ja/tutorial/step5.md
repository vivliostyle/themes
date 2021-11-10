<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [Step 5. 原稿ごとのスタイルの設定](#step-5-%E5%8E%9F%E7%A8%BF%E3%81%94%E3%81%A8%E3%81%AE%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%81%AE%E8%A8%AD%E5%AE%9A)
  - [スタイルの改善](#%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%81%AE%E6%94%B9%E5%96%84)
  - [テーマカラーの設定](#%E3%83%86%E3%83%BC%E3%83%9E%E3%82%AB%E3%83%A9%E3%83%BC%E3%81%AE%E8%A8%AD%E5%AE%9A)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Step 5. 原稿ごとのスタイルの設定

原稿ファイルごとにテーマカラーを設定してみましょう。

## スタイルの改善

まずは、全体的にもっと本らしい見た目にしてみましょう。

```scss {highlight: [6,'10-12',18,'23-24','29-40']}
// scss/_my_style.scss

// ...

// 各ページでインクリメント
// ページ上部に章ごとのタイトルを表示
@page {
  counter-increment: p;

  @top-center {
    content: string(doc-title);
  }
}

// 章タイトル
section > {
  h1 {
    border-top: 10pt solid black;

    &::before {
      content: '第 ' counter(chapter) ' 章';
      display: block;
      font-size: 80%;
      margin: 10pt auto;
    }
  }
}

// 著者名
.author {
  font-weight: bold;
  text-align: right;
  border-bottom: 10pt solid black;
  margin-bottom: 20pt;
}

// 全体
html {
  line-height: 2rem;
}
```

章タイトル部分にボーダーラインが表示されました。次の節からは、このボーダーラインの色を原稿ファイルごとに設定していきます。

![ちょっと古い教科書みたいですね](/assets/step5-ver1.png)

## テーマカラーの設定

では、原稿ファイルごとにテーマカラーを設定していきます。サンプル原稿を少し編集します。`---` で囲まれた [Frontmatter](https://vivliostyle.github.io/vfm/#/vfm#frontmatter) 部分に class を指定すると、html 要素と body 要素にその名前の class を付与することができます。この機能を使って、原稿ファイルごとに別々のスタイルを適用することができます。

```markdown {highlight: ['3-5']}
<!-- example/ch01.md -->

---

## class: natsume

# 吾輩は猫である。

...
```

```markdown {highlight: ['3-5']}
<!-- example/ch02.md -->

---

## class: akutagawa

# 羅生門

...
```

```scss {highlight: ['5-12']}
// scss/_my_style.scss

// ...

// テーマカラー
html.natsume {
  h1,
  .author {
    border-color: #d1307d;
  }
}

html.akutagawa {
  h1,
  .author {
    border-color: #24aae1;
  }
}
```

この方法を使えば、もちろん色だけでなく、原稿ファイルごとに文字のサイズや書体を変えることも可能です。

![たとえば、夏目さんはピンク、芥川さんは水色](/assets/step5-ver2.png)
