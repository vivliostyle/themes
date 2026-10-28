// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'Alice’s Adventures in Wonderland',
  language: 'en',
  size: 'A5',
  theme: ['alice.css'],
  entry: [
    'templates/alice/cover.md',
    'templates/alice/copyright.md',
    {
      // TODO: https://github.com/vivliostyle/vivliostyle-cli/issues/200
      rel: 'contents',
    },
    'templates/alice/ch01.md',
    'templates/alice/ch02.md',
    'templates/alice/ch03.md',
    'templates/alice/ch04.md',
    'templates/alice/ch05.md',
    'templates/alice/ch06.md',
    'templates/alice/ch07.md',
    'templates/alice/ch08.md',
    'templates/alice/ch09.md',
    'templates/alice/ch10.md',
    'templates/alice/ch11.md',
    'templates/alice/ch12.md',
    'templates/alice/contentinfo.md',
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
