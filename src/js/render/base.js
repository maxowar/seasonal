import RangeDateIterator from "../rangeDateIterator";

let BaseRender = function BaseRender(season, rootElement) {

    this.calendar = function() {
        var it = new RangeDateIterator(season.start, season.end);
        var current_month;
        var monthElement;

        while (it.valid()) {
            var current = it.value();
            var dayElement = document.createElement('span');

            if(current_month != it.value().getMonth()) {
                current_month = it.value().getMonth();
                monthElement = createMonthElement(it)
                rootElement.appendChild(monthElement);
            }

            dayElement.textContent = current.getDate();

            if(typeof season.index[current.getTime()] != 'undefined') {
                dayElement.addEventListener('click', unsplitOnClick);
                dayElement.className = 'split';
            } else {
                dayElement.addEventListener('click', splitOnClick);
            }

            dayElement.setAttribute('data-date', current.getFullYear() + '_' + current.getMonth() + '_' + current.getDate());
            dayElement.setAttribute('data-time', current.getTime());
            dayElement.setAttribute('date-month', current.getMonth());
            monthElement.appendChild(dayElement);

            it.next();
        }
    };



    function createMonthElement(it) {
        var div = document.createElement('div');
        div.setAttribute('data-month', it.value().getMonth());
        div.setAttribute('class', 'month');
        var p = document.createElement('p');
        p.textContent = it.value().toLocaleString('it', { month: "long" });
        div.appendChild(p);

        rootElement.appendChild(div);

        return div;
    }

    function splitOnClick(event) {
        event.target.removeEventListener('click', splitOnClick);
        event.target.addEventListener('click', unsplitOnClick);

        season.split(new Date(Number(this.getAttribute('data-time'))));
        this.className = 'split';
    }

    function unsplitOnClick(event) {
        this.removeEventListener('click', unsplitOnClick);
        this.addEventListener('click', splitOnClick);

        season.unsplit(new Date(Number(this.getAttribute('data-time'))));
        this.className = '';
    }
};

export default BaseRender;