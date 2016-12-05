'use strict';

angular.module('yapp')
    .controller('savMainInputCtrl', function ($scope, ScoringService) {
        var vm = $scope,
            userInput = [];

        $scope.evaluate = evaluateKeyPress;

        $scope.$on('gameHasStarted', function () {
            initializeComponent()
        })

        function resetUserInput() {
            userInput = []
            $scope.userInput = { value: '' };
        }


        function initializeComponent() {
            resetUserInput()
            $scope.signalInitialization();
        }

        function evaluateKeyPress(ev) {
            userInput.push(ev.key)
            if (ScoringService.inputIsCorrect($scope.baseWord, userInput)) {
                $scope.score.push(ScoringService.calculateScore($scope.baseWord, userInput));
                initializeComponent();
            }
        }
    })
    .directive('savMainInput', function () {
        return {
            templateUrl: 'scripts/directives/views/MainInput.html',
            restrict: 'E',
            scope: {
                signalInitialization: '&',
                baseWord: '=',
                score: '='
            },
            controller: 'savMainInputCtrl'
        }
    });