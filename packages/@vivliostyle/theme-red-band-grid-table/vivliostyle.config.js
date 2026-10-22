// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'クレジットカード利用明細書',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/credit-card-statement.md', 'example/payment-breakdown.md'],
  output: 'book.pdf',
});
