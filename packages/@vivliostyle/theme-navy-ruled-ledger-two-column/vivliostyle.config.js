// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: "Captain's Log — M.V. Aurelia Meridian",
  theme: ['theme.css'],
  entry: ['example/captain-log.md'],
  output: 'book.pdf',
});
