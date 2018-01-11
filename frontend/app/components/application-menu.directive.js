(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .directive('cryptpadApplicationMenu', cryptpadApplicationMenu);

  function cryptpadApplicationMenu() {
    var directive = {
      retrict: 'E',
      replace: true,
      template:
        '<div>' +
        '<a target="_blank" href="http://localhost:3000">' +
          '<img class="esn-application-menu-icon" src="/cryptpad/images/cryptpad-logo.png" />' +
          '<span class="label" translate>' +
            'Cryptpad' +
          '</span>' +
        '</a>' +
      '</div>'
    };

    return directive;
  }
})();
