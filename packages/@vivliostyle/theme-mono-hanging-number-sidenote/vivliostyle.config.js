// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Kestrel: Building Interpreters from First Principles',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/cs-programming-sidenotes.md'],
  output: 'book.pdf',
  // The HTML formatting of VFM drops the whitespace right after the empty <a>
  // used for references
  vfm: { disableFormatHtml: true },
});
