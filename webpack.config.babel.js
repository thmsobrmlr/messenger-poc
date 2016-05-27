import path from 'path';
import fs from 'fs';

const sourcePath = path.resolve(__dirname, 'source');
const buildPath = path.resolve(__dirname, 'build');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const sharedConfig = {
  resolve: { root: sourcePath },

  output: {
    path: buildPath,
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, include: [sourcePath], loader: 'babel-loader' },
      { test: /\.json/, loader: 'json' },
    ],
  },
};

const clientConfig = {
  ...sharedConfig,

  entry: { client: 'client.js' },
  target: 'web',
};

const serverConfig = {
  ...sharedConfig,

  entry: { server: 'server.js' },
  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

  // Don't bundle modules from node_modules
  // http://jlongster.com/Backend-Apps-with-Webpack--Part-I#Getting-Started
  externals: nodeModules,
};

export default [
  clientConfig,
  serverConfig,
];
