'use strict';

angular.module('yapp')
  .controller('HighscoreCtrl', function ($scope, GameService) {
    GameService.getHighscores().then(function (data) {
      $scope.games = _
        .chain(Object.keys(data))
        .map(function (key) {
          return {
            name: key,
            score: data[key]
          }
        })
        .orderBy('score', ['desc'])
        .value();

      $scope.noGamesWerePlayedBefore = $scope.games.length == 0

      $scope.$apply();

    })
  });
