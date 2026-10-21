// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'Alice’s Adventures in Wonderland',
  language: 'en',
  size: 'A5',
  theme: ['alice.css'],
  entry: [
    'template/alice/cover.md',
    'template/alice/copyright.md',
    {
      // TODO: https://github.com/vivliostyle/vivliostyle-cli/issues/200
      rel: 'contents',
    },
    'template/alice/ch01.md',
    'template/alice/ch02.md',
    'template/alice/ch03.md',
    'template/alice/ch04.md',
    'template/alice/ch05.md',
    'template/alice/ch06.md',
    'template/alice/ch07.md',
    'template/alice/ch08.md',
    'template/alice/ch09.md',
    'template/alice/ch10.md',
    'template/alice/ch11.md',
    'template/alice/ch12.md',
    'template/alice/contentinfo.md',
  ],
  output: [
    'alice.pdf',
    {
      path: './alice',
      format: 'webpub',
    },
  ],
  copyAsset: {
    excludes: ['alice/**', 'fang/**', 'sherlock/**'],
  },
  toc: {
    title: 'Contents',
  },
});
