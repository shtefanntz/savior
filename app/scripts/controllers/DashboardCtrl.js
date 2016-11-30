'use strict';

angular.module('yapp')
  .controller('DashboardCtrl', function ($timeout, $scope, $location, ShufflingService, GameService, ScoringService, gameTimeSpanInMiliseconds) {
    var words,
        baseWord,
        userInput = [],
        score = [],
        userInfo = GameService.getUserInfo();
        
    function resetUserInput() {
        userInput = []
        $scope.userInput = {value: ''};
    }

    function initialize() {
      resetUserInput();
      baseWord = ShufflingService.getRandomWordFromBag(words);
      $scope.mixedWord = ShufflingService.shuffle(baseWord);
    }

    function resetGame() {
      resetUserInput();
      score = []
      $scope.gameStarted = false;
    }

    $scope.userInfo = GameService.getUserInfo();

    if(!userInfo) {
      $location.path('/main')
    }

    GameService.getWords().then(function(data){
        words = data
    }).then(initialize)

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
      }, gameTimeSpanInMiliseconds)
    }


  });
