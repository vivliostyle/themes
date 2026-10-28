// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'The Adventures of Sherlock Holmes',
  language: 'en',
  size: 'A5',
  theme: ['sherlock.css'],
  entry: [
    'templates/sherlock/cover.md',
    'templates/sherlock/copyright.md',
    {
      // TODO: https://github.com/vivliostyle/vivliostyle-cli/issues/200
      rel: 'contents',
    },
    'templates/sherlock/ch01.md',
    'templates/sherlock/ch02.md',
    'templates/sherlock/ch03.md',
    'templates/sherlock/ch04.md',
    'templates/sherlock/ch05.md',
    'templates/sherlock/ch06.md',
    'templates/sherlock/ch07.md',
    'templates/sherlock/ch08.md',
    'templates/sherlock/ch09.md',
    'templates/sherlock/ch10.md',
    'templates/sherlock/ch11.md',
    'templates/sherlock/ch12.md',
    'templates/sherlock/contentinfo.md',
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
