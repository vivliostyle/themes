// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '決算短信・速報（B5カラー強調）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/earnings-brief-compact.md'],
  output: 'book.pdf',
});
