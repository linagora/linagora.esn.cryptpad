'use strict';

angular.module('linagora.esn.cryptpad')
  .controller('cryptpadController', function($scope, getHelloWorld) {
    getHelloWorld.then(function(message) {
      $scope.message = message;
    });
  });
