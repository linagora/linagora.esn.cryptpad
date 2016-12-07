'use strict';

angular.module('linagora.esn.cryptpad', [
  'op.dynamicDirective',
  'ui.router'
])
.config([
  '$stateProvider',
  'dynamicDirectiveServiceProvider',
  function($stateProvider, dynamicDirectiveServiceProvider) {
    var helloworld = new dynamicDirectiveServiceProvider.DynamicDirective(true, 'application-menu-cryptpad', {priority: 28});
    dynamicDirectiveServiceProvider.addInjection('esn-application-menu', helloworld);

    $stateProvider
      .state('cryptpad', {
        url: '/cryptpad',
        templateUrl: '/cryptpad/pad/index.html',
        controller: 'cryptpadController'
      })
      .state('editCryptpad', {
        url: '/cryptpad/:version/:form/:channel/:doc',
        templateUrl: '/cryptpad/pad/index.html',
        controller: 'cryptpadController'
      });
  }
]);
