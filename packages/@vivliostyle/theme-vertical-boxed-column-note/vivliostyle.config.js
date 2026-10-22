// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '茶碗の文化史',
  theme: ['theme.css'],
  entry: ['templates/default/cultural-shinsho-columns.md'],
  output: 'book.pdf',
});
