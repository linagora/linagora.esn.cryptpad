(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')

    .run(function(esnModuleRegistry, CRYPTPAD_MODULE_METADATA) {
      esnModuleRegistry.add(CRYPTPAD_MODULE_METADATA);
    });
})();
