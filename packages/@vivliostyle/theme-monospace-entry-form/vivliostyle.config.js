// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Fishing Log',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/fishing-log.md'],
  output: 'book.pdf',
});
