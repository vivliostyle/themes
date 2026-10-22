// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'アレルギー対応レシピ・成分表示厳密',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/allergy-free-strict.md',
    'templates/default/station-controls.md',
  ],
  output: 'book.pdf',
});
