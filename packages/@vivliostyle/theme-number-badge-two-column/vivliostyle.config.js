// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'みなみのはら高校　部活動記録集',
  theme: ['theme.css'],
  entry: [
    'templates/default/club-activity-report.md',
    'templates/default/club-activity-report-02.md',
    'templates/default/club-activity-report-03.md',
    'templates/default/club-activity-report-04.md',
    'templates/default/club-activity-report-05.md',
    'templates/default/club-activity-report-06.md',
  ],
  output: 'book.pdf',
});
