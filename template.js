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
    $each: each,
    $helpers: {}
};

/**
 * Get compile cache
 */
template.get = function(fileName) {
    var cache;

    if (cacheStore[fileName]) {
        cache = cacheStore[fileName];
    } else if (typeof document === 'object') {
        var el = document.getElementById(fileName);
        if (el) {
            var source = (el.value || el.innerHTML).replace(/^\s*|\s*$/g, '');
        }
    }

    return cache;
};

/**
 * Complie module
 */
var forEach = utils.$each;

// Escape html code
function stringify(code) {
    return '"' + code
        .replace(/('|\\)/g, '\\$1')
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n') + '"';
}

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

    var headerCode = '"use strict";'
    +   'var $utils=this,$helpers=$utils.$helpers,'
    +   (debug ? '$line=0,' : '');
    var mainCode = replaces[0];
    var footerCode = 'return new String(' + replaces[3] + ')';

    forEach(source.split(openTag), function(code) {
        code = code.split(closeTag);       

        var $0 = code[0];
        var $1 = code[1];
        
        // Just only html snippet
        if (code.length === 1) {
            mainCode += html($0);
        // Engine and html code
        } else {
            // mainCode += 
        }
    });

    function html(code) {
        line += code.split(/\n/).length - 1;

        // Todo: compress
        if (compress) {

        }

        if (code) {
            code = replaces[1] + stringify(code) + replaces[2] + '\n';
        }

        return code;
    }

    function logic(code) {
        var thisLine = line;

        if (parser) {

        } else if (debug) {
            // Todo: record lien number
        }

        if (code.indexOf('=') === 0) {
            var escapeSyntax = escape && !/^=[=#]/.test(code);
            code = code.replace(/^=[#=]|[\s;]*$/g, '');

            // Todo: escape
            if (escapeSyntax) {

            } else {
                code = '$string(' + code + ')';
            }

            code = replaces[1] + code + replaces[2];
        }
    }
}