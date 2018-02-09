'use strict';
let AwesomeModule = require('awesome-module');
let Dependency = AwesomeModule.AwesomeModuleDependency;
let express = require('express');
let path = require('path');
let glob = require('glob-all');
let _ = require('lodash');

const NAME = 'cryptpad';
const APP_ENTRY_POINT = NAME + '.app.js';
const MODULE_NAME = 'linagora.esn.' + NAME;
const FRONTEND_JS_PATH = __dirname + '/frontend/app/';

let cryptpadModule = new AwesomeModule('linagora.esn.cryptpad', {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.esn-config', 'esn-config')
  ],

  states: {
    lib: function(dependencies, callback) {
      let libModule = require('./backend/lib')(dependencies);

      let lib = {
        lib: libModule
      };

      return callback(null, lib);
    },

    deploy: function(dependencies, callback) {
      let webserverWrapper = dependencies('webserver-wrapper');
      let app = require('./backend/webserver')(this, dependencies);
      let lessFile = path.resolve(__dirname, './frontend/app/styles.less');
      let frontendModules = glob.sync([
        FRONTEND_JS_PATH + '**/!(*spec).js'
      ]).map(filepath => filepath.replace(FRONTEND_JS_PATH, ''));

      _.pull(frontendModules, APP_ENTRY_POINT);
      frontendModules = [APP_ENTRY_POINT].concat(frontendModules);

      webserverWrapper.addApp('bower_components', express.static(path.normalize(__dirname + '/frontend/components/')));
      webserverWrapper.injectAngularAppModules(NAME, frontendModules, MODULE_NAME, ['esn']);
      webserverWrapper.injectLess(NAME, [lessFile], 'esn');
      webserverWrapper.addApp(NAME, app);

      require('./backend/lib/config')(dependencies).register();

      return callback();
    },

    start: (dependencies, callback) => callback()
  }
});

/**
 * The main AwesomeModule describing the application.
 * @type {AwesomeModule}
 */
module.exports = cryptpadModule;
