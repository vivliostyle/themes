// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'アーキテクチャ決定記録（ミニマルスタイル）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/adr-minimal.md',
    'templates/default/adr-minimal-02.md',
    'templates/default/adr-minimal-03.md',
    'templates/default/adr-minimal-04.md',
    'templates/default/adr-minimal-05.md',
    'templates/default/adr-minimal-06.md',
    'templates/default/adr-minimal-07.md',
  ],
  output: 'book.pdf',
});
