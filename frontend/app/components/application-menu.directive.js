(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .directive('cryptpadApplicationMenu', cryptpadApplicationMenu);

  function cryptpadApplicationMenu(applicationMenuTemplateBuilder) {
    let directive = {
      retrict: 'E',
      replace: true,
      template: applicationMenuTemplateBuilder('/#/cryptpad/index', 'mdi-file-document', 'Cryptpad')
    };

    return directive;
  }
})();
