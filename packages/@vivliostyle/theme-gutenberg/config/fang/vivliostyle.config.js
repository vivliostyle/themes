// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'White Fang',
  language: 'en',
  size: 'A5',
  theme: ['fang.css'],
  entry: [
    'templates/fang/cover.md',
    'templates/fang/copyright.md',
    {
      path: 'templates/fang/toc.md',
      rel: 'contents',
    },
    'templates/fang/ch01.md',
    'templates/fang/ch02.md',
    'templates/fang/ch03.md',
    'templates/fang/ch04.md',
    'templates/fang/ch05.md',
    'templates/fang/contentinfo.md',
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
