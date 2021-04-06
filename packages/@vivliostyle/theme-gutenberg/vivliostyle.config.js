module.exports = {
  language: 'en',
  size: 'A5',
  entry: [
    {
      rel: 'contents',
    },
    {
      title: 'Alice’s Adventures In Wonderland',
      path: 'example/Alice.md',
      theme: 'alice.css',
    },
    {
      title: 'White Fang',
      path: 'example/Fang.md',
      theme: 'fang.css',
    },
    {
      title: 'The Adventures of Sherlock Holmes',
      path: 'example/Sherlock.md',
      theme: 'sherlock.css',
    },
  ],
  output: [
    "book.pdf",
    {
      path: './book',
      format: 'webpub',
    },
  ],
  toc: true,
  vfm: {
    disableFormatHtml: true,
  },
}
