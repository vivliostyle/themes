// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'ACM TOPLAS言語システム誌',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/acm-toplas.md'],
  output: 'book.pdf',
});
