// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Ashcombe University Press: A History, 1876–2026',
  theme: ['theme.css'],
  entry: [
    'example/title-page.md',
    'example/foreword.md',
    'example/contents.md',
    'example/before-the-imprint.md',
    'example/press-proposed.md',
    'example/academic-history.md',
    'example/rationed-years.md',
    'example/long-expansion.md',
    'example/hot-metal-to-markup.md',
    'example/chronology.md',
    'example/office-of-printer.md',
    'example/colophon.md',
  ],
  output: 'book.pdf',
});
