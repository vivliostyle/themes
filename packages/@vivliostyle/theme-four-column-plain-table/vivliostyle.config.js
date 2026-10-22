// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'DENSHI-BUHIN SOUGOU CATALOG 2026 \u2014 MIYABI SEMICONDUCTOR CORP.',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/electronics-parts.md'],
  output: 'book.pdf',
});
