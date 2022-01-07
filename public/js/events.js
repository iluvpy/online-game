"use strict";
exports.__esModule = true;
var constants_js_1 = require("./constants.js");
// adds event listeners to html elements
function html_events() {
    var weapon_image = document.getElementById("weapon");
    weapon_image.addEventListener("click", function (ev) {
        var src = weapon_image.src;
        var i = 0;
        for (var _i = 0, WEAPONS_1 = constants_js_1.WEAPONS; _i < WEAPONS_1.length; _i++) {
            var weapon_src = WEAPONS_1[_i];
            if (src.includes(weapon_src))
                break;
            i++;
        }
        console.log("i: ".concat(i));
        if (i < constants_js_1.WEAPONS.length - 1) {
            weapon_image.src = constants_js_1.WEAPONS[i + 1];
        }
        else {
            weapon_image.src = constants_js_1.WEAPONS[0];
        }
    });
}
exports["default"] = html_events;
