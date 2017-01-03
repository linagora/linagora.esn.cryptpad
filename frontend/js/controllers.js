'use strict';

angular.module('linagora.esn.cryptpad')
  .controller('cryptpadController', function(session) {
    document.getElementById("userToken").value = session.user._id;
  });
