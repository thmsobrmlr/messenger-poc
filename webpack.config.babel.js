import path from 'path';
import fs from 'fs';

import webpack from 'webpack';

const sourcePath = path.resolve(__dirname, 'source');
const buildPath = path.resolve(__dirname, 'build');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const sharedConfig = {
  resolve: {
    root: sourcePath,
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    path: buildPath,
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [
      { test: /\.css$/, include: [sourcePath], loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' },
      { test: /\.(js|jsx)$/, include: [sourcePath], loader: 'babel-loader' },
      { test: /\.json/, loader: 'json' },
    ],
  },
};

const clientConfig = {
  ...sharedConfig,

  entry: { client: ['client.js'] },
  target: 'web',

  plugins: [],
};

const serverConfig = {
  ...sharedConfig,

  entry: { server: ['server.js'] },
  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

  // Don't bundle modules from node_modules
  // http://jlongster.com/Backend-Apps-with-Webpack--Part-I#Getting-Started
  externals: nodeModules,

  plugins: [],
};

if (process.env.NODE_ENV === 'development') {
  clientConfig.entry.client.unshift(
    'webpack-dev-server/client?http://localhost:3001/',
    'webpack/hot/dev-server',
  );

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  );

  serverConfig.entry.server.unshift(
    'webpack/hot/signal',
  );

  serverConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  );
}

const config = [
  clientConfig,
  serverConfig,
];

export default config;
