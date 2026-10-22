// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '児童冒険小説・画像重視版',
  theme: ['theme.css'],
  entry: ['templates/default/adventure-children-visual.md'],
  output: 'book.pdf',
});
