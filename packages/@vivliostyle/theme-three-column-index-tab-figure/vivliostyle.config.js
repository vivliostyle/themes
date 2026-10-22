// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '樹葉観察図譜　第四章　葉のかたち',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/botanical-visual-glossary.md'],
  output: 'book.pdf',
});
