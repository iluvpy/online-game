"use strict";
exports.__esModule = true;
var Color = /** @class */ (function () {
    function Color(r, g, b) {
        if (r === void 0) { r = 255; }
        if (g === void 0) { g = 255; }
        if (b === void 0) { b = 255; }
        this.color = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
    }
    Color.prototype.get_color = function () {
        return this.color;
    };
    return Color;
}());
exports["default"] = Color;
