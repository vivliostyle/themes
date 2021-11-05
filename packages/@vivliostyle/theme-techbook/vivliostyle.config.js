module.exports = {
  language: 'ja',
  theme: 'theme_print.css',
  entry: ['example/techbook.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
