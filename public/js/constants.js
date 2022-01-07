"use strict";
exports.__esModule = true;
exports.BULLET_ANGLE_OFFSET = exports.USED_KEYS_WITH_DEFAULT = exports.OPTION_BUTTON_BORDER = exports.RESPAWN_PROT_TIME = exports.RESPAWN_TIME = exports.WEAPONS = exports.PLAYER_FRICTION = exports.BACKGROUND_COLOR = exports.CANVAS_WIDTH = exports.CANVAS_HEIGHT = exports.WEAPON_IDLE_ANGLE = exports.BULLET_SPEED = exports.BULLET_INTERVAL = exports.BULLET_RADIUS = exports.COLORS = exports.WEAPON_DISTANCE = exports.WEAPON_ANGLE_SPEED = exports.PLAYER_SPEED = exports.PLAYER_RADIUS = exports.UPDATE_RATE = exports.MAX_NAME_SIZE = void 0;
var MAX_NAME_SIZE = 20;
exports.MAX_NAME_SIZE = MAX_NAME_SIZE;
var UPDATE_RATE = 1; // rate at which the game updates
exports.UPDATE_RATE = UPDATE_RATE;
var PLAYER_RADIUS = 10;
exports.PLAYER_RADIUS = PLAYER_RADIUS;
var PLAYER_SPEED = 30;
exports.PLAYER_SPEED = PLAYER_SPEED;
var PLAYER_FRICTION = 0.95;
exports.PLAYER_FRICTION = PLAYER_FRICTION;
var WEAPON_ANGLE_SPEED = 360;
exports.WEAPON_ANGLE_SPEED = WEAPON_ANGLE_SPEED;
var COLORS = ["green", "red", "yellow", "black", "gray", "blue", "purple", "orange"];
exports.COLORS = COLORS;
var WEAPONS = [
    "/img/ak47-model1.png",
    "/img/ak47-model2.png",
    "/img/assault-rifle-model1.png",
    "/img/assault-rifle-model2.png",
    "/img/assault-rifle-model3.png"
];
exports.WEAPONS = WEAPONS;
var WEAPON_IDLE_ANGLE = 135;
exports.WEAPON_IDLE_ANGLE = WEAPON_IDLE_ANGLE;
var BULLET_ANGLE_OFFSET = 45;
exports.BULLET_ANGLE_OFFSET = BULLET_ANGLE_OFFSET;
var WEAPON_DISTANCE = {
    x: 2 * PLAYER_RADIUS,
    y: PLAYER_RADIUS / 2
};
exports.WEAPON_DISTANCE = WEAPON_DISTANCE;
var BULLET_RADIUS = 5;
exports.BULLET_RADIUS = BULLET_RADIUS;
var BULLET_INTERVAL = 200; // you can shoot only 1 bullet each BULLET_INTERVAL in ms
exports.BULLET_INTERVAL = BULLET_INTERVAL;
var BULLET_SPEED = 350;
exports.BULLET_SPEED = BULLET_SPEED;
var CANVAS_WIDTH = window.innerWidth;
exports.CANVAS_WIDTH = CANVAS_WIDTH;
var CANVAS_HEIGHT = window.innerHeight;
exports.CANVAS_HEIGHT = CANVAS_HEIGHT;
var RESPAWN_TIME = 3000; // it takes 3 seconds to respawn
exports.RESPAWN_TIME = RESPAWN_TIME;
var BACKGROUND_COLOR = "#4f555c";
exports.BACKGROUND_COLOR = BACKGROUND_COLOR;
var RESPAWN_PROT_TIME = 3000; // you are invincible for 3000
exports.RESPAWN_PROT_TIME = RESPAWN_PROT_TIME;
var OPTION_BUTTON_BORDER = "5px solid rgb(44, 47, 51)";
exports.OPTION_BUTTON_BORDER = OPTION_BUTTON_BORDER;
// keys that are used in the game but already have a function in the browser
var USED_KEYS_WITH_DEFAULT = [" ", "ArrowLeft", "ArrowRight"];
exports.USED_KEYS_WITH_DEFAULT = USED_KEYS_WITH_DEFAULT;
