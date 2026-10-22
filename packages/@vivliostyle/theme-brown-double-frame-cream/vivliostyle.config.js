// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '同窓会報（エレガント）',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/alumni-elegant.md',
    'example/alumni-elegant-02.md',
    'example/alumni-elegant-03.md',
    'example/alumni-elegant-04.md',
    'example/alumni-elegant-05.md',
  ],
  output: 'book.pdf',
});
