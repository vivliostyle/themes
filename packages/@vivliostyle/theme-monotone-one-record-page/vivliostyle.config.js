// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'アーキテクチャ決定記録（ミニマルスタイル）',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/adr-minimal.md',
    'example/adr-minimal-02.md',
    'example/adr-minimal-03.md',
    'example/adr-minimal-04.md',
    'example/adr-minimal-05.md',
    'example/adr-minimal-06.md',
    'example/adr-minimal-07.md',
  ],
  output: 'book.pdf',
});
