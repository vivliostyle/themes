#!/usr/bin/env node

import { stringify } from '@vivliostyle/vfm';
import chalk from 'chalk';
import chokidar from 'chokidar';
import fs from 'fs';
import getPort from 'get-port';
import http from 'http';
import minimist from 'minimist';
import path, { basename, dirname, join, relative, resolve } from 'path';
import resolvePkg from 'resolve-pkg';
import serve from 'serve-handler';

(async function (argv) {
  const stylePath = argv['_'][0];
  if (!stylePath) {
    console.log(
      'vivliostyle-theme-scripts <stylePath> [--layout <layout.html>]',
    );
    process.exit(1);
  }
  const layout = argv['layout'];

  const baseDir = process.cwd();

  // asset server
  const assetPort = await getPort();
  const assetRoot = path.resolve(__dirname, '../assets');
  const assetPrefix = `http://localhost:${assetPort}`;
  const assetServer = http
    .createServer(async function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      await serve(req, res, {
        public: assetRoot,
      });
    })
    .listen(assetPort);

  // vivliostyle viewer
  const viewerPort = await getPort();
  const viewerPkg = resolvePkg('@vivliostyle/viewer', { cwd: baseDir })!;
  const viewerRoot = join(viewerPkg, 'lib');
  const viewerPrefix = `http://localhost:${viewerPort}`;
  const viewerServer = http
    .createServer(async function (req, res) {
      await serve(req, res, {
        public: viewerRoot,
      });
    })
    .listen(viewerPort);

  // source server
  const sourcePort = await getPort();
  const sourceRoot = baseDir;
  const sourcePrefix = `http://localhost:${sourcePort}`;
  const sourceServer = http
    .createServer(async function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'no-store');
      await serve(req, res, {
        public: sourceRoot,
        etag: true,
      });
    })
    .listen(sourcePort);

  let layoutURL = layout
    ? `${sourcePrefix}/${layout}`
    : `${assetPrefix}/default.html`;

  const styleURL = `${sourcePrefix}/${stylePath}`;

  function recompile(tmpHTMLPath: string) {
    const convertedHTML = stringify(fs.readFileSync(layout, 'utf8'));
    fs.writeFileSync(tmpHTMLPath, convertedHTML);
    console.log(`${chalk.yellow('[vfm]')} compiled`, tmpHTMLPath);
  }

  const isVFM = layout && layout.endsWith('.md');
  if (isVFM) {
    const layoutDir = dirname(resolve(layout));
    const tmpHTMLName = basename(layout, '.md') + '.html';
    const tmpHTMLPath = relative(baseDir, join(layoutDir, tmpHTMLName));

    chokidar
      .watch('**', {
        ignored: (p: string) => {
          return /node_modules|\.git/.test(p);
        },
        cwd: layoutDir,
      })
      .on('change', (path) => {
        if (!path || !/\.(md|markdown)$/i.test(path)) return;
        recompile(tmpHTMLPath);
      });
    recompile(tmpHTMLPath);

    layoutURL = `${sourcePrefix}/${tmpHTMLPath}`;
  }

  const entrypoint = `${viewerPrefix}/#src=${layoutURL}&style=${styleURL}&bookMode=true`;
  console.log(
    `open preview in the browser and test your theme ([ctrl+c] to quit)
${chalk.bold.green(entrypoint)}
`,
  );
})(
  minimist(process.argv.slice(2), {
    string: 'layout',
    alias: { layout: 'l' },
  }),
);
