'use strict';

function hexToBase64(hex) {
    var hexArray = hex
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ");
    var byteString = String.fromCharCode.apply(null, hexArray);
    return window.btoa(byteString).replace(/\//g, '-').slice(0,-2);
}

module.exports = function() {
  return {
    hexToBase64: hexToBase64
  };
};
