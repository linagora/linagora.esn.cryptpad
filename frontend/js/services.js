'use strict';

angular.module('linagora.esn.cryptpad')
  .factory('getHelloWorld', function($http) {
    return $http.get('/cryptpad/api/sayhello').then(function(response) {
      return response.data.message;
    });
  });
