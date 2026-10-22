// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '月影拾遺',
  theme: ['theme.css'],
  entry: ['templates/default/bunko-endnote-commentary.md'],
  output: 'book.pdf',
});
