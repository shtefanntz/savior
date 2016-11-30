'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function ($scope, $state, $location) {

    $scope.$state = $state;
    $scope.submit = function () {

      $location.path('/game/result');

      return false;
    }
  })
  .controller('ResultCtrl', function ($scope, $location) {
    $scope.goToHighscores = function () {
      $location.path('/game/highscore');

      return false;
    }
  });
