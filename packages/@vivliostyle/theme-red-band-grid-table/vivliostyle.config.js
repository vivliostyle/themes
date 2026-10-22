// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'クレジットカード利用明細書',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/credit-card-statement.md',
    'templates/default/payment-breakdown.md',
  ],
  output: 'book.pdf',
});
