#!/usr/bin/env node
// Writes packages/@vivliostyle/index.html, a page that lists the PDFs left in
// each theme package by `pnpm example:build`. Both the page and the PDFs stay
// out of git through packages/@vivliostyle/.gitignore.

import fs from 'node:fs';
import path from 'node:path';

import { openPdf, renderPage } from './pdf-render.ts';

const PACKAGES_DIR = path.join(import.meta.dirname, '../packages/@vivliostyle');
const OUTPUT = path.join(PACKAGES_DIR, 'index.html');
const PREVIEW_PAGES = 4;
const PREVIEW_HEIGHT = 200;
// Rendered at twice the displayed size so previews stay sharp on HiDPI screens.
const RENDER_HEIGHT = PREVIEW_HEIGHT * 2;

interface PackageJson {
  [index: string]: unknown;
  name: string;
  description?: string;
  vivliostyle?: {
    theme?: {
      name?: string;
      category?: string;
      topics?: string[];
      i18n?: Record<string, { description?: string }>;
    };
  };
}

interface Preview {
  src: string;
  width: number;
}

interface PdfEntry {
  file: string;
  href: string;
  size: number;
  mtime: Date;
  pageCount?: number;
  pageSize?: { width: number; height: number };
  previews: Preview[];
  error?: string;
}

interface ThemeEntry {
  dir: string;
  packageName: string;
  name: string;
  description?: string;
  descriptionJa?: string;
  category?: string;
  topics: string[];
  pdfs: PdfEntry[];
}

async function readPdf(packageDir: string, file: string): Promise<PdfEntry> {
  const absolute = path.join(packageDir, file);
  const stat = fs.statSync(absolute);
  const entry: PdfEntry = {
    file,
    href: encodeURI(`${path.basename(packageDir)}/${file}`),
    size: stat.size,
    mtime: stat.mtime,
    previews: [],
  };
  try {
    const pdfDocument = await openPdf(absolute);
    entry.pageCount = pdfDocument.numPages;
    for (let n = 1; n <= Math.min(PREVIEW_PAGES, pdfDocument.numPages); n++) {
      const page = await pdfDocument.getPage(n);
      const { width, height } = page.getViewport({ scale: 1 });
      entry.pageSize ??= { width, height };
      const canvas = await renderPage(pdfDocument, n, RENDER_HEIGHT / height);
      const image = await canvas.encode('webp', 80);
      entry.previews.push({
        src: `data:image/webp;base64,${image.toString('base64')}`,
        width: Math.round((canvas.width * PREVIEW_HEIGHT) / canvas.height),
      });
    }
    await pdfDocument.destroy();
  } catch (error) {
    entry.error = error instanceof Error ? error.message : String(error);
  }
  return entry;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readPackageJson(packageDir: string): PackageJson {
  const manifestPath = path.join(packageDir, 'package.json');
  const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!isRecord(parsed) || typeof parsed.name !== 'string') {
    throw new Error(`${manifestPath} has no name field`);
  }
  return { ...parsed, name: parsed.name };
}

