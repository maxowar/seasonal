import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import Mustache from "mustache";

export default function MustacheRender(season, rootElement) {

    this.calendar = function() {
        var range = moment.range(season.start, season.end);

        var current_month = null;

        var data = [];
        data['days'] = [];

        for(let current of range.by('days')) {

            // render new month
            if(current_month != current.month()) {

                // first month
                if(current_month == null) {
                    current_month = current.month();

                    data['title'] =  current.format('MMMM YYYY');

                    fillInDays(data, current);

                    // disable n days from 1 to season.start
                    for(var i = 0; i < season.start.date() - 1; i++) {
                        data['days'].push({day: i + 1, class: "disabled"});
                    }

                // other months
                } else {
                    current_month = current.month();

                    // render previous month
                    rootElement.appendChild(renderMonth(data));

                    // init new month
                    data['days'] = [];
                    data['title'] =  current.format('MMMM YYYY');

                    // fill empty days to 1 of the month
                    fillInDays(data, current);
                }
            }

            var className = '';
            if(typeof season.index[current.unix()] != 'undefined') {
                className = 'split';
            }

            // add days to month
            data['days'].push({
                day: current.date(),
                class: className,
                date: current.format('YYYY-MM-DD'),
                time: current.unix()
            });
        }

        // last month
        rootElement.appendChild(renderMonth(data));
    };

    function renderMonth(data) {
        var rendered = Mustache.render(month(), data);
        var calendarElement = document.createElement('div');
        calendarElement.className = 'calendar';
        calendarElement.innerHTML = rendered;
        return calendarElement;
    };

    function fillInDays(data, current, firstDayWeek) {

        firstDayWeek = 1;

        var firstDayOfTheMonth = new Date(current.year(), current.month(), 1);
        for(var i = 0; i < (firstDayOfTheMonth.getDay() + (7 - firstDayWeek)) % 7; i++) {
            data['days'].push({day: " ", class: "previous-month"});
        }
    }

    function month() {
        return `
    <div class="title">
        {{title}}
    </div>

    <div class="labels">
        <ul>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
            <li>Sun</li>
        </ul>
    </div>

    <div class="days">
        <ul>
            {{#days}}
            <li class="{{class}}" data-date="{{date}}" data-time="{{time}}"><p>{{day}}</p></li>
            {{/days}}
        </ul>
    </div>
        `;
    }
};