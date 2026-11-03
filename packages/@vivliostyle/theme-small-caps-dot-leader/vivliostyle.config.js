// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'デザート・パティスリーメニュー',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/dessert-patisserie.md'],
  output: 'book.pdf',
});
