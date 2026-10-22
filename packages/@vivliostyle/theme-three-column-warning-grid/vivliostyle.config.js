// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'アレルギー対応レシピ・成分表示厳密',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/allergy-free-strict.md', 'example/station-controls.md'],
  output: 'book.pdf',
});
