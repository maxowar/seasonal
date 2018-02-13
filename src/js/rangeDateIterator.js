function RangeDateIterator(date, untilDate) {
    var until = new Date(untilDate.getTime());
    var current = new Date(date.getTime());

    this.value = function() {
        return current;
    };

    this.next = function() {
        current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
    };

    this.valid = function() {
        return current.getTime() <= until.getTime();
    };



}

export default RangeDateIterator;