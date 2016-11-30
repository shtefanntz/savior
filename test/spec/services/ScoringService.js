'use strict';

describe('Scoring service - ', function () {
    // load the controller's module
    beforeEach(module('yapp'));

    var sut;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector, $rootScope) {
        sut = $injector.get('ScoringService');
    }));
    describe('calculateScore', function () {
        it('should return the correct score when the word is added without mistakes', function () {
            var actual = sut.calculateScore("pizza", ['p', 'i', 'z', 'z', 'a'])

            expect(actual).toBe(3)
        });
        it('should return subtract 1 for each backspace', function () {
            var actual = sut.calculateScore("pizza", ['p', 'i', 'z', 'z', 'z', '\u0008', 'z', '\u0008', 'a'])

            expect(actual).toBe(1)
        });
        it('should return 0 when there are too many mistakes', function () {
            var actual = sut.calculateScore("pizza", ['p', 'i', 'z', 'z', 'z', '\u0008', 'z', '\u0008', 'z', '\u0008', 'z', '\u0008', 'z', '\u0008', 'a'])

            expect(actual).toBe(0)
        });

        it('should return 0 when input is invalid', function () {
            var actual = sut.calculateScore("pizza", 21)

            expect(actual).toBe(0)
        })
    });

    describe('inputIsCorrect', function () {
        it('should return false when user input is not and array', function () {
            var actual = sut.inputIsCorrect("pizza", 21)

            expect(actual).toBe(false)
        })

        it('should return true when the concatenated user input is equal to the expected word', function () {
            var actual = sut.inputIsCorrect('pizza', ['p', 'i', 'z', 'z', 'a']);
            expect(actual).toBe(true);
        })

        it('should return true when the concatenated user input is equal to the expected word while interpreting the back space', function () {
            var actual = sut.inputIsCorrect('pizza', ['p', 'i', 'z', 'z', 'z', '\u0008', 'z', '\u0008', 'z', '\u0008', 'a']);
            expect(actual).toBe(true);
        })
    })
});
