module.exports = {
  language: 'en',
  size: 'A5',
  theme: 'sherlock.css',
  entry: [
    'example/sherlock/cover.md',
    'example/sherlock/copyright.md',
    {
      // TODO: https://github.com/vivliostyle/vivliostyle-cli/issues/200
      rel: 'contents',
    },
    'example/sherlock/ch01.md',
    'example/sherlock/ch02.md',
    'example/sherlock/ch03.md',
    'example/sherlock/ch04.md',
    'example/sherlock/ch05.md',
    'example/sherlock/ch06.md',
    'example/sherlock/ch07.md',
    'example/sherlock/ch08.md',
    'example/sherlock/ch09.md',
    'example/sherlock/ch10.md',
    'example/sherlock/ch11.md',
    'example/sherlock/ch12.md',
    'example/sherlock/contentinfo.md',
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
