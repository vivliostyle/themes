// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '潮風の記憶',
  theme: ['theme.css'],
  entry: [
    'templates/default/00-titlepage.md',
    { path: 'templates/default/01-contents.md', rel: 'contents' },
    'templates/default/02-birth-house.md',
    'templates/default/03-shigihama.md',
    'templates/default/04-seizaisho.md',
    'templates/default/05-kisha.md',
    'templates/default/06-tokai.md',
    'templates/default/07-kazoku.md',
    'templates/default/08-shiokaze.md',
    'templates/default/09-afterword.md',
  ],
  output: 'book.pdf',
});
