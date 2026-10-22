// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'エッセイアンソロジー（A4、複著者、色分け）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/anthology-colorful-modern.md',
    'templates/default/anthology-colorful-modern-02.md',
    'templates/default/anthology-colorful-modern-03.md',
    'templates/default/anthology-colorful-modern-04.md',
    'templates/default/anthology-colorful-modern-05.md',
    'templates/default/anthology-colorful-modern-06.md',
    'templates/default/anthology-colorful-modern-07.md',
  ],
  output: 'book.pdf',
});
