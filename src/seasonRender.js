
function SeasonRender(seasonToRender, opts) {

    var season = seasonToRender;
    var options = Object.assign({}, defaults(), opts);

    this.render = function() {
        drawDays();
    };

    function drawDays() {
        var it = new RangeDateIterator(season.start, season.end);
        var rootElement = document.getElementById(options.root_element);
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
            dayElement.addEventListener('click', function (event) {
                season.split(new Date(Number(this.getAttribute('data-time'))));
                this.className = 'split';
            })
            dayElement.setAttribute('data-date', current.getFullYear() + '_' + current.getMonth() + '_' + current.getDate());
            dayElement.setAttribute('data-time', current.getTime());
            dayElement.setAttribute('date-month', current.getMonth());
            monthElement.appendChild(dayElement);

            it.next();
        }
    }

    function defaults() {
        return {
            root_element: 'timeline'
        }
    }

    function createMonthElement(it) {
        var div = document.createElement('div');
        div.setAttribute('data-month', it.value().getMonth());
        div.setAttribute('class', 'month');
        var p = document.createElement('p');
        p.textContent = it.value().toLocaleString('it', { month: "long" });
        div.appendChild(p);
        return div;
    }

}