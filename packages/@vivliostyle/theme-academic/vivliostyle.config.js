module.exports = {
  language: 'ja',
  size: 'A4',
  entry: [
    {
      path: 'example/fet.md',
      theme: 'theme_common.css',
    },
    {
      path: 'example/microcomputer.md',
      theme: 'theme_cover.css',
    },
  ],
  output: [
    "book.pdf",
    {
      path: './book',
      format: 'webpub',
    },
  ],
  vfm: {
    hardLineBreaks: true,
  }
}
