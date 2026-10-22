// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'カードゲームルール・グリッド表示',
  theme: ['theme.css'],
  entry: ['example/cardgame-grid.md'],
  output: 'book.pdf',
});
