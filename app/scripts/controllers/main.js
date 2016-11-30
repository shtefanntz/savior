'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.c = 1;
    $scope.submit = function () {

      $location.path('/game');

      return false;
    }

  });