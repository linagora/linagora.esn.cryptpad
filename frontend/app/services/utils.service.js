(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .factory('CryptpadUtils', CryptpadUtils);

    function CryptpadUtils() {
      let service = {
        hexToBase64: hexToBase64
      }

      return service;

      function hexToBase64(hex) {
          var hexArray = hex
              .replace(/\r|\n/g, "")
              .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
              .replace(/ +$/, "")
              .split(" ");
          var byteString = String.fromCharCode.apply(null, hexArray);
          return window.btoa(byteString).replace(/\//g, '-').slice(0,-2);
      }
    }
})();
