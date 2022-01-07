"use strict";
exports.__esModule = true;
var constants_js_1 = require("./constants.js");
var shapes_js_1 = require("./shapes.js");
var MovementManager = /** @class */ (function () {
    function MovementManager(player_x, player_y) {
        this.x = player_x;
        this.y = player_y;
        this.dy = 0;
        this.dx = 0;
    }
    MovementManager.prototype.update = function (delta_time, canvas_width, canvas_height) {
        var next_x = this.x + this.dx * delta_time;
        var next_y = this.y + this.dy * delta_time;
        if (next_x - constants_js_1.PLAYER_RADIUS > 0 && next_x < canvas_width - constants_js_1.PLAYER_RADIUS) {
            this.x = next_x;
        }
        if (next_y - constants_js_1.PLAYER_RADIUS > 0 && next_y < canvas_height - constants_js_1.PLAYER_RADIUS) {
            this.y = next_y;
        }
        this.dx *= constants_js_1.PLAYER_FRICTION;
        this.dy *= constants_js_1.PLAYER_FRICTION;
    };
    MovementManager.prototype.move_up = function () {
        this.dy -= constants_js_1.PLAYER_SPEED;
    };
    MovementManager.prototype.move_down = function () {
        this.dy += constants_js_1.PLAYER_SPEED;
    };
    MovementManager.prototype.move_left = function () {
        this.dx -= constants_js_1.PLAYER_SPEED;
    };
    MovementManager.prototype.move_right = function () {
        this.dx += constants_js_1.PLAYER_SPEED;
    };
    MovementManager.prototype.get_coords = function () {
        return new shapes_js_1.Point(this.x, this.y);
    };
    return MovementManager;
}());
exports["default"] = MovementManager;
