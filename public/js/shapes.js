"use strict";
exports.__esModule = true;
exports.Rect = exports.Point = void 0;
var color_js_1 = require("./color.js");
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;
var Rect = /** @class */ (function () {
    function Rect(x, y, w, h, color) {
        if (color === void 0) { color = (0, color_js_1["default"])(); }
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    Rect.prototype.get_color = function () {
        return this.color.get_color();
    };
    return Rect;
}());
exports.Rect = Rect;
