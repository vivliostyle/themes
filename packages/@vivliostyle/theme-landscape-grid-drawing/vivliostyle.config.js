// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '建築展図録（技術図面レイアウト）',
  theme: ['theme.css'],
  entry: [
    'example/foreword.md',
    'example/architect.md',
    'example/tomoo-library.md',
    'example/kuriuno-hall.md',
    'example/architecture-technical.md',
    'example/hinakura-shelter.md',
  ],
  output: 'book.pdf',
});
