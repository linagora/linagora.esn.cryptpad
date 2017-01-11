  (function() {
    'use strict';

    angular.module('linagora.esn.cryptpad')
      .controller('CryptpadController', cryptpadController)
      .controller('IndexController', IndexController);

      function cryptpadController(session) {
        document.getElementById("userToken").value = session.user._id;
      }

      function IndexController($scope, session, CryptpadRestangular) {

        /*var hexToBase64 = function (hex) {
            var hexArray = hex
                .replace(/\r|\n/g, "")
                .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
                .replace(/ +$/, "")
                .split(" ");
            var byteString = String.fromCharCode.apply(null, hexArray);
            return window.btoa(byteString).replace(/\//g, '-').slice(0,-2);
        };

        $scope.getEditHashFromKeys = function (chanKey, editKeyStr) {
            return '/#/cryptpad/1/edit/' + hexToBase64(chanKey) + '/' + editKeyStr.replace(/\//g, '-');;
        };*/

        CryptpadRestangular.one('pad', session.user._id).getList().then((channels) => {
          $scope.channels = channels.data;
        });
      }
  })();
