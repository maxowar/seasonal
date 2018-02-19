import RangeDateIterator from "../rangeDateIterator";
import Mustache from "mustache";

export default function MustacheRender(season) {

    this.calendar = function() {
        var it = new RangeDateIterator(season.start, season.end);

        var rootElement = document.createElement('div');
        var current_month = null;

        var data = [];
        data['days'] = [];

        while(it.valid()) {
            var current = it.value();

            // render new month
            if(current_month != current.getMonth()) {

                // first month
                if(current_month == null) {
                    current_month = current.getMonth();

                    data['title'] =  current.toLocaleString(navigator.language, { month: "long" }) + ' ' + current.getFullYear() ;

                    fillInDays(data, current);

                    // disable n days from 1 to season.start
                    for(var i = 0; i < season.start.getDate() - 1; i++) {
                        data['days'].push({day: i + 1, class: "disabled"});
                    }

                // other months
                } else {
                    current_month = current.getMonth();

                    // render previous month
                    rootElement.appendChild(renderMonth(data));

                    // init new month
                    data['days'] = [];
                    data['title'] =  current.toLocaleString(navigator.language, { month: "long" }) + ' ' + current.getFullYear() ;

                    // fill empty days to 1 of the month
                    fillInDays(data, current);
                }
            }

            var className = '';
            if(typeof season.index[current.getTime()] != 'undefined') {
                className = 'split';
            }

            // add days to month
            data['days'].push({
                day: it.value().getDate(),
                class: className,
                date: current.getFullYear() + '_' + current.getMonth() + '_' + current.getDate()
            });

            it.next();
        }

        // last month
        rootElement.appendChild(renderMonth(data));

        return rootElement;
    };

    function renderMonth(data) {
        var rendered = Mustache.render(month(), data);
        var calendarElement = document.createElement('div');
        calendarElement.innerHTML = rendered;
        return calendarElement;
    };

    function fillInDays(data, current, firstDayWeek) {

        firstDayWeek = 1;

        var firstDayOfTheMonth = new Date(current.getFullYear(), current.getMonth(), 1);
        for(var i = 0; i < (firstDayOfTheMonth.getDay() + (7 - firstDayWeek)) % 7; i++) {
            data['days'].push({day: " ", class: "previous-month"});
        }
    }

    function month() {
        return `
<div class="calendar">
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
            <li class="{{class}}" data-date="{{date}}"><p>{{day}}</p></li>
            {{/days}}
        </ul>
    </div>

</div>
        `;
    }
};