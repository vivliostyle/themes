// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '同窓会報（エレガント）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/alumni-elegant.md',
    'templates/default/alumni-elegant-02.md',
    'templates/default/alumni-elegant-03.md',
    'templates/default/alumni-elegant-04.md',
    'templates/default/alumni-elegant-05.md',
  ],
  output: 'book.pdf',
});
