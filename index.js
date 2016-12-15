'use strict';
var AwesomeModule = require('awesome-module');
var Dependency = AwesomeModule.AwesomeModuleDependency;
var path = require('path');
const Config = require('./frontend/config/config');

var cryptpadModule = new AwesomeModule('linagora.esn.cryptpad', {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.logger', 'logger'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.auth', 'auth'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.pubsub', 'pubsub'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.esn-config', 'esn-config'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.authorization', 'authorizationMW'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.denormalize.user', 'denormalizeUser'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.user', 'user'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.collaboration', 'collaboration'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.token', 'tokenMW'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.wsserver', 'wsserver'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.helpers', 'helpers'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.db', 'db')
  ],

  states: {
    lib: function(dependencies, callback) {
      var cryptpadlib = require('./backend/lib')(dependencies);
      var cryptpad = require('./backend/webserver/api/cryptpad')(dependencies);

      var lib = {
        api: {
          cryptpad: cryptpad
        },
        lib: cryptpadlib
      };

      return callback(null, lib);
    },

    deploy: function(dependencies, callback) {
      // Register the webapp
      var app = require('./backend/webserver')(dependencies, this);
      // Register every exposed endpoints
      app.use('/', this.api.cryptpad);

      var webserverWrapper = dependencies('webserver-wrapper');
      // Register every exposed frontend scripts
      var jsFiles = [
        'app.js',
        'services.js',
        'directives.js',
        'controllers.js'
      ];
      webserverWrapper.injectAngularModules('cryptpad', jsFiles, ['linagora.esn.cryptpad'], ['esn']);
      var lessFile = path.resolve(__dirname, './frontend/css/styles.less');
      webserverWrapper.injectLess('cryptpad', [lessFile], 'esn');
      webserverWrapper.addApp('cryptpad', app);

      return callback();
    },

    start: function(dependencies, callback) {
      require('./backend/ws').init(dependencies, this.lib, Config);
    }
  }
});

/**
 * The main AwesomeModule describing the application.
 * @type {AwesomeModule}
 */
module.exports = cryptpadModule;
