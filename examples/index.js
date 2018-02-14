import { Season, SeasonRender } from '../src/js/seasonal.js';

var season = new Season(
    'Stagione 2018',
    new Date(2018, 3, 1),
    new Date(2018, 4, 15)
);


season.split(new Date(2018, 3,15));
season.split(new Date(2018, 3,20));
season.split(new Date(2018, 7,15));

//season.unsplit(new Date(2018, 3,13));

var renderer = new SeasonRender(season);
renderer.render();

document.getElementById('send').addEventListener('click', function (event) {
    document.getElementById('result').innerHTML = season.toString();
});
