(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .controller('cryptpadApplicationMenuController', cryptpadApplicationMenuController);

  function cryptpadApplicationMenuController(cryptpadConfig, CRYPTPAD_INSTANCE_URL, 
                                              CRYPTPAD_INSTANCE_URL_DEFAULT, CRYPTPAD_DRIVE_PATH,
                                              CRYPTPAD_MODULE_METADATA) {
    var self = this;

    return cryptpadConfig(CRYPTPAD_INSTANCE_URL)
      .then(function(instanceURL) {
        var cryptpadInstanceUrl = (instanceURL ? instanceURL : CRYPTPAD_INSTANCE_URL_DEFAULT);

        self.userCryptpadDriveURL = new URL(CRYPTPAD_DRIVE_PATH, cryptpadInstanceUrl).href;
        self.appTitle = CRYPTPAD_MODULE_METADATA.title;
      });
  }
})();
