// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '灯下書房だより　合本　第二集',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/newsletter-collection.md',
    'example/newsletter-collection-02.md',
    'example/newsletter-collection-03.md',
    'example/newsletter-collection-04.md',
    'example/newsletter-collection-05.md',
    'example/newsletter-collection-06.md',
    'example/newsletter-collection-07.md',
    'example/newsletter-collection-08.md',
  ],
  output: 'book.pdf',
});
