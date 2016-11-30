'use strict';

angular.module('yapp')
    .controller('MainCtrl', function($scope, GameService) {
        GameService.initialize();

        $scope.submit = function(name) {
            if (!name || !(name.trim())) {
                alert('Do add a name, or else you will see this beautiful alert again :) ')
            } else {
                GameService.startGame(name);
            }
        }
    });
