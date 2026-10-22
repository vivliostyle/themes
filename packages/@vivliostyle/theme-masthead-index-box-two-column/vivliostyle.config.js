// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '学術ニュース誌',
  theme: ['theme.css'],
  entry: ['example/academic-news.md'],
  output: 'book.pdf',
});
