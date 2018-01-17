(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .controller('cryptpadApplicationMenuController', cryptpadApplicationMenuController);

  function cryptpadApplicationMenuController(cryptpadConfig, CRYPTPAD_INSTANCE_URL, CRYPTPAD_INSTANCE_URL_DEFAULT) {
    var self = this;

    return cryptpadConfig(CRYPTPAD_INSTANCE_URL)
      .then(function(instanceURL) {
        self.instanceURL = !instanceURL ? CRYPTPAD_INSTANCE_URL_DEFAULT : instanceURL;
      });
  }
})();
