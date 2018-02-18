import RangeDateIterator from "../rangeDateIterator";
import Mustache from "mustache";
import template from "../../templates/seasonal.mustache";

export default function MustacheRender(season) {

    this.calendar = function() {
        var it = new RangeDateIterator(season.start, season.end);

        var rootElement = document.createElement('div');
        var current_month = null;

        var data = [];
        data['days'] = [];

        while(it.valid()) {
            var current = it.value();

            if(current_month != current.getMonth()) {



                if(current_month == null) {
                    current_month = current.getMonth();
                } else {
                    current_month = current.getMonth();

                    var rendered = Mustache.render(month(), data);
                    rootElement.innerHTML = rootElement.innerHTML + rendered;

                    data['days'] = [];
                }
            }

            data['days'].push({day: it.value().getDate(), class: "ciccio"});
            it.next();
        }

        return rootElement;
    }

    function month(it) {
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
            <li class="{{class}}"><p>{{day}}</p></li>
            {{/days}}
        </ul>
    </div>

</div>
        `;
    }
};