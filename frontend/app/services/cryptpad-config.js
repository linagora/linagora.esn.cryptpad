'use strict';

angular.module('linagora.esn.cryptpad')

  .factory('cryptpadConfig', function(esnConfig, CRYPTPAD_MODULE_NAME) {
    return function(key, defaultValue) {
      return esnConfig(CRYPTPAD_MODULE_NAME + '.' + key, defaultValue);
    };
  });
