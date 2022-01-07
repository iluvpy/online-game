"use strict";
exports.__esModule = true;
var util_js_1 = require("./util.js");
var constants_js_1 = require("./constants.js");
var util_js_2 = require("./util.js");
var Renderer = /** @class */ (function () {
    function Renderer(ctx) {
        this.ctx = ctx;
        this.death_image = document.getElementById("death-img");
    }
    Renderer.prototype.clear = function (background_color) {
        this.ctx.fillStyle = background_color;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };
    Renderer.prototype.draw_text = function (text, x, y, font, color) {
        if (font === void 0) { font = "11px serif"; }
        if (color === void 0) { color = "white"; }
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    };
    Renderer.prototype.draw_center_text = function (text, font, color) {
        if (font === void 0) { font = "11px serif"; }
        if (color === void 0) { color = "white"; }
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, this.get_width() / 2, this.get_height() / 2);
        this.ctx.textAlign = "start";
    };
    Renderer.prototype.draw_circle = function (x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    };
    Renderer.prototype.draw_rect = function (x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    };
    Renderer.prototype.draw_gui_rect = function (rect) {
        this.draw_rect(rect.x, rect.y, rect.w, rect.h, rect.get_color());
    };
    Renderer.prototype.draw_line = function (x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    };
    Renderer.prototype.draw_image = function (image, x, y, angle) {
        if (angle === void 0) { angle = 0; }
        var width = image.width;
        var height = image.height;
        var radians = (0, util_js_1.to_radians)(angle);
        this.ctx.translate(x, y);
        this.ctx.rotate(radians);
        this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
        this.ctx.rotate(-radians);
        this.ctx.translate(-x, -y);
    };
    Renderer.prototype.draw_player = function (player_obj) {
        if (player_obj.alive) {
            this.draw_circle(player_obj.x, player_obj.y, constants_js_1.PLAYER_RADIUS, player_obj.color);
        }
        else {
            this.draw_image(this.death_image, player_obj.x, player_obj.y);
        }
    };
    Renderer.prototype.draw_player_data = function (player_obj, client_player, on_hit) {
        var _this = this;
        // draw player name
        this.draw_text(player_obj.name, player_obj.x - constants_js_1.PLAYER_RADIUS, player_obj.y - constants_js_1.PLAYER_RADIUS * 2);
        // draw player body 
        this.draw_player(player_obj);
        // draw player weapon
        if (player_obj.alive) { // dead people dont have a weapon
            this.draw_image((0, util_js_2.get_player_image)(player_obj.weapon_src), player_obj.x + constants_js_1.WEAPON_DISTANCE.x, player_obj.y + constants_js_1.WEAPON_DISTANCE.y, player_obj.weapon_angle);
        }
        // draw bullets
        player_obj.bullets.forEach(function (bullet) {
            _this.draw_circle(bullet.x, bullet.y, constants_js_1.BULLET_RADIUS, "black");
            // if client was hit by a bullet that was shot by another player
            if (client_player !== null) {
                if (bullet.x >= client_player.x - constants_js_1.PLAYER_RADIUS && bullet.x <= client_player.x + constants_js_1.PLAYER_RADIUS * 2 &&
                    bullet.y >= client_player.y - constants_js_1.PLAYER_RADIUS && bullet.y <= client_player.y + constants_js_1.PLAYER_RADIUS * 2) {
                    on_hit();
                }
            }
        });
    };
    // list players by lowest death count to highest
    Renderer.prototype.draw_player_list = function (player_data) {
        if (player_data === null)
            return;
        var list = {}; // player_name : death_count
        for (var key in player_data) {
            var player = player_data[key];
            list[player.name] = player.death_count;
        }
        var x = 20;
        var font = "12px arial";
        var y_separation = 20;
        var start_y = 400;
        this.draw_text("Deaths", x, start_y - y_separation, font);
        var color = "white";
        for (var i = 0; i < 100; i++) {
            for (var player_name in list) {
                var death_count = list[player_name];
                if (death_count == i) {
                    this.draw_text("".concat(player_name, ": ").concat(death_count), x, start_y, font, color);
                    start_y += y_separation;
                }
            }
        }
    };
    Renderer.prototype.get_width = function () {
        return this.ctx.canvas.width;
    };
    Renderer.prototype.get_height = function () {
        return this.ctx.canvas.height;
    };
    return Renderer;
}());
exports["default"] = Renderer;
