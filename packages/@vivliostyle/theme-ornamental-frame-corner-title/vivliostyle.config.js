// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'アンソロジー・複数筆者対応',
  theme: ['theme.css'],
  entry: [
    'templates/default/title-page.md',
    'templates/default/anthology-multiauthor.md',
    'templates/default/glass-garden-title.md',
    'templates/default/glass-garden.md',
    'templates/default/distant-thunder-title.md',
    'templates/default/distant-thunder.md',
    'templates/default/rusted-whistle-title.md',
    'templates/default/rusted-whistle.md',
    'templates/default/afterword.md',
  ],
  output: 'book.pdf',
});
