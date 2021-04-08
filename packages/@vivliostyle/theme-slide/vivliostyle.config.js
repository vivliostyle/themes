module.exports = {
  language: 'ja',
  theme: 'theme.css',
  entry: ['example/slide.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
