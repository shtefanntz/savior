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

            userInfoPromise = firebase.database().ref('/user/' + username).once('value').then(function(data) {
                var info = data.val();
                if (info === null) {
                    userInfo = {
                        previousScores: [],
                        userName: currentPlayer
                    };
                    firebase.database().ref('/user/' + username).set(JSON.stringify(userInfo))
                } else {
                    userInfo = JSON.parse(info)
                }

                return userInfo;
            });

            $location.path('/game');
        }

        function getWords() {
            if (!wordsPromise) {
                initialize();
            }
            return wordsPromise
        }

        return {
            initialize: initialize,
            startGame: startGame,
            getUserInfo: function() { return userInfoPromise; },
            getWords: getWords
        }
    });
