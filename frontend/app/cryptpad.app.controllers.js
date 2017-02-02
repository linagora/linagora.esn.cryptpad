  (function() {
    'use strict';

    angular.module('linagora.esn.cryptpad')
      .controller('IndexController', IndexController);

      function IndexController($scope, session, _, CryptpadUtils, CryptpadRestangular) {
        $scope.getEditHashFromKeys = function (chanKey, editKeyStr) {
            return '/#/cryptpad/1/edit/' + CryptpadUtils.hexToBase64(chanKey) + '/' + editKeyStr.replace(/\//g, '-');;
        };

        let canDelete = $scope.canDelete = function(creatorPadId) {
          if (!creatorPadId._id) {
            return creatorPadId === session.user._id;
          } else {
            return creatorPadId._id === session.user._id
          }
        };

        $scope.delete = function(pad) {
          if(canDelete(pad.author)) {
            _.pull($scope.channels, pad);
            CryptpadRestangular.one('pad', pad.channel).remove();
          }
        };

        CryptpadRestangular.one('pad', session.user._id).getList().then((channels) => {
          $scope.channels = channels.data;
        });
      }
  })();
