'use strict';

angular.module('yapp')
    .controller('savGameCtrl', function ($timeout, $scope, $location, ShufflingService, GameService, gameTimeSpanInMiliseconds) {
        var words,
            score = [];

        $scope.score = [];
        $scope.initializeWord = initializeWord;
        $scope.gameStarted = false;
        $scope.start = startGame;

        GameService.getWords().then(function (data) {
            words = data
        }).then(initializeWord)

        function initializeWord() {
            var baseWord = ShufflingService.getRandomWordFromBag(words)
            $scope.currentWord = {
                baseWord: baseWord,
                mixedWord: ShufflingService.shuffle(baseWord)
            }
        }

        function resetGame() {
            $scope.score = []
            $scope.gameStarted = false;
            initializeWord()
        }

        function startGame() {
            $scope.gameStarted = true;

            $timeout(function () {
                alert('Time is up! Your score: ' + _.sum($scope.score))
                GameService.registerHighscore({
                    name: $scope.username,
                    score: _.sum($scope.score)
                })
                resetGame()
                $scope.$broadcast('gameHasStarted')
            }, gameTimeSpanInMiliseconds)
        }
    })
    .directive('savGame', function () {
        return {
            templateUrl: 'scripts/directives/views/Game.html',
            restrict: 'E',
            scope: {
                username: '='
            },
            controller: 'savGameCtrl'
        }
    });