module.exports = {
  language: 'ja',
  theme: 'theme.css',
  entry: ['example/bunko.md'],
  size: '148mm,210mm',
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
