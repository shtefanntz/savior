'use strict';

angular.module('yapp')
    .controller('DashboardCtrl', function ($scope, $location, GameService) {
        $scope.userInfo = GameService.getUserInfo();

        if (!$scope.userInfo) {
            $location.path('/main')
        }
    });
