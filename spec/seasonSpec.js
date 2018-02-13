import Season from '../src/js/season';

const SEASON_NAME = 'Seasonal test';

describe('Season', function () {

    var season = new Season(
        SEASON_NAME,
        new Date(2018, 2, 1),
        new Date(2018, 8, 1)
    );

    it('Should be of type Period', function () {
        expect(season.name).toBe(SEASON_NAME);
    });

});
