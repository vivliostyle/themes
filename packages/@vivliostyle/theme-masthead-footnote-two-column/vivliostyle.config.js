// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '知環学術フォーラム　論文概要集 2027',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/academic-abstracts.md'],
  output: 'book.pdf',
});
