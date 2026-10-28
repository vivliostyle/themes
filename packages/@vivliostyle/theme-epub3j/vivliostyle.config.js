// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: '電書協 ＥＰＵＢ ３ 制作ガイド　作品サンプル',
  language: 'ja',
  // size: 'A4',
  theme: '.',
  readingProgression: 'rtl',
  entry: [
    // "templates/default/p-cover.md", // `cover:` を使う場合は不要
    'templates/default/p-titlepage.md',
    'templates/default/p-caution.md',
    {
      // `toc:` を使う場合は不要
      path: 'templates/default/p-toc.md',
      rel: 'contents',
    },
    'templates/default/p-001.md',
    'templates/default/p-002.md',
    'templates/default/p-cyushaku.md',
    'templates/default/p-colophon.md',
  ],
  cover: 'templates/default/assets/cover.jpg',
  // toc: {
  //   htmlPath: 'templates/default/toc.html',
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
