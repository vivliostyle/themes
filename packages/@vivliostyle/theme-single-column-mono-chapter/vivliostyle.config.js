// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Tidal Sediment Dynamics in Post-Glacial Estuaries',
  theme: ['theme.css'],
  entry: [
    'templates/default/01-title-page.md',
    'templates/default/02-declaration.md',
    'templates/default/03-abstract.md',
    'templates/default/04-acknowledgements.md',
    'templates/default/05-contents.md',
    'templates/default/06-introduction.md',
    'templates/default/07-literature-review.md',
    'templates/default/08-methodology.md',
    'templates/default/09-results.md',
    'templates/default/10-discussion.md',
    'templates/default/11-conclusion.md',
    'templates/default/12-references.md',
  ],
  output: 'book.pdf',
});
