var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function() {
    "use strict";
    Object.keys || (Object.keys = function() {
        var t = Object.prototype.hasOwnProperty, o = !{
            toString: null
        }.propertyIsEnumerable("toString"), e = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], r = e.length;
        return function(n) {
            if ("object" !== (void 0 === n ? "undefined" : _typeof(n)) && ("function" != typeof n || null === n)) throw new TypeError("Object.keys called on non-object");
            var y, c, f = [];
            for (y in n) t.call(n, y) && f.push(y);
            if (o) for (c = 0; c < r; c++) t.call(n, e[c]) && f.push(e[c]);
            return f;
        };
    }());
}();