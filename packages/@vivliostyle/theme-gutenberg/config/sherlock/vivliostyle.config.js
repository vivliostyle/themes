// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'The Adventures of Sherlock Holmes',
  language: 'en',
  size: 'A5',
  theme: ['sherlock.css'],
  entry: [
    'template/sherlock/cover.md',
    'template/sherlock/copyright.md',
    {
      // TODO: https://github.com/vivliostyle/vivliostyle-cli/issues/200
      rel: 'contents',
    },
    'template/sherlock/ch01.md',
    'template/sherlock/ch02.md',
    'template/sherlock/ch03.md',
    'template/sherlock/ch04.md',
    'template/sherlock/ch05.md',
    'template/sherlock/ch06.md',
    'template/sherlock/ch07.md',
    'template/sherlock/ch08.md',
    'template/sherlock/ch09.md',
    'template/sherlock/ch10.md',
    'template/sherlock/ch11.md',
    'template/sherlock/ch12.md',
    'template/sherlock/contentinfo.md',
  ],
  output: [
    'sherlock.pdf',
    {
      path: './sherlock',
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
