import { Season, SeasonRender } from '../src/js/seasonal';
import SeasonEvent from '../src/js/event';
import Period from "../src/js/period";
import Moment from "../node_modules/moment";

let periods = [
    new Period(Moment('2018-04-10'), Moment('2018-05-01')),
    new Period(Moment('2018-05-02'), Moment('2018-07-15'))
];


var season = new Season(
    'Stagione 2018',
    Moment('2018-03-10'),
    Moment('2018-06-15')
);


season.on('split', function (period) {
    console.log("split:" + period);
});

season.on('unsplit', function (date) {
    console.log("unsplit:" + date);
})

season.split(Moment('2018-04-15'));
season.split(Moment('2018-04-20'));

season.split(Moment('2018-08-15')); // raise a warning

season.split(Moment('2018-05-01'));
season.unsplit(Moment('2018-05-01'));

season.addEvents([
    new SeasonEvent('Pasqua', Moment('2018-04-01'), {color: '#ccc'})
]);

console.log(season);

var renderer = new SeasonRender(season);
renderer.render();

document.getElementById('send').addEventListener('click', function (event) {
    document.getElementById('result').innerHTML = season.toString();
});
