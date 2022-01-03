const MAX_NAME_SIZE = 20;
const UPDATE_RATE = 1; // rate at which the game updates
const PLAYER_RADIUS = 10;
const PLAYER_SPEED = 300;
const WEAPON_ANGLE_SPEED = 360;
const COLORS = ["green", "red", "yellow", "black", "gray", "blue", "aqua", "purple", "orange"];
const WEAPON_IDLE_ANGLE = 90;
const WEAPON_DISTANCE = {
    x: 2.5*PLAYER_RADIUS,
    y: PLAYER_RADIUS
};
const BULLET_RADIUS = 5;
const BULLET_INTERVAL = 200; // you can shoot only 1 bullet each BULLET_INTERVAL in ms
const BULLET_SPEED = 350;

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
    WEAPON_IDLE_ANGLE
};