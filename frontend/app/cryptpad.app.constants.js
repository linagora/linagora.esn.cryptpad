(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')

    .constant('CRYPTPAD_MODULE_NAME', 'linagora.esn.cryptpad')
    .constant('CRYPTPAD_MODULE_METADATA', {
      id: 'linagora.esn.cryptpad',
      title: 'Cryptpad',
      icon: '/cryptpad/images/cryptpad-logo.svg',
      homePage: 'cryptpad',
      config: {
        template: 'cryptpad-config-form',
        displayIn: {
          user: false,
          domain: true,
          platform: false
        }
      }
    })
    .constant('CRYPTPAD_INSTANCE_URL', 'instanceURL')
    .constant('CRYPTPAD_INSTANCE_URL_DEFAULT', 'http://localhost:3000');
})();
