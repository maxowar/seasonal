import BaseRender from './render/base';
import MustacheRender from './render/mustache';

function SeasonRender(seasonToRender, opts) {

    var season = seasonToRender;
    var options = Object.assign({}, defaults(), opts);
    var engines = {
        'Base': BaseRender,
        'Mustache': MustacheRender
    };

    this.render = function() {
        // dynamic import
        //var resource = './render/' + ;
        //import(resource).then();
        var rootElement = document.getElementById(options['root_element']);
        rootElement.innerHTML = '';
        var engine = new engines[options['render_engine']](season, rootElement);
        engine.calendar();
    };

    function defaults() {
        return {
            root_element: 'season',
            render_engine: 'Mustache'
        }
    }

}


export default SeasonRender;