'use strict';

module.exports = function(dependencies) {

  const config = require('./config')(dependencies);

  function register() {
    config.register();
  }

  return {
    register
  };
};
