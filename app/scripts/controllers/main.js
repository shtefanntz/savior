'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('MainCtrl', function($scope, $location, GameService) {
        GameService.initialize();

        $scope.submit = function() {
            GameService.startGame($scope.name);
        }
    })
    .service('GameService', function($http, $location) {
        var currentPlayer = "",
            userInfo,
            wordsPromise,
            userInfoPromise;
        function initialize() {
            wordsPromise = firebase.database().ref('/words').once('value').then(function(data) {
                return JSON.parse(data.val());
            })
        }

        function startGame(username) {
            currentPlayer = username;

            //firebase.database().ref('/user/' + username).set(JSON.stringify(userInfo))
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

        function getHighscores() {
            return firebase.database().ref('/highscores').once('value').then(function(data) {
                var json = data.val();
                if (json === null) {
                    return [];
                }

                return JSON.parse(data.val());
            })
        }

        function registerHighscore(entry) {
            return firebase.database().ref('/highscores').once('value').then(function(data) {
                var json = data.val(),
                    highscores;
                if (json === null) {
                    var base = {};
                    base[entry.name] = entry.score;
                    firebase.database().ref('/highscores').set(JSON.stringify(base))
                } else {
                    highscores = JSON.parse(json);
                    if (!!highscores[entry.name]) {
                        if (highscores[entry.name].score < entry.score) {
                            highscores[entry.name] = entry.score
                            firebase.database().ref('/highscores').set(JSON.stringify(highscores))
                        }
                    } else {
                        highscores[entry.name] = entry.score
                        firebase.database().ref('/highscores').set(JSON.stringify(highscores))
                    }
                }
            })
        }
        return {
            initialize: initialize,
            startGame: startGame,
            getUserInfo: function() { return userInfo; },
            getWords: getWords,
            getHighscores: getHighscores,
            registerHighscore: registerHighscore
        }
    });
