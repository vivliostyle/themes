module.exports = {
  title: '電書協 ＥＰＵＢ ３ 制作ガイド　作品サンプル',
  language: 'ja',
  // size: 'A4',
  theme: '.',
  readingProgression: 'rtl',
  entry: [
    // "example/p-cover.md", // `cover:` を使う場合は不要
    'example/p-titlepage.md',
    'example/p-caution.md',
    {
      path: 'example/p-toc.md', // `toc:` を使う場合は不要
      rel: 'contents',
    },
    'example/p-001.md',
    'example/p-002.md',
    'example/p-cyushaku.md',
    'example/p-colophon.md',
  ],
  cover: 'example/assets/cover.jpg',
  // toc: {
  //   htmlPath: 'example/toc.html',
  //   title: '目次',
  //   sectionDepth: 2,
  // },
  workspaceDir: '.vivliostyle',
  output: [
    'book.pdf',
    'book.epub',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
