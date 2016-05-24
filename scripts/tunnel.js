import localtunnel from 'localtunnel';
import chalk from 'chalk';

const subdomain = process.env.SUBDOMAIN;
const port = process.env.PORT || 3000;

const opts = {};

if (subdomain) {
  opts.subdomain = subdomain;
}

localtunnel(port, opts, (err, tunnel) => {
  if (err) {
    console.log(chalk.red.bold(err));
  } else {
    const sourceUrl = chalk.green.bold(tunnel.url);
    const destUrl = chalk.green.bold(`http://localhost:${port}`);

    console.log(`Tunnel open from ${sourceUrl} to ${destUrl}.`);
  }
});
