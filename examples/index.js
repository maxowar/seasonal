import { Season, SeasonRender } from '../src/js/seasonal';
import SeasonEvent from '../src/js/event';

var season = new Season(
    'Stagione 2018',
    new Date(2018, 3, 10),
    new Date(2018, 6, 15)
);

season.on('split', function (period) {
    console.log("split:" + period);
});

season.on('unsplit', function (date) {
    console.log("unsplit:" + date);
})

season.split(new Date(2018, 3,15));
season.split(new Date(2018, 3,20));

season.split(new Date(2018, 7,15)); // raise a warning

season.split(new Date(2018,   4, 1));
season.unsplit(new Date(2018, 4, 1));

season.addEvents([
    new SeasonEvent('Pasqua', new Date(2018, 4, 6), {color: '#ccc'})
]);


console.log(season);

var renderer = new SeasonRender(season);
renderer.render();

document.getElementById('send').addEventListener('click', function (event) {
    document.getElementById('result').innerHTML = season.toString();
});
