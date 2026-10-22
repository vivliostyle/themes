// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '建築展図録（技術図面レイアウト）',
  theme: ['theme.css'],
  entry: [
    'templates/default/foreword.md',
    'templates/default/architect.md',
    'templates/default/tomoo-library.md',
    'templates/default/kuriuno-hall.md',
    'templates/default/architecture-technical.md',
    'templates/default/hinakura-shelter.md',
  ],
  output: 'book.pdf',
});
