// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'A4判広版対談形式',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/01-cover.md',
    'templates/default/02-contents.md',
    'templates/default/03-intro.md',
    'templates/default/04-night-1.md',
    'templates/default/05-night-2.md',
    'templates/default/06-night-3.md',
    'templates/default/07-night-4.md',
    'templates/default/08-colophon.md',
  ],
  output: 'book.pdf',
});
