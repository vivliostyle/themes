// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Principles of Microeconomic Analysis',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/econ-data-graph.md'],
  output: 'book.pdf',
  // The HTML formatting of VFM drops whitespace right after the empty <a> used for references
  vfm: { disableFormatHtml: true },
});
