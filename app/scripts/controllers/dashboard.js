'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function ($timeout, $scope, $state, $location, ShufflingService, GameService, ScoringService) {
    var words,
        baseWord,
        userInput = [],
        score = [],
        userInfo = GameService.getUserInfo();
    
    function initialize(){
      userInput = []
      baseWord = ShufflingService.getRandomWordFromBag(words);
      $scope.mixedWord = ShufflingService.shuffle(baseWord);
      $scope.userInput = {value: ''};
      $scope.$apply();
    }

    function resetGame(){
      score = []
      $scope.gameStarted = false;
    }
    if(!userInfo) {
      $location.path('/main')
    }

    GameService.getWords().then(function(data){
        words = data
    }).then(initialize)


    
    $scope.submit = function () {
      $location.path('/game/result');
      return false;
    }

    $scope.evaluate = function(ev){
        userInput.push(ev.key)
        if(ScoringService.inputIsCorrect(baseWord, userInput)){
            score.push(ScoringService.calculateScore(baseWord, userInput));
            initialize();
       }
    }

    $scope.start = function(){
      $scope.gameStarted = true;

      $timeout(function(){
        alert('your score: ' + _.sum(score)) 
        GameService.registerHighscore({
          name: userInfo.name,
          score: _.sum(score)
        })
        resetGame()       
      }, 10000)
    }


  })
  .controller('HighscoreCtrl', function($scope, GameService){
    GameService.getHighscores().then(function(data){
        $scope.games = _
          .chain(Object.keys(data))
          .map(function(key){
            return {
              name: key,
              score: data[key]
            }
          })
          .orderBy('score', ['desc'])
          .value();

        $scope.$apply();
    })
  })
  .controller('ResultCtrl', function ($scope, $location) {
    $scope.goToHighscores = function () {
      $location.path('/game/highscore');

      return false;
    }
  });
