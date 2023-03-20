module.exports = {
  language: 'ja',
  theme: 'theme.css',
  size: '182mm,257mm',
  entry: ['example/techbook.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
