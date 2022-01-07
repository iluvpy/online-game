"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var util_js_1 = require("./util.js");
var consts = require("./constants.js");
var player_js_1 = require("./player.js");
var renderer_js_1 = require("./renderer.js");
var movement_js_1 = require("./movement.js");
var events_js_1 = require("./events.js");
var keys_js_1 = require("./keys.js");
var socket_js_1 = require("./socket.js");
var buttons_js_1 = require("./buttons.js");
// html elems
var canvas = document.getElementById("display");
var username_inp = document.getElementById("name-inp");
var weapon_image = document.getElementById("weapon");
// variables
var player = player_js_1["default"];
var player_death_time = 0; // when the player died
var respawn_prot_start_time = 0;
var ctx = canvas.getContext("2d");
ctx.canvas.width = consts.CANVAS_WIDTH;
ctx.canvas.height = consts.CANVAS_HEIGHT;
username_inp.value = player.name;
var player_movement = new movement_js_1["default"](player.x, player.y);
var render = new renderer_js_1["default"](ctx);
var keys = new keys_js_1["default"]();
var game_socket = new socket_js_1["default"]();
var rotation_options = new buttons_js_1.RotationOptionButtons();
// init image buttons
var image_btn1 = new buttons_js_1.ImageButton(200, 500, "/img/cursor.png", 10, "#4e565d", "#2c2f33");
window.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var delta_time, start, finish, new_pos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, events_js_1["default"])();
                delta_time = 0.0;
                start = 0;
                finish = 0;
                _a.label = 1;
            case 1:
                start = (0, util_js_1.get_time)();
                game_socket.update(player);
                render.clear(consts.BACKGROUND_COLOR);
                // draw here
                update(delta_time);
                player_movement.update(delta_time, render.get_width(), render.get_height());
                new_pos = player_movement.get_coords();
                player.x = new_pos.x;
                player.y = new_pos.y;
                draw();
                return [4 /*yield*/, (0, util_js_1.sleep)(consts.UPDATE_RATE)];
            case 2:
                _a.sent();
                finish = (0, util_js_1.get_time)();
                delta_time = (finish - start) / 1000;
                _a.label = 3;
            case 3: return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
username_inp.addEventListener("input", function (ev) {
    keys.set_key(ev.data, false); // dont allow key presses while typing name
    if (username_inp.value.length <= consts.MAX_NAME_SIZE) {
        player.name = username_inp.value;
    }
});
function draw() {
    render.draw_player_list(game_socket.player_data);
    render.draw_player_data(player, null, null);
    image_btn1.draw(render);
    for (var player_id in game_socket.player_data) {
        if (player_id !== game_socket.id()) {
            var other_player = game_socket.player_data[player_id];
            render.draw_player_data(other_player, player, die);
        }
    }
    render.draw_text("Players: ".concat(game_socket.number_of_players()), 10, 20, "16px serif");
    if (!player.alive) {
        var now = (0, util_js_1.get_time)();
        var diff = now - player_death_time;
        var text = "Respawn in ".concat(Math.floor((consts.RESPAWN_TIME - diff) / 1000));
        render.draw_center_text(text, "48px serif");
        if (diff > consts.RESPAWN_TIME) {
            player.alive = true;
            respawn_prot_start_time = now;
        }
    }
}
function handle_misc() {
    player.weapon_src = weapon_image.src;
    player.respawn_protection = has_respawn_prot();
    if (keys.is_pressed("g")) {
        var pos = keys.get_mouse_pos();
        console.log("canvas x: ".concat(render.ctx.x));
        console.log("mouse pos ".concat(pos.x, " ").concat(pos.y));
    }
}
function update(delta_time) {
    if (player.alive) {
        keys.handle_movement(player_movement);
        keys.handle_bullet_key(player);
        keys.handle_weapon_rotation(delta_time, player, rotation_options.using_mouse_rotation(), render);
    }
    keys.handle_bullets(delta_time, player);
    handle_misc();
}
function has_respawn_prot() {
    var now = (0, util_js_1.get_time)();
    return now - respawn_prot_start_time < consts.RESPAWN_PROT_TIME;
}
function die() {
    var now = (0, util_js_1.get_time)();
    if (player.alive && !player.respawn_protection) {
        player.alive = false;
        player_death_time = now;
        player.death_count++;
    }
}
