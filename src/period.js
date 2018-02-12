/**
 *  Rapresent a delta of time
 *
 * @param start Date
 * @param end Date
 * @constructor
 */
let Period = function (start, end) {
    this.start = start;
    this.end = end;
};
/**
 * Check if the given date in inside the range of the current Period
 *
 * @param date Date
 */
Period.prototype.contains = function (date) {
    return this.start.getTime() < date.getTime() && this.end.getTime() > date.getTime();
};

Period.prototype.toString = function () {
    return '(' + this.start.toDateString() + ', ' + this.end.toDateString() + ')';
};