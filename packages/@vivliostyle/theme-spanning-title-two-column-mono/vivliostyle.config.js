// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '学術誌論文ページ',
  theme: ['theme.css'],
  entry: ['example/academic-research.md'],
  output: 'book.pdf',
});
