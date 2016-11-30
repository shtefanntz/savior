'use strict';

angular.module('yapp')
    .service('ScoringService', function ($http) {
        var max = Math.max,
            floor = Math.floor,
            pow = Math.pow,
            backspace = 'Backspace';
        function calculateScore(expectedWord, userInput) {
            if (!Array.isArray(userInput)) {
                return 0;
            }

            var penalty = userInput.filter(function (c) {
                return c === backspace;
            }).length;

            return max(
                floor(pow(1.95, expectedWord.length / 3)) - penalty,
                0);
        }

        function removeBackspaces(userInput) {
            var input = userInput.map(function (x) { return x });

            while (input.indexOf(backspace) !== -1) {
                var index = input.indexOf(backspace);
                if (index === 0) {
                    input.splice(0, 1)
                } else {
                    input.splice(input.indexOf(backspace) - 1, 2)
                }
            }
            return input;
        }

        function inputIsCorrect(expectedWord, userInput) {
            if (!_.isArray(userInput)) {
                return false;
            }

            return expectedWord === removeBackspaces(userInput).join('')
        }

        return {
            calculateScore: calculateScore,
            inputIsCorrect: inputIsCorrect
        }
    })