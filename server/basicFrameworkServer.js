'use strict';

var chalk = require('chalk');
var express = require('express');
var serverConfig = require('./server-config.json');

/**
 * Constructor.
 * @instance
 * @public
 */
function BasicFrameworkServer() {
  this.listener = null;
  this.server = express();
}

BasicFrameworkServer.prototype.start = function(portNumber) {
  var port = portNumber || process.env.PORT || serverConfig.port;

  this.server.set('port', port);

  this.server.use('/docs', express.static('./docs'));
  this.server.use('/dist', express.static('./dist'));

  this.server.use(function (req, res) {
    var message = '404 Not Found : ' + req.originalUrl.split('?')[0];
    console.log(chalk.red.bold(new Date().toString() + ' :: ' + message));
    res.status(404).send(message);
  });

  if (typeof port !== 'number') {
    port = parseInt(port, 10);
  }

  this.listener = this.server.listen(port, function () {
    console.log(chalk.magenta.bold('Express server listening on port ' + port.toString() + '...'));
  });

  var scope = this;
  this.listener.on('error', function (error) {
    scope._onError(error);
  });
};

/**
 * Stop server.
 */
BasicFrameworkServer.prototype.stop = function () {
  if (this.listener) {
    this.listener.close();
  } else {
    console.log(chalk.red.bold('Express server is not running'));
  }
};

/**
 * Returns the port number for the server.
 */
BasicFrameworkServer.prototype.getPort = function () {
  return server.get('port');
};

/**
 * Handles server errors.
 */
BasicFrameworkServer.prototype._onError = function (error) {
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.log(chalk.red.bold(this.getPort() + ' requires elevated privileges'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(chalk.red.bold(this.getPort() + ' is already in use'));
      process.exit(1);
      break;
    case 'ECONNRESET':
      console.log(chalk.red.bold(this.getPort() + ' connection closed'));
      process.exit(1);
      break;
    default:
      throw error;
  }
};

module.exports = new BasicFrameworkServer();