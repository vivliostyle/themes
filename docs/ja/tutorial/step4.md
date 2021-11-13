<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Step 4. 目次の表示](#step-4-%E7%9B%AE%E6%AC%A1%E3%81%AE%E8%A1%A8%E7%A4%BA)
  - [目次の自動生成](#%E7%9B%AE%E6%AC%A1%E3%81%AE%E8%87%AA%E5%8B%95%E7%94%9F%E6%88%90)
  - [プレビュー](#%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Step 4. 目次の表示

ここまででページ番号と章番号を表示できました。次は目次です。

## 目次の自動生成

Vivliostyle には `<h1>` 見出しをもとに目次を自動生成する機能があります。`<h1>` 以外の見出しが必要な場合は自分で目次を作ることもできますが、今回はこの機能を使ってみましょう。

vivliostyle.config.js に以下の記述を加えます。すると、一番最初のページに目次が表示されるようになります。

```js {highlight:[6,10,11]}
// vivliostyle.config.js

module.exports = {
  // ...
  entry: [
    { rel: 'contents', theme: 'theme_toc.css' },
    'example/ch01.md',
    'example/ch02.md',
  ],
  toc: true,
  tocTitle: '目次',
  // ...
};
```

## プレビュー

続いて scss/theme_toc.scss という目次専用のスタイルファイルを作ります。ひとまず theme_print.scss と同様のスタイルを定義して、ページ番号をインクリメントしないようにしておきます。

```bash
$ touch scss/theme_toc.scss
```

```scss {highlight:['3-17']}
// scss/theme_toc.scss

@import 'theme_common';

@page {
  marks: crop cross;
  bleed: 3mm;

  @top-left {
    content: 'theme_print';
  }
}

// ページ番号をインクリメントしない
@page :nth(1) {
  counter-increment: none;
}
```

以下のような見た目になりました。

![シンプルな目次](./assets/step4-toc-ver1.png)

もうすこしシュッとした見た目にしてみましょう。まず、不要な部分を隠します。

```scss {highlight: ['7-27']}
// scss/theme_toc.scss

@import 'theme_common';

// ...

// 不要な部分を隠す
@page :left {
  @top-left {
    content: '';
  }
}
@page :right {
  @top-right {
    content: '';
  }
}
h1 {
  display: none;
}
h2 {
  text-indent: 0;
}
nav ol {
  padding: 0;
  list-style: none;
}
```

![素っ気ない目次](./assets/step4-toc-ver2.png)

目次にも対応するページ番号と章番号を表示してみましょう。

```scss {highlight: ['7-18']}
// scss/theme_toc.scss

// ...

nav ol {
  // ...
  li a {
    &::before {
      content: '第 ' target-counter(attr(href url), chapter) ' 章';
      margin-right: 1rem;
    }
    &::after {
      content: target-counter(attr(href url), p);
      float: right;
    }
  }
}
```

一気に本らしくなりましたね！

![便利な目次](./assets/step4-toc-ver3.png)
