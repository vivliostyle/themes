module.exports = {
  language: 'en',
  theme: 'theme_print.css',
  entry: ['example/default.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
