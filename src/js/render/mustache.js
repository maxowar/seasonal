import RangeDateIterator from "../rangeDateIterator";
import Mustache from "mustache";

export default function MustacheRender(season) {

    this.calendar = function() {
        var it = new RangeDateIterator(season.start, season.end);

        var rootElement = document.createElement('div');
        var current_month = null;

        while(it.valid()) {
            var current = it.value();

            if(current_month != current.getMonth()) {
                current_month = current.getMonth();
                monthElement = month(it)
                rootElement.innerHTML = monthElement;
            }

        }

        return rootElement;
    }
    
    function month(it) {
        var days = [];

        var current_month = null;
        while(it.valid() &&
            current_month == it.value().getMonth()) {
            days.push({day: it.value().getDate(), class: "ciccio"});
        }

        var template = import('../../templates/seasonal.mustache').then();

        Mustache.parse(template);
        var rendered = Mustache.render(template, days);

        return rendered;
    }
};