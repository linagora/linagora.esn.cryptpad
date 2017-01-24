  (function() {
    'use strict';

    angular.module('linagora.esn.cryptpad')
      .controller('CryptpadController', cryptpadController)
      .controller('IndexController', IndexController);

      function cryptpadController(session) {
        document.getElementById("userToken").value = session.user._id;
      }

      function IndexController($scope, session, CryptpadRestangular, CryptpadUtils, _) {
        $scope.getEditHashFromKeys = function (chanKey, editKeyStr) {
            return '/#/cryptpad/1/edit/' + CryptpadUtils.hexToBase64(chanKey) + '/' + editKeyStr.replace(/\//g, '-');;
        };

        $scope.canDelete = function(creatorPadId) {
          if(!creatorPadId._id) {
            return creatorPadId === session.user._id;
          } else {
            return creatorPadId._id === session.user._id
          }
        };

        $scope.delete = function(pad) {
          if($scope.canDelete(pad.author)) {
            _.pull($scope.channels, pad);
            CryptpadRestangular.one('pad', pad.channel).remove();
          }
        }

        CryptpadRestangular.one('pad', session.user._id).getList().then((channels) => {
          $scope.channels = channels.data;
        });
      }
  })();
