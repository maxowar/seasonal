
let SeasonEvent = function (what, when, params) {

    if(when.constructor != Date) {
        throw new TypeError("Invalid argument: when must be of type Date");
    }

    this.what = what;
    this.when = when;
    this.params = Object.assign({}, params);
};

export default SeasonEvent;