// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'White Fang',
  language: 'en',
  size: 'A5',
  theme: ['fang.css'],
  entry: [
    'template/fang/cover.md',
    'template/fang/copyright.md',
    {
      path: 'template/fang/toc.md',
      rel: 'contents',
    },
    'template/fang/ch01.md',
    'template/fang/ch02.md',
    'template/fang/ch03.md',
    'template/fang/ch04.md',
    'template/fang/ch05.md',
    'template/fang/contentinfo.md',
  ],
  output: [
    'fang.pdf',
    {
      path: './fang',
      format: 'webpub',
    },
  ],
  copyAsset: {
    excludes: ['alice/**', 'fang/**', 'sherlock/**'],
  },
});
