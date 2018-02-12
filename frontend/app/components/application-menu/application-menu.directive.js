(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .directive('cryptpadApplicationMenu', cryptpadApplicationMenu);

  function cryptpadApplicationMenu() {
    var directive = {
      retrict: 'E',
      replace: true,
      controller: 'cryptpadApplicationMenuController',
      controllerAs: '$ctrl',
      template:
      '<div>' +
        '<a target="_blank" ng-href="{{$ctrl.userCryptpadDriveURL}}">' +
          '<img class="esn-application-menu-icon" src="/cryptpad/images/cryptpad-logo.svg" />' +
          '<span class="label" translate>' +
            '{{$ctrl.appTitle}}' +
          '</span>' +
        '</a>' +
      '</div>'
    };

    return directive;
  }
})();
