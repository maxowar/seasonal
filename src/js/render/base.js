import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

let BaseRender = function BaseRender(season, rootElement) {

    this.calendar = function() {
        var range = moment.range(season.start, season.end);
        var current_month;
        var monthElement;

        for (let current of range.by('day')) {
            var dayElement = document.createElement('span');

            if(current_month != current.month()) {
                current_month = current.month();
                monthElement = createMonthElement(range)
                rootElement.appendChild(monthElement);
            }

            dayElement.textContent = current.getDate();

            if(typeof season.index[current.unix()] != 'undefined') {
                dayElement.addEventListener('click', unsplrangeOnClick);
                dayElement.className = 'splrange';
            } else {
                dayElement.addEventListener('click', splrangeOnClick);
            }

            dayElement.setAttribute('data-date', current.format('YYYY-MM-DD'));
            dayElement.setAttribute('data-time', current.unix());
            dayElement.setAttribute('date-month', current.month());
            monthElement.appendChild(dayElement);
        }
    };



    function createMonthElement(range) {
        var div = document.createElement('div');
        div.setAttribute('data-month', current.month());
        div.setAttribute('class', 'month');
        var p = document.createElement('p');
        p.textContent = current.toLocaleString('range', { month: "long" });
        div.appendChild(p);

        rootElement.appendChild(div);

        return div;
    }

    function splrangeOnClick(event) {
        event.target.removeEventListener('click', splrangeOnClick);
        event.target.addEventListener('click', unsplrangeOnClick);

        season.splrange(new Date(Number(this.getAttribute('data-time'))));
        this.className = 'splrange';
    }

    function unsplrangeOnClick(event) {
        this.removeEventListener('click', unsplrangeOnClick);
        this.addEventListener('click', splrangeOnClick);

        season.unsplrange(new Date(Number(this.getAttribute('data-time'))));
        this.className = '';
    }
};

export default BaseRender;