'use strict';

angular.module('yapp')
.service('Repository', function(){
    var db = firebase.database(),
        getWords = function(){
            return db.ref('/words').once('value')
                    .then(function(data) {
                        return JSON.parse(data.val());
                    })
        },
        getHighscores = function () {
            return db.ref('/highscores').once('value')
                    .then(function(data) {
                        var json = data.val();
                        if (json === null) {
                            return {};
                        }

                        return JSON.parse(data.val());
                    });
        },
        saveHighscore = function(entry){
            db.ref('/highscores').set(JSON.stringify(entry))
        }
    return {
        getWords: getWords,
        getHighscores: getHighscores,
        saveHighscore: saveHighscore
    }
});
