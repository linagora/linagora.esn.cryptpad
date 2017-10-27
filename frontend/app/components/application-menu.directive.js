(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .directive('cryptpadApplicationMenu', cryptpadApplicationMenu);

  function cryptpadApplicationMenu(applicationMenuTemplateBuilder) {
    var directive = {
      retrict: 'E',
      replace: true,
      template: applicationMenuTemplateBuilder('/#/cryptpad/index', { url: '/cryptpad/images/cryptpad-icon.svg' }, 'Cryptpad')
    };

    return directive;
  }
})();
