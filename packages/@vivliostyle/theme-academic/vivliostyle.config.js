module.exports = {
  title: 'vivliostyle-theme-academic のサンプル',
  language: 'ja',
  size: 'A4',
  theme: 'theme.css',
  entry: [
    {
      path: 'example/fet.md',
    },
    {
      path: 'example/microcomputer.md',
    },
  ],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
