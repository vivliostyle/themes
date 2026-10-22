// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '四六判コンサルティングガイド（単行本風）',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/book-style-consulting.md'],
  output: 'book.pdf',
});
