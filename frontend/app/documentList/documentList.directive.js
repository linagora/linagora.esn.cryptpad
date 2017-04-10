(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .directive('cryptpadDocumentList', documentListComponent);

  function documentListComponent() {
    let component = {
      retrict: 'E',
      templateUrl: '/cryptpad/app/documentList/documentlist.html',
      controller: 'CryptpadDocumentListController'
    };

    return component;
  }
})();
