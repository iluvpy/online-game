"use strict";
exports.__esModule = true;
var constants_js_1 = require("./constants.js");
var util_js_1 = require("./util.js");
var shapes_js_1 = require("./shapes.js");
var KeysHandler = /** @class */ (function () {
    function KeysHandler() {
        var _this = this;
        this.keys_pressed = {};
        this.mouse_pos = new shapes_js_1.Point(0, 0);
        this.event_callbacks = {}; // "mouseup", "mousedown", "keydown", etc
        window.onkeydown = function (ev) {
            _this.keys_pressed[ev.key] = true;
            if (ev.key in constants_js_1.USED_KEYS_WITH_DEFAULT) {
                ev.preventDefault();
            }
            if ("keydown" in _this.event_callbacks) {
                for (var _i = 0, _a = _this.event_callbacks; _i < _a.length; _i++) {
                    var callback = _a[_i];
                    callback(ev);
                }
            }
        };
        window.onkeyup = function (ev) {
            _this.keys_pressed[ev.key] = false;
            if (ev.key in constants_js_1.USED_KEYS_WITH_DEFAULT) {
                ev.preventDefault();
            }
            if ("keyup" in _this.event_callbacks) {
                for (var _i = 0, _a = _this.event_callbacks; _i < _a.length; _i++) {
                    var callback = _a[_i];
                    callback(ev);
                }
            }
        };
        window.onmousemove = function (ev) {
            _this.mouse_pos.x = ev.x;
            _this.mouse_pos.y = ev.y;
            if ("mousemove" in _this.event_callbacks) {
                for (var _i = 0, _a = _this.event_callbacks; _i < _a.length; _i++) {
                    var callback = _a[_i];
                    callback(ev);
                }
            }
        };
        window.onmouseup = function (ev) {
            if ("mouseup" in _this.event_callbacks) {
                for (var _i = 0, _a = _this.event_callbacks; _i < _a.length; _i++) {
                    var callback = _a[_i];
                    callback(ev);
                }
            }
        };
        window.onmousedown = function (ev) {
            if ("mousedown" in _this.event_callbacks) {
                for (var _i = 0, _a = _this.event_callbacks; _i < _a.length; _i++) {
                    var callback = _a[_i];
                    callback(ev);
                }
            }
        };
        this.last_bullet_shot = 0;
    }
    KeysHandler.prototype.handle_movement = function (player_movement) {
        if (this.is_pressed("s")) {
            player_movement.move_down();
        }
        if (this.is_pressed("w")) {
            player_movement.move_up();
        }
        if (this.is_pressed("d")) {
            player_movement.move_right();
        }
        if (this.is_pressed("a")) {
            player_movement.move_left();
        }
        // for debugging // XXX remove later
        if (this.keys_pressed["h"]) {
            console.log(Object.keys(this.keys_pressed));
        }
    };
    KeysHandler.prototype.handle_weapon_rotation = function (delta_time, player, mouse_rotation, render) {
        if (mouse_rotation) {
            /**
             * i just want to say that i have no idea how this is working or why this is
             * working and that i am thankful that it is
             * i didnt follow any formula or anything and it somehow worked
             */
            var opposite = this.mouse_pos.y - player.y;
            var adjacent = player.x - this.mouse_pos.x;
            var hypotenuse = Math.sqrt(adjacent * adjacent + opposite * opposite);
            var rotation = 360 - (0, util_js_1.to_degrees)(Math.asin(opposite / hypotenuse)) - constants_js_1.WEAPON_IDLE_ANGLE;
            if (adjacent < 0) {
                rotation = 360 - rotation - 90;
            }
            player.weapon_angle = rotation;
        }
        else {
            if (this.is_pressed("ArrowRight")) {
                player.weapon_angle += constants_js_1.WEAPON_ANGLE_SPEED * delta_time;
                if (player.weapon_angle > 360)
                    player.weapon_angle = 0;
            }
            if (this.is_pressed("ArrowLeft")) {
                player.weapon_angle -= constants_js_1.WEAPON_ANGLE_SPEED * delta_time;
                if (player.weapon_angle < 0)
                    player.weapon_angle = 360;
            }
        }
    };
    KeysHandler.prototype.handle_bullet_key = function (player) {
        // space
        if (this.is_pressed(" ")) {
            // add bullet
            var now = (0, util_js_1.get_time)();
            if (now - this.last_bullet_shot > constants_js_1.BULLET_INTERVAL) {
                var b_x = player.x + constants_js_1.PLAYER_RADIUS * 2;
                var b_y = player.y;
                var new_pos = (0, util_js_1.rotate)(new shapes_js_1.Point(b_x + constants_js_1.BULLET_SPEED, b_y + constants_js_1.BULLET_SPEED), new shapes_js_1.Point(b_x, b_y), player.weapon_angle + constants_js_1.WEAPON_IDLE_ANGLE - constants_js_1.BULLET_ANGLE_OFFSET);
                player.bullets.push({
                    x: b_x,
                    y: b_y,
                    x_speed: b_x - new_pos.x,
                    y_speed: b_y - new_pos.y
                });
                this.last_bullet_shot = now;
            }
        }
    };
    // updates the position of a bullets
    KeysHandler.prototype.handle_bullets = function (delta_time, player) {
        var i = 0;
        player.bullets.forEach(function (bullet) {
            bullet.x += bullet.x_speed * delta_time;
            bullet.y += bullet.y_speed * delta_time;
            i++;
        });
        player.bullets = player.bullets.filter(function (bullet) { return !(bullet.x > constants_js_1.CANVAS_WIDTH || bullet.x < 0 || bullet.y > constants_js_1.CANVAS_HEIGHT || bullet.y < 0); });
    };
    KeysHandler.prototype.set_key = function (key, val) {
        this.keys_pressed[key] = val;
    };
    KeysHandler.prototype.is_pressed = function (key) {
        if (!(key in this.keys_pressed))
            return false;
        return this.keys_pressed[key];
    };
    KeysHandler.prototype.get_mouse_pos = function () {
        return this.mouse_pos;
    };
    KeysHandler.prototype.add_callback = function (event_name, callback) {
        this.event_callbacks[event_name] = callback;
    };
    return KeysHandler;
}());
exports["default"] = KeysHandler;
