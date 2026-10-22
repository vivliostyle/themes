// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Fishing Log',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/fishing-log.md'],
  output: 'book.pdf',
});
