(function(angular) {
  'use strict';

  angular.module('linagora.esn.cryptpad')

  .component('cryptpadConfigForm', {
    templateUrl: '/cryptpad/app/components/config/cryptpad-config-form.html',
    bindings: {
      configurations: '='
    }
  });

})(angular);
