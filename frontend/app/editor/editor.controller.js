(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .controller('CryptpadController', cryptpadController)

    function cryptpadController($element, session) {
      document.getElementById("userToken").value = session.user._id;
    }
})();
