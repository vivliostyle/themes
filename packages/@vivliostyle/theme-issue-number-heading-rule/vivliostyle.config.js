// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '灯下書房だより　合本　第二集',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/newsletter-collection.md',
    'templates/default/newsletter-collection-02.md',
    'templates/default/newsletter-collection-03.md',
    'templates/default/newsletter-collection-04.md',
    'templates/default/newsletter-collection-05.md',
    'templates/default/newsletter-collection-06.md',
    'templates/default/newsletter-collection-07.md',
    'templates/default/newsletter-collection-08.md',
  ],
  output: 'book.pdf',
});
