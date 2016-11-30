'use strict';

angular.module('yapp')
    .service('ScoringService', function ($http) {
        var max = Math.max,
            floor = Math.floor,
            pow = Math.pow;
        function calculateScore(expectedWord, userInput) {
            if (!Array.isArray(userInput)) {
                return 0;
            }

            var penalty = userInput.filter(function (c) {
                return c === '\u0008';
            }).length;

            return max(
                floor(pow(1.95, expectedWord.length / 3)) - penalty,
                0);
        }

        function removeBackspaces(input) {
            while (input.indexOf('\u0008') !== -1) {
                input.splice(input.indexOf('\u00008') - 2, 2)
            }
            return input;
        }

        function inputIsCorrect(expectedWord, userInput) {
            if (!Array.isArray(userInput)) {
                return false;
            }

            return expectedWord === removeBackspaces(userInput).join('')
        }

        return {
            calculateScore: calculateScore,
            inputIsCorrect: inputIsCorrect
        }
    })