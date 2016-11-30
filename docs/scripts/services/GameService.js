'use strict';

angular.module('yapp')
    .service('GameService', function($http, $location, Repository) {
        var currentPlayer = "",
            userInfo,
            wordsPromise,
            userInfoPromise;
        
        function initialize() {
            wordsPromise = Repository.getWords()
        }

        function startGame(username) {
            currentPlayer = username;

            // theoretically, this is the place to add all other user info needed
            userInfo = {
                name: currentPlayer
            }

            $location.path('/game');
        }

        function getWords() {
            if (!wordsPromise) {
                initialize();
            }
            return wordsPromise
        }

        function registerHighscore(entry) {
            return Repository.getHighscores()
                .then(function(highscores){
                    var newScoreIsBetter = !!highscores[entry.name] && highscores[entry.name] < entry.score,
                        firstGamePlayed = !highscores[entry.name]
                    if (newScoreIsBetter || firstGamePlayed) {
                        highscores[entry.name] = entry.score
                        Repository.saveHighscore(highscores);
                    } 
                })
        }
        return {
            initialize: initialize,
            startGame: startGame,
            getUserInfo: function() { return userInfo; },
            getWords: getWords,
            getHighscores: Repository.getHighscores,
            registerHighscore: registerHighscore
        }
    });
