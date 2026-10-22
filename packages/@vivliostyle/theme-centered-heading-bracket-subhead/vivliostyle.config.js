// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '判例集（民事型）',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/case-law-civil-cases.md'],
  output: 'book.pdf',
});
