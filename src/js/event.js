
let SeasonEvent = function (what, when, params) {
    this.what = what;
    this.when = when;
    this.params = Object.assign({}, params);
};

export default SeasonEvent;