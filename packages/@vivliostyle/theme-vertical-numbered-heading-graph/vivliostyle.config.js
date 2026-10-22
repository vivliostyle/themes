// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '度量衡の近代',
  theme: ['theme.css'],
  entry: ['example/chuo-shinsho-academic.md'],
  output: 'book.pdf',
});
