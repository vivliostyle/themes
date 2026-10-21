// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: '電書協 ＥＰＵＢ ３ 制作ガイド　作品サンプル',
  language: 'ja',
  // size: 'A4',
  theme: '.',
  readingProgression: 'rtl',
  entry: [
    // "template/default/p-cover.md", // `cover:` を使う場合は不要
    'template/default/p-titlepage.md',
    'template/default/p-caution.md',
    {
      // `toc:` を使う場合は不要
      path: 'template/default/p-toc.md',
      rel: 'contents',
    },
    'template/default/p-001.md',
    'template/default/p-002.md',
    'template/default/p-cyushaku.md',
    'template/default/p-colophon.md',
  ],
  cover: 'template/default/assets/cover.jpg',
  // toc: {
  //   htmlPath: 'template/default/toc.html',
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
});
