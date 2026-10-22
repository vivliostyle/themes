// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Tidal Sediment Dynamics in Post-Glacial Estuaries',
  theme: ['theme.css'],
  entry: [
    'example/01-title-page.md',
    'example/02-declaration.md',
    'example/03-abstract.md',
    'example/04-acknowledgements.md',
    'example/05-contents.md',
    'example/06-introduction.md',
    'example/07-literature-review.md',
    'example/08-methodology.md',
    'example/09-results.md',
    'example/10-discussion.md',
    'example/11-conclusion.md',
    'example/12-references.md',
  ],
  output: 'book.pdf',
});
