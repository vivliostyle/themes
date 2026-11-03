// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '要素過密3段組要旨',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/dense-threecolumn.md'],
  output: 'book.pdf',
});
