(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .config(injectApplicationMenu)

    function injectApplicationMenu(dynamicDirectiveServiceProvider) {
      var cryptpadModule = new dynamicDirectiveServiceProvider.DynamicDirective(true, 'cryptpad-application-menu', {priority: 28});

      dynamicDirectiveServiceProvider.addInjection('esn-application-menu', cryptpadModule);
    }
})();
