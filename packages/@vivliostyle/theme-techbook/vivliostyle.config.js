module.exports = {
  language: 'ja',
  theme: 'theme.css',
  entry: ['example/techbook.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
