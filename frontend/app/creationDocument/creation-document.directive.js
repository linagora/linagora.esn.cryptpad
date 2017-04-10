(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .directive('cryptpadCreationDocument', creationDocument);

  function creationDocument() {
    let component = {
      retrict: 'E',
      templateUrl: '/cryptpad/app/creationDocument/creation-document.html',
      controller: 'cryptpadCreationDocumentController'
    };

    return component;
  }
})();
