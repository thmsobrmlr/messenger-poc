const path = require('path');

const sourcePath = path.resolve(__dirname, '../source');

module.exports = {
  resolve: {
    root: sourcePath,
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.css$/, include: [sourcePath], loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' },
      { test: /\.(js|jsx)$/, include: [sourcePath], loader: 'babel-loader' },
      { test: /\.json/, loader: 'json' },
    ],
  },
};
