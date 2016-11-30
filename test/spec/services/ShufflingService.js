'use strict';

describe('Shuffling service - ', function () {
    // load the controller's module
    beforeEach(module('yapp'));

    var sut;

    beforeEach(inject(function ($injector, $rootScope) {
        sut = $injector.get('ShufflingService');
    }));

    describe('shuffle', function () {
        it('should return an output different than the input ', function () {
            for (var i = 0; i < 100000; i += 1) {
                var actual = sut.shuffle("pizza")

                expect(actual).not.toBe("pizza");
            }
        });
    });
});
