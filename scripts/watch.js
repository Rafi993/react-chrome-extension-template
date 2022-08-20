#!/usr/bin/env node

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const configFactory = require('react-scripts/config/webpack.config');
const colors = require('colors/safe');
const ExtensionReloader = require('webpack-extension-reloader');

const config = configFactory('development');

config.entry = config.entry;

config.output.path = paths.appBuild;
paths.publicUrl = paths.appBuild + '/';

config.plugins.push(new ExtensionReloader());

const compiler = webpack(config);
compiler.watch({}, function (err) {
  if (err) {
    console.error(err);
  } else {
    fs.copySync(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: (file) => file !== paths.appHtml,
    });

    console.clear();
    console.info(colors.green('Compiled successfully!'));
    console.info('Built at', new Date().toLocaleTimeString());
    console.info();
    console.info('Note that the development build is not optimized.');
    console.info('To create a production build, use yarn build.');
  }
});
