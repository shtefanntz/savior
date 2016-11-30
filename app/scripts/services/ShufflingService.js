'use strict';
angular.module('yapp')
    .service('ShufflingService', function () {
        function shuffleLetters(word) {
            var letters = word.split(""),
                count = letters.length;

            for (var i = count - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = letters[i];
                letters[i] = letters[j];
                letters[j] = tmp;
            }
            var result = letters.join("");

            if (result === word) {
                return shuffleLetters(word)
                // and hope that by the time this runs in production
                // tail calls optimizations are added in the browsers :)
            }
            return letters.join("");
        }

        return {
            shuffle: shuffleLetters
        }
    });
