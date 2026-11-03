// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'EDINET形式・有価証券報告書（2段組）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/edinet-formal-two-column.md'],
  output: 'book.pdf',
});
