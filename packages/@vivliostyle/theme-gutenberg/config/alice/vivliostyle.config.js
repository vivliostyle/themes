module.exports = {
  language: 'en',
  size: 'A5',
  theme: 'alice.css',
  entry: [
    'example/alice/cover.md',
    'example/alice/copyright.md',
    {
      // TODO: https://github.com/vivliostyle/vivliostyle-cli/issues/200
      rel: 'contents',
    },
    'example/alice/ch01.md',
    'example/alice/ch02.md',
    'example/alice/ch03.md',
    'example/alice/ch04.md',
    'example/alice/ch05.md',
    'example/alice/ch06.md',
    'example/alice/ch07.md',
    'example/alice/ch08.md',
    'example/alice/ch09.md',
    'example/alice/ch10.md',
    'example/alice/ch11.md',
    'example/alice/ch12.md',
    'example/alice/contentinfo.md',
  ],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
  toc: true,
  tocTitle: 'Contents',
};
