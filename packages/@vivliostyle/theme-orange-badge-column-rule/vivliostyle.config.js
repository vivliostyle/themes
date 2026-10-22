// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'トラベルコンパス 世界の歩き旅',
  theme: ['theme.css'],
  entry: ['example/aruki-aruiteku-style.md'],
  output: 'book.pdf',
});
