"use strict";
exports.__esModule = true;
exports.generate_player = void 0;
var util_js_1 = require("./util.js");
var constants_js_1 = require("./constants.js");
function generate_player() {
    return {
        x: (0, util_js_1.get_random_int)(100, constants_js_1.CANVAS_WIDTH - 100),
        y: (0, util_js_1.get_random_int)(100, constants_js_1.CANVAS_HEIGHT - 100),
        color: (0, util_js_1.get_random_choice)(constants_js_1.COLORS),
        name: (0, util_js_1.get_random_player_name)(),
        weapon_angle: 0,
        weapon_src: constants_js_1.WEAPONS[0],
        bullets: [],
        alive: true,
        death_count: 0,
        respawn_protection: false
    };
}
exports.generate_player = generate_player;
exports["default"] = generate_player();
