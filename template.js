var template = function () {};

template.version = '0.0.1';

var defaults = template.defaults = {
    openTag: '<%',
    closeTag: '%>',
    escape: true,
    cache: true,
    compress: false,
    parser: null
};

// Global config
template.config = function(name, value) {
    defaults[name] = value;
};

// Global cache store
var cacheStore = template.cache = {};

/**
 * Util module
 */
var isArray = Array.isArray || function(obj) {
    return ({}).toString.call(obj) === '[object Array]';
};

var each = function(data, callback) {
    var i, len;

    if (isArray(data)) {
        for (i = 0, len = data.length; i < len; i++) {
            callback.call(data, data[i], i, data);
        }
    } else {
        for (i in data) {
            callback.call(data, data[i], i);
        }
    }
};

var utils = template.utils = {
    $each: each
};

/**
 * Complie module
 */

var forEach = utils.$each;

function complier(source, options) {

    var debug = options.debug;
    var openTag = options.openTag;
    var closeTag = options.closeTag;
    var parser = options.parser;
    var compress = options.compress;
    var escape = options.escape;

    var line = 1;

    var isNewEngine = ''.trim;
    var replaces = isNewEngine ? ["$out='';", "$out+=", ";", "$out"] :
        ["$out=[];", "$out.push(", ");", "$out.join('')"];
    var concat = isNewEngine ? "$out+=text;return $out" : "$out.push(text)";
    var print = 'function() {'
    +       'var text = "".concat.apply("", arguments);'
    +       concat
    +   '}'; 

    var headerCode = '"use strict"';

}