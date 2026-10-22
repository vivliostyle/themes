// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'ポケット野鳥図鑑フォーマット',
  theme: ['theme.css'],
  entry: ['example/bird-pocket-practical.md'],
  output: 'book.pdf',
});
