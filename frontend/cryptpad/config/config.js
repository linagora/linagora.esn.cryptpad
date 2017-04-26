(function() {
  var config = {
    "httpAddress": "::",

    "publicPath": "/www",

    "httpPort": 3000,

    "websocketProtocol": "ws",

    "websocketPort": 3000,

    "usePortInFrontend": true,

    "websocketPath": "/cryptpad_websocket",

    "useSecureWebsockets": false,

    "logToStdou": false,

    "verbose": false,

    "storage": "./storage/mongo",

    "filePath": "./datastore/",

    "channelExpirationMs": 30000,

    "openFileLimit": 2048
  };

  if(typeof module === 'object') {
    module.exports = config;
  } else {
    define('config', [], function() {
      return config;
    })
  }
})();
