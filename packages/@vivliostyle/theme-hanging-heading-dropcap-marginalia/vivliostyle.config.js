// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '四六判コンサルティングガイド（単行本風）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/book-style-consulting.md'],
  output: 'book.pdf',
});
