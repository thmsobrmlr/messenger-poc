import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from '../webpack.config.babel';

const HOST = 'localhost';
const PORT = 3001;

new WebpackDevServer(webpack(webpackConfig), {
  proxy: {
    '*': `http://${HOST}:${PORT - 1}`,
  },
  contentBase: './public',
  hot: true,
  debug: true,
  stats: { colors: true },
  quiet: true,
}).listen(PORT, HOST, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});

// eslint-disable-next-line no-console
console.log(chalk.green.bold(`webpack-dev-server running at http://${HOST}:${PORT}/webpack-dev-server/`));
