// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'アンソロジー・複数筆者対応',
  theme: ['theme.css'],
  entry: [
    'example/title-page.md',
    'example/anthology-multiauthor.md',
    'example/glass-garden-title.md',
    'example/glass-garden.md',
    'example/distant-thunder-title.md',
    'example/distant-thunder.md',
    'example/rusted-whistle-title.md',
    'example/rusted-whistle.md',
    'example/afterword.md',
  ],
  output: 'book.pdf',
});
