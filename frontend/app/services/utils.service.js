(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .factory('CryptpadUtils', CryptpadUtils);

    function CryptpadUtils() {
      let service = {
        hexToBase64: hexToBase64,
        base64ToHex: base64ToHex,
        parsePadUrl: parsePadUrl,
        parseHash: parseHash
      };

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

      function base64ToHex(b64String) {
          var hexArray = [];
          atob(b64String.replace(/-/g, '/')).split("").forEach(function(e){
              var h = e.charCodeAt(0).toString(16);
              if (h.length === 1) { h = "0"+h; }
              hexArray.push(h);
          });
          return hexArray.join("");
      }

      function parsePadUrl(href) {
          var patt = /^https*:\/\/([^\/]*)\/(.*?)\//i;

          var ret = {};
          var hash = href.replace(patt, function (a, domain, type, hash) {
              ret.domain = domain;
              ret.type = type;
              return '';
          });
          ret.hash = hash.replace(/#/g, '');
          return ret;
      }

      function parseHash(hash) {
        //Hash the hash of window.location.hash
        // #/cryptpad/1/edit/{chanKey}/{cryptKey}
          var parsed = {};
          var hashArr = hash.split('/');
          if (hashArr[2] && hashArr[2] === '1') {
              parsed.version = 1;
              parsed.mode = hashArr[3];
              parsed.channel = hashArr[4];
              parsed.key = hashArr[5];
              return parsed;
          }
          return;
      }
    }
})();
