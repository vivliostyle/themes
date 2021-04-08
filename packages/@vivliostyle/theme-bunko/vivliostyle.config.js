module.exports = {
  language: 'ja',
  theme: 'theme.css',
  entry: [
    'example/bunko.md',
  ],
  output: [
    "book.pdf",
    {
      path: './book',
      format: 'webpub',
    },
  ],
}
