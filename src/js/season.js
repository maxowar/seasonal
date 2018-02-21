import Period from './period';
import Event from './event';

/**
 * A semantically named collection of Periods
 *
 * @param name
 * @param start
 * @param end
 * @param periods
 * @constructor
 */
let Season = function (name, start, end, periods) {
    this.constructor = Period;
    this.constructor(start, end);

    this.periods = Array.isArray(periods) ?
        periods :
        [new Period(start, end)];
    this.index = {};
    this.name = name;
    this.events = [];

    var callbacks = [];

    this.mergePeriods = function (period1, period2) {
        return new Period(period1.start, period2.end);
    };

    this.findPeriod = function (date) {
        let it = this.periods[Symbol.iterator]();

        let cursor = it.next();
        while (!cursor.done) {
            if (cursor.value.contains(date)) {
                return cursor.value;
            }
            cursor = it.next();
        }
    };

    this.buildIndex = function () {
        var i;
        for(i = 0; i < this.periods.length; i++) {
            this.index[this.periods[i].end.unix()] = {
                index: i,
                period: this.periods[i]
            };
        }
    };

    this.dispatch = function (name, params) {
        if(typeof callbacks[name] != 'undefined') {
            callbacks[name].apply(this, params);
        }
    };

    this.on = function (name, callback) {
        callbacks[name] = callback;
    };

    this.buildIndex();
};
Season.prototype = new Period;
Season.prototype.count = function () {
    return this.periods.length;
};
Season.prototype.periods = function () {
    return this.periods;
};
/**
 *
 * @param when Date
 */
Season.prototype.split = function (when) {

    let it = this.periods[Symbol.iterator]();

    let prev;
    let cursor = it.next();
    let position = 1;
    while (!cursor.done) {
        prev = cursor.value;
        if (prev.contains(when)) {
            let newPeriod = new Period(when.clone().add(1, 'd'), prev.end);
            prev.end = when.clone();
            this.periods.splice(position, 0, newPeriod);

            this.buildIndex();

            this.dispatch('split', [newPeriod]);

            return true;
        }
        position++;
        cursor = it.next();
    }
    console.debug('When is not inside the season range');
    return false;
};
Season.prototype.unsplit = function (date) {
    if(typeof this.index[date.unix()] != 'undefined') {

        let cursor = this.index[date.unix()];

        cursor.period.end = this.periods[cursor.index + 1].end;
        this.periods.splice(cursor.index + 1, 1);

        this.buildIndex();

        this.dispatch('unsplit', [date]);
    }
};
Season.prototype.toString = function () {
    var serialized = ''
    this.periods.forEach(function (period) {
        serialized += period.toString() + '<br>';
    });
    return serialized;
};

Season.prototype.addEvents = function(events) {
    this.events =  events;
};

Season.prototype.getEvents = function () {
    return this.events;
};


export default Season;