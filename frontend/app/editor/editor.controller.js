(function() {
  'use strict';

  angular.module('linagora.esn.cryptpad')
    .controller('CryptpadController', cryptpadController)

    function cryptpadController($element, $scope, $timeout, $mdDialog, session, CryptpadRestangular, notificationFactory) {
      document.getElementById("userToken").value = session.user._id;
      $scope.isLoaded = false;

      $('#editor-iframe').on('load', function(){
        var buttonIntervel = setInterval(function () {
          var shareButton = $($('#editor-iframe')[0].contentDocument).find('#shareButton');
          if(shareButton.length) {
            clearInterval(buttonIntervel);
            $scope.$apply(function(){
              $scope.isLoaded = true;
            });
            shareButton.click(function (event) {
              var chanId = shareButton.attr('chanId');
              CryptpadRestangular.all('pads').one('pad', chanId).get().then(function(res) {
                showPrompt(event, chanId, res.data);
              });
            });
          }
        }, 1000);
      });

      function showPrompt(ev, chanId, pad) {
        var newScope = $scope.$new();
        if(pad.coAuthor.length != 0) {
          newScope.newUsersGroups = _.map(pad.coAuthor, function(user) {
            user.displayName = user.firstname + " " + user.lastname;
            return user
          })
        } else {
          newScope.newUsersGroups = [];
        }
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt({
          controller: 'sharePadController',
          templateUrl: '/cryptpad/app/editor/share/share-modal.html',
          scope: newScope,
          targetEvent: ev,
          parent: angular.element(document.body),
          clickOutsideToClose:true
        });

        $mdDialog.show(confirm).then(function(result) {
          CryptpadRestangular.one('pad', chanId).one('coAuthor').customPOST(result).then(function () {
            notificationFactory.weakSuccess('Success', 'Le pad a bien été partagé');
          });
        });
      };


    }
})();
