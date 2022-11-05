module.exports = {
  language: 'ja',
  theme: 'theme-all.css',
  entry: ['example/default.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
