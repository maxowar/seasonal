import Period from '../src/js/period';

describe('Period', function () {

    var period = new Period(
        new Date(2018, 0, 1),
        new Date(2018, 6, 1)
    );

    it('Should works', function () {
        expect(period).not.toBe(null);
    });

});