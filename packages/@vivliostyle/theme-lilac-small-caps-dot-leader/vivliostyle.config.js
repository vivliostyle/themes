// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'デザート・パティスリーメニュー',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/dessert-patisserie.md'],
  output: 'book.pdf',
});
