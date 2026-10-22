// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'オーディオ機器評価ページ',
  theme: ['theme.css'],
  entry: ['templates/default/audio-equipment-review.md'],
  output: 'book.pdf',
});
