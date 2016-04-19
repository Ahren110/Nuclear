/**
 * Created by dntzhang on 2016/4/19.
 */
var util={};

util.addEvent = (function () {
    return function (el, type, fn) {
        if (el && el.nodeName || el === window) {
            el.addEventListener(type, fn, false);
        } else if (el && el.length) {
            for (var i = 0; i < el.length; i++) {
                util.addEvent(el[i], type, fn);
            }
        }
    };
})();

util.hasClass = function (ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

util.addClass = function (node, cls) {
    if (util.isNodeList(node)) {
        util._iteration("addClass", arguments);
        return;
    }
    if (!util.hasClass(node, cls)) node.className += " " + cls;

};

util.removeClass = function (node, cls) {
    if (util.isNodeList(node)) {
        util._iteration("removeClass", arguments);
        return;
    }
    if (util.hasClass(node, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        node.className = node.className.replace(reg, ' ');
    }
};

util.toggleClass = function (node, classStr) {
    if (util.isNodeList(node)) {
        util._iteration("toggleClass", arguments);
        return;
    }

    var cls = ' ' + node.className + ' ';
    if (cls.indexOf(' ' + util.trim(classStr) + ' ') >= 0) {
        util.removeClass(node, classStr);
    } else {
        util.addClass(node, classStr);
    }
};


; (function () {
    var class2type = {}, toString = Object.prototype.toString;
    "Boolean Number String Function Array Date RegExp Object Error NodeList".split(" ").forEach(function (name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var hasOwn = Object.prototype.hasOwnProperty;
    var type = function (obj) {
        if (obj == null) {
            return obj + "";
        }
        // Support: Android<4.0 (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
            typeof obj;
    }

    var isNodeList = function (obj) {
        return type(obj) === "nodelist";
    }

    var isFunction = function (obj) {
        return type(obj) === "function";

    }
    var isArray = function (obj) {
        return type(obj) === "array";
    }
    var isWindow = function (obj) {
        return obj != null && obj === obj.window;
    }

    var isPlainObject = function (obj) {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
            return false;
        }

        if (obj.constructor &&
            !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    }

    util.type = type;
    util.isFunction = isFunction;
    util.isArray = isArray;
    util.isWindow = isWindow;
    util.isPlainObject = isPlainObject;
    util.isNodeList = isNodeList;
})();

util._iteration = function (method, args) {
    var args = Array.prototype.slice.call(args);
    util.foreach(args[0], function (index) {
        var temp = args[0];
        args[0] = args[0][index];
        util[method].apply(util, args);
        args[0] = temp;
    })
};

util.foreach = function (list, fn) {
    for (var i = 0, len = list.length; i < len ; i++) {
        fn.call(list[i], i);
    }
};

util.merge = function () {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !util.isFunction(target)) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (util.isPlainObject(copy) ||
                    (copyIsArray = util.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && util.isArray(src) ? src : [];

                    } else {
                        clone = src && util.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = util.merge(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};
