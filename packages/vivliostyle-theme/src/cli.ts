#!/usr/local/bin/ node

import Bundler from 'parcel-bundler';
import serve from 'serve-handler';
import path from 'path';
import http from 'http';

const options = {
  outDir: './parcel-dist', // The out directory to put the build files in, defaults to dist
  // outFile: 'index.html', // The name of the outputFile
  publicUrl: '/', // The url to serve on, defaults to '/'
  watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: true, // Enabled or disables caching, defaults to true
  cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
  contentHash: false, // Disable content hash from being included on the filename
  global: 'moduleName', // Expose modules as UMD under this name, disabled by default
  minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  target: 'browser' as const, // Browser/node/electron, defaults to browser
  logLevel: 3 as const, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors, 0 = log nothing
  hmr: true, // Enable or disable HMR while watching
  hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  detailedReport: true,
  autoInstall: true,
};

(async function () {
  const baseDir = process.cwd();
  console.log('Start watching', baseDir);
  const server = http
    .createServer(async function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      await serve(req, res, {
        public: baseDir,
      });
    })
    .listen(8080);
  console.log(server.address());
  // Initializes a bundler using the entrypoint location and options provided
  const entryFiles = path.join(__dirname, '../index.html');
  const bundler = new Bundler(entryFiles, options);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  const bundle = await bundler.serve();
})();
