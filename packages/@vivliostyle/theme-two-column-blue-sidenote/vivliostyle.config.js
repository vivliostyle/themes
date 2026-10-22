// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'ACM SIGCHI拡張アブストラクト',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/acm-extended.md'],
  output: 'book.pdf',
});
