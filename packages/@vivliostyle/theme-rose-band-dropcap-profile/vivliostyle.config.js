// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'エッセイアンソロジー（A4、複著者、色分け）',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/anthology-colorful-modern.md',
    'example/anthology-colorful-modern-02.md',
    'example/anthology-colorful-modern-03.md',
    'example/anthology-colorful-modern-04.md',
    'example/anthology-colorful-modern-05.md',
    'example/anthology-colorful-modern-06.md',
    'example/anthology-colorful-modern-07.md',
  ],
  output: 'book.pdf',
});
