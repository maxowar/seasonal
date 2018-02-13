import Period from './period';

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
    this.periods = Array.isArray(periods) ?
        periods :
        [new Period(start, end)];
    this.name = name;
    this.constructor(start, end);
};
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
    if (when.constructor !== Date) {
        throw new TypeError("Must be of type Date");
    }

    let it = this.periods[Symbol.iterator]();

    let prev;
    let cursor = it.next();
    let position = 1;
    while (!cursor.done) {
        prev = cursor.value;
        if (prev.contains(when)) {
            let newPeriod = new Period(when, prev.end);
            prev.end = new Date(when.getFullYear(),when.getMonth(), when.getDate() - 1);
            this.periods.splice(position, 0, newPeriod);
        }
        position++;
        cursor = it.next();
    }
};
Season.prototype.unsplit = function () {

};
Season.prototype.toString = function () {
    var serialized = ''
    this.periods.forEach(function (period) {
        serialized += period.toString();
    });
    return serialized;
}

export default Season;