'use strict';
angular.module('yapp')
    .service('ShufflingService', function () {
        function tryShuffle(word) {
            var letters = word.split(""),
                count = letters.length;

            for (var i = count - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = letters[i];
                letters[i] = letters[j];
                letters[j] = tmp;
            }
            return letters.join("");
        }

        function shuffleLetters(word) {
            var result = tryShuffle(word)

            if (result === word && word.length > 1) {
                return shuffleLetters(word)
                // and hope that by the time this runs in production
                // tail calls optimizations are added in mainstream browsers :)
            }
            return result;
        }

        function getRandomWordFromBag(words) {
            var index = Math.floor((Math.random() * words.length));
            return words[index];
        }

        return {
            shuffle: shuffleLetters,
            getRandomWordFromBag: getRandomWordFromBag
        }
    });
