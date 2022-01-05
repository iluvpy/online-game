const MAX_NAME_SIZE = 20;
const UPDATE_RATE = 1; // rate at which the game updates
const PLAYER_RADIUS = 10;
const PLAYER_SPEED = 30;
const PLAYER_FRICTION = 0.95;
const WEAPON_ANGLE_SPEED = 360;
const COLORS = ["green", "red", "yellow", "black", "gray", "blue", "purple", "orange"];
const WEAPONS = ["/img/ak47-model1.png", "/img/ak47-model2.png"];
const WEAPON_IDLE_ANGLE = 90;
const WEAPON_DISTANCE = {
    x: 2*PLAYER_RADIUS,
    y: PLAYER_RADIUS/2
};
const BULLET_RADIUS = 5;
const BULLET_INTERVAL = 200; // you can shoot only 1 bullet each BULLET_INTERVAL in ms
const BULLET_SPEED = 350;
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const RESPAWN_TIME = 3000; // it takes 3 seconds to respawn
const BACKGROUND_COLOR = "#4f555c";

export {
    MAX_NAME_SIZE,
    UPDATE_RATE,
    PLAYER_RADIUS,
    PLAYER_SPEED,
    WEAPON_ANGLE_SPEED,
    WEAPON_DISTANCE,
    COLORS,
    BULLET_RADIUS,
    BULLET_INTERVAL,
    BULLET_SPEED,
    WEAPON_IDLE_ANGLE,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    BACKGROUND_COLOR,
    PLAYER_FRICTION,
    WEAPONS,
    RESPAWN_TIME
};