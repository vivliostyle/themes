module.exports = {
  language: 'en',
  size: 'A5',
  theme: 'fang.css',
  entry: [
    'example/fang/cover.md',
    'example/fang/copyright.md',
    {
      path: 'example/fang/toc.md',
      rel: 'contents',
    },
    'example/fang/ch01.md',
    'example/fang/ch02.md',
    'example/fang/ch03.md',
    'example/fang/ch04.md',
    'example/fang/ch05.md',
    'example/fang/contentinfo.md',
  ],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
