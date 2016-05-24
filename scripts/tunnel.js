var localtunnel = require('localtunnel');
var chalk = require('chalk');

var subdomain = process.env.SUBDOMAIN;
var port = process.env.PORT || 3000;

var opts = {};

if (subdomain) {
  opts.subdomain = subdomain;
}

localtunnel(port, opts, function (err, tunnel) {
  if (err) {
    console.log(chalk.red.bold(err));
  } else {
    console.log('Tunnel open from ' + chalk.green.bold(tunnel.url) + ' to ' + chalk.green.bold('http://localhost:' + port) + '.');
  }
});
