// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Advances in Mathematics傍線見出し版',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/advmath-elsevier.md'],
  output: 'book.pdf',
});