async function readTheme(packageDir: string): Promise<ThemeEntry> {
  const pkg = readPackageJson(packageDir);
  const theme = pkg.vivliostyle?.theme;
  const files = fs
    .readdirSync(packageDir)
    .filter((file) => file.endsWith('.pdf'))
    .toSorted();
  const pdfs: PdfEntry[] = [];
  for (const file of files) {
    process.stdout.write(`${path.basename(packageDir)}/${file}\n`);
    pdfs.push(await readPdf(packageDir, file));
  }
  return {
    dir: path.basename(packageDir),
    packageName: pkg.name,
    name: theme?.name ?? pkg.name,
    description: pkg.description,
    descriptionJa: theme?.i18n?.ja?.description,
    category: theme?.category,
    topics: theme?.topics ?? [],
    pdfs,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatPageSize({ width, height }: { width: number; height: number }) {
  const toMm = (pt: number) => Math.round((pt * 25.4) / 72);
  return `${toMm(width)} × ${toMm(height)} mm`;
}

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function renderPdf(pdf: PdfEntry): string {
  const facts = [
    pdf.pageCount !== undefined && `${pdf.pageCount} pages`,
    pdf.pageSize && formatPageSize(pdf.pageSize),
    formatSize(pdf.size),
    `built ${formatDate(pdf.mtime)}`,
  ].filter((fact) => typeof fact === 'string');
  const previews = pdf.previews
    .map(
      (preview, i) =>
        `<a href="${pdf.href}#page=${i + 1}"><img src="${preview.src}" width="${preview.width}" height="${PREVIEW_HEIGHT}" alt="Page ${i + 1} of ${escapeHtml(pdf.file)}"></a>`,
    )
    .join('');
  return `<section class="pdf">
  <p class="pdf-head"><a href="${pdf.href}">${escapeHtml(pdf.file)}</a> <span>${facts.join(' · ')}</span></p>
  ${pdf.error ? `<p class="error">Could not read this PDF: ${escapeHtml(pdf.error)}</p>` : ''}
  <div class="pages">${previews}</div>
</section>`;
}

function renderTheme(theme: ThemeEntry): string {
  const search = [
    theme.name,
    theme.packageName,
    theme.description,
    theme.descriptionJa,
    ...theme.topics,
  ]
    .filter((value) => value !== undefined)
    .join(' ')
    .toLowerCase();
  const tags = [
    theme.category && `<li class="category">${escapeHtml(theme.category)}</li>`,
    ...theme.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`),
  ].filter((tag) => typeof tag === 'string');
  const body =
    theme.pdfs.length > 0
      ? theme.pdfs.map((pdf) => renderPdf(pdf)).join('\n')
      : `<p class="missing">No PDF yet. Run <code>pnpm example:build</code> in <code>packages/@vivliostyle/${escapeHtml(theme.dir)}</code>.</p>`;
  return `<article class="theme" id="${escapeHtml(theme.dir)}" data-category="${escapeHtml(theme.category ?? '')}" data-built="${theme.pdfs.length > 0}" data-search="${escapeHtml(search)}">
<div class="meta">
  <h2>${escapeHtml(theme.name)}</h2>
  <p class="package"><code>${escapeHtml(theme.packageName)}</code></p>
  ${theme.description ? `<p>${escapeHtml(theme.description)}</p>` : ''}
  ${theme.descriptionJa ? `<p lang="ja">${escapeHtml(theme.descriptionJa)}</p>` : ''}
  <ul class="tags">${tags.join('')}</ul>
</div>
<div class="pdfs">
${body}
</div>
</article>`;
}

function renderIndex(themes: ThemeEntry[]): string {
  const pdfCount = themes.reduce((sum, theme) => sum + theme.pdfs.length, 0);
  const missing = themes.filter((theme) => theme.pdfs.length === 0);
  const categories = [
    ...new Set(themes.flatMap((theme) => theme.category ?? [])),
  ].toSorted();
  const summary = `${pdfCount} PDFs from ${themes.length - missing.length} of ${themes.length} themes · generated ${formatDate(new Date())}`;
  const missingNote =
    missing.length > 0
      ? `<p class="notice">No PDF yet: ${missing.map((theme) => `<a href="#${escapeHtml(theme.dir)}">${escapeHtml(theme.dir)}</a>`).join(', ')}</p>`
      : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Example PDFs</title>
<style>
:root {
  color-scheme: light dark;
  --bg: #f6f6f4;
  --surface: #ffffff;
  --text: #1d1d1f;
  --muted: #6b6b70;
  --line: #dcdcd8;
  --accent: #2456c9;
  --tag: #ececea;
  --warn-bg: #fff4d6;
  --warn-text: #6b4a00;
  --error: #b42318;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #161618;
    --surface: #1f1f22;
    --text: #ececef;
    --muted: #9a9aa2;
    --line: #34343a;
    --accent: #8ab0ff;
    --tag: #2c2c31;
    --warn-bg: #3a2f12;
    --warn-text: #f3d48a;
    --error: #ff8a80;
  }
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font: 14px/1.6 system-ui, -apple-system, "Hiragino Sans", "Noto Sans JP", sans-serif;
}
a { color: var(--accent); }
code { font: 0.92em ui-monospace, SFMono-Regular, Menlo, monospace; }
header {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 16px 24px;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}
h1 { margin: 0; font-size: 20px; }
.summary { margin: 2px 0 12px; color: var(--muted); }
.controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.controls input, .controls select {
  font: inherit;
  padding: 6px 10px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 6px;
}
.controls input { flex: 1 1 280px; max-width: 480px; }
#count { color: var(--muted); }
.notice {
  margin: 0;
  padding: 8px 12px;
  background: var(--warn-bg);
  color: var(--warn-text);
  border-radius: 6px;
}
.notice a { color: inherit; }
main { padding: 16px 24px 48px; display: grid; gap: 16px; }
.theme {
  display: grid;
  grid-template-columns: 18rem minmax(0, 1fr);
  gap: 20px;
  padding: 16px 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  scroll-margin-top: 160px;
}
.theme[hidden] { display: none; }
.meta h2 { margin: 0; font-size: 17px; }
.meta p { margin: 4px 0; }
.meta .package { color: var(--muted); }
.tags { display: flex; flex-wrap: wrap; gap: 4px; margin: 8px 0 0; padding: 0; list-style: none; }
.tags li { padding: 0 8px; background: var(--tag); border-radius: 999px; font-size: 12px; }
.tags .category { background: var(--accent); color: var(--surface); }
.pdfs { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; }
.pdf-head { margin: 0 0 6px; }
.pdf-head a { font-weight: 600; }
.pdf-head span { color: var(--muted); margin-left: 6px; }
.pages { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; }
.pages a { flex: none; line-height: 0; }
.pages img {
  height: ${PREVIEW_HEIGHT}px;
  width: auto;
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
}
.pages a:hover img { outline: 2px solid var(--accent); }
.missing { margin: 0; color: var(--muted); }
.error { margin: 0; color: var(--error); }
@media (max-width: 720px) {
  header { position: static; padding: 16px; }
  main { padding: 16px; }
  .theme { grid-template-columns: minmax(0, 1fr); gap: 12px; padding: 14px 16px; }
}
</style>
</head>
<body>
<header>
  <h1>Example PDFs</h1>
  <p class="summary">${summary}</p>
  <div class="controls">
    <input id="search" type="search" placeholder="Filter by name, description or topic" aria-label="Filter themes">
    <select id="category" aria-label="Category">
      <option value="">All categories</option>
      ${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}
    </select>
    <select id="built" aria-label="Build status">
      <option value="">Built or not</option>
      <option value="false">No PDF yet</option>
    </select>
    <span id="count"></span>
  </div>
</header>
<main>
${missingNote}
${themes.map((theme) => renderTheme(theme)).join('\n')}
</main>
<script>
const search = document.getElementById('search');
const category = document.getElementById('category');
const built = document.getElementById('built');
const count = document.getElementById('count');
const themes = [...document.querySelectorAll('.theme')];
function apply() {
  const query = search.value.trim().toLowerCase();
  let shown = 0;
  for (const theme of themes) {
    const visible =
      (!query || theme.dataset.search.includes(query)) &&
      (!category.value || theme.dataset.category === category.value) &&
      (!built.value || theme.dataset.built === built.value);
    theme.hidden = !visible;
    if (visible) shown++;
  }
  count.textContent = shown === themes.length ? '' : shown + ' of ' + themes.length + ' themes';
}
for (const control of [search, category, built]) {
  control.addEventListener('input', apply);
}
</script>
</body>
</html>
`;
}

async function main() {
  const packageDirs = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('theme-'))
    .map((entry) => path.join(PACKAGES_DIR, entry.name))
    .toSorted();
  const themes: ThemeEntry[] = [];
  for (const packageDir of packageDirs) {
    themes.push(await readTheme(packageDir));
  }
  fs.writeFileSync(OUTPUT, renderIndex(themes));
  process.stdout.write(`Wrote ${path.relative(process.cwd(), OUTPUT)}\n`);
}

await main();
