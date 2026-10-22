// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'オーディオ機器評価ページ',
  theme: ['theme.css'],
  entry: ['example/audio-equipment-review.md'],
  output: 'book.pdf',
});
