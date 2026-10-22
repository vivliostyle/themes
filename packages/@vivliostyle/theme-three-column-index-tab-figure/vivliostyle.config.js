// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '樹葉観察図譜　第四章　葉のかたち',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/botanical-visual-glossary.md'],
  output: 'book.pdf',
});
