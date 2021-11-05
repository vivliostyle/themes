module.exports = {
  language: 'ja',
  size: 'A4',
  theme: 'theme_print.css',
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
