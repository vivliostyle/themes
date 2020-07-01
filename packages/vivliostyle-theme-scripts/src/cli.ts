#!/usr/bin/env node
import fs from 'fs';
import serve from 'serve-handler';
import path, { resolve, dirname, basename, relative } from 'path';
import http from 'http';
import resolvePkg from 'resolve-pkg';
import { join } from 'path';
import getPort from 'get-port';
import chalk from 'chalk';
import minimist from 'minimist';
import { stringify } from '@vivliostyle/vfm';

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
      await serve(req, res, {
        public: sourceRoot,
      });
    })
    .listen(sourcePort);

  let layoutURL = layout
    ? `${sourcePrefix}/${layout}`
    : `${assetPrefix}/default.html`;

  const isVFM = layout && layout.endsWith('.md');
  if (isVFM) {
    const convertedHTML = stringify(fs.readFileSync(layout, 'utf8'));
    const layoutDir = dirname(resolve(layout));
    const tmpHTMLName = basename(layout, '.md') + '.html';
    const tmpHTMLPath = relative(baseDir, join(layoutDir, tmpHTMLName));
    fs.writeFileSync(tmpHTMLPath, convertedHTML);
    layoutURL = `${sourcePrefix}/${tmpHTMLPath}`;
  }

  const styleURL = `${sourcePrefix}/${stylePath}`;
  const entrypoint = `${viewerPrefix}/#src=${layoutURL}&style=${styleURL}`;

  console.log('watching', chalk.green(baseDir));
  console.log(
    `open ${chalk.green.bold(entrypoint)} in the browser and test your theme`,
  );
})(
  minimist(process.argv.slice(2), {
    string: 'layout',
    alias: { layout: 'l' },
  }),
);
