(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .controller('sharePadController', shareModalController);

    function shareModalController($mdDialog, $scope, _) {
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.confirm = function() {
        var usersId = []
        _.map($scope.newUsersGroups, function(user) {
          usersId.push(user._id);
        });
        $mdDialog.hide(usersId);
      };
    }
})();
