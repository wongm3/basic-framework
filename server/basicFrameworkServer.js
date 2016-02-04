var chalk = require('chalk');
var express = require('express');
var serverConfig = require('./server-config.json');

var listener = null;
var server = express();

/**
 * Starts the application server.
 */
function start(rootFolder, portNumber) {
  var root = rootFolder || './docs';
  var port = portNumber || process.env.PORT || serverConfig.port;

  server.set('port', port);

  server.use('/docs', express.static(root));
  server.use('/dist', express.static('./dist'));

  server.use(function (req, res) {
    console.error(chalk.red.bold('Unable to resolve the following resource: ' + req.originalUrl));
    res.status(404).send('Sorry cant find that!');
  });

  if (typeof port !== 'number') {
    port = parseInt(port, 10);
  }

  listener = server.listen(port, function () {
    console.log(chalk.magenta.bold('Express server listening on port ' + port.toString() + '...'));
  });
  listener.on('error', onError);
}

/**
 * Stop server.
 */
function stop() {
  if (!!listener) {
    listener.close();
  } else {
    console.log(chalk.red.bold('Express server is not running'));
  }
}

/**
 * Returns the port number for the server.
 */
function getPort() {
  return server.get('port');
}

/**
 * Handles server errors.
 */
function onError(error) {
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(chalk.red.bold(getPort() + ' requires elevated privileges'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(chalk.red.bold(getPort() + ' is already in use'));
      process.exit(1);
      break;
    case 'ECONNRESET':
      console.error(chalk.red.bold(getPort() + ' connection closed'));
      process.exit(1);
      break;
    default:
      throw error;
  }
}

module.exports = {
  getPort: getPort,
  start: start,
  stop: stop
};