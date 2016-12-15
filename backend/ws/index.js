'use strict';

var NetfluxSrv = require('./NetfluxWebsocketSrv');
const WebSocketServer = require('ws').Server;
let initialized = false;

function init(dependencies, lib, config) {
  var Storage = require(config.storage);

  if (initialized) {
    return logger.warn('The cryptpad service is already initialized');
  }

  let wss = new WebSocketServer({port: config.websocketPort});
  initialized = true;
  Storage.create(config, storage => {
    NetfluxSrv.run(storage, wss, config);
  });

}

module.exports.init = init;
