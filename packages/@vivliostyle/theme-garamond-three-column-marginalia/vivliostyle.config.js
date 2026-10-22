// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Ashcombe University Press: A History, 1876–2026',
  theme: ['theme.css'],
  entry: [
    'templates/default/title-page.md',
    'templates/default/foreword.md',
    'templates/default/contents.md',
    'templates/default/before-the-imprint.md',
    'templates/default/press-proposed.md',
    'templates/default/academic-history.md',
    'templates/default/rationed-years.md',
    'templates/default/long-expansion.md',
    'templates/default/hot-metal-to-markup.md',
    'templates/default/chronology.md',
    'templates/default/office-of-printer.md',
    'templates/default/colophon.md',
  ],
  output: 'book.pdf',
});
