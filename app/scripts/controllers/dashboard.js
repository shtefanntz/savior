'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function ($scope, $state, $location, ShufflingService, GameService, ScoringService) {
    var words,
        baseWord,
        userInput;

    $scope.userInput = []
    GameService.getWords().then(function(data){
        words = data
    }).then(function(){
      baseWord = ShufflingService.getRandomWordFromBag(words);
      $scope.mixedWord = ShufflingService.shuffle(baseWord);
      $scope.$apply();
    })

    
    $scope.submit = function () {
      $location.path('/game/result');
      return false;
    }

    $scope.evaluate = function(ev){
        $scope.userInput.push(ev.key)
        if(ScoringService.inputIsCorrect(baseWord, $scope.userInput)){
          alert("da!")
       }
    }
  })
  .controller('ResultCtrl', function ($scope, $location) {
    $scope.goToHighscores = function () {
      $location.path('/game/highscore');

      return false;
    }
  });
