'use strict';

angular.module('linagora.esn.cryptpad')
  .directive('applicationMenuCryptpad', function(applicationMenuTemplateBuilder) {
    return {
      retrict: 'E',
      replace: true,
      template: applicationMenuTemplateBuilder('/#/cryptpad', 'mdi-file-document', 'Cryptpad')
    };
  });
