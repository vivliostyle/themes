// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'DENSHI-BUHIN SOUGOU CATALOG 2026 \u2014 MIYABI SEMICONDUCTOR CORP.',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/electronics-parts.md'],
  output: 'book.pdf',
});
