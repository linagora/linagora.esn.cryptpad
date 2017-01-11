(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .factory('CryptpadRestangular', CryptpadRestangular);

    function CryptpadRestangular(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('/cryptpad/api');
        RestangularConfigurer.setFullResponse(true);
      });
    }
})();
