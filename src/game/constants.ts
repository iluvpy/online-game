const MAX_NAME_SIZE = 20;
const UPDATE_RATE = 1; // rate at which the game updates
const PLAYER_RADIUS = 10;
const PLAYER_SPEED = 30;
const PLAYER_FRICTION = 0.95;
const WEAPON_ANGLE_SPEED = 360;
const COLORS = ["green", "red", "yellow", "black", "gray", "blue", "purple", "orange"];
const WEAPONS = [
    "/img/ak47-model1.png", 
    "/img/ak47-model2.png", 
    "/img/assault-rifle-model1.png",
    "/img/assault-rifle-model2.png",
    "/img/assault-rifle-model3.png"];
const WEAPON_IDLE_ANGLE = 135;
const BULLET_ANGLE_OFFSET = 45;
const WEAPON_DISTANCE = {
    x: 2*PLAYER_RADIUS,
    y: PLAYER_RADIUS/2
};
const BULLET_RADIUS = 5;
const BULLET_INTERVAL = 200; // you can shoot only 1 bullet each BULLET_INTERVAL in ms
const BULLET_SPEED = 350;
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const RESPAWN_TIME = 3000; // it takes 3 seconds to respawn
const BACKGROUND_COLOR = "#4f555c";
const RESPAWN_PROT_TIME = 3000; // you are invincible for 3000
const OPTION_BUTTON_BORDER = "5px solid rgb(44, 47, 51)";
// keys that are used in the game but already have a function in the browser
const USED_KEYS_WITH_DEFAULT = [" ", "ArrowLeft", "ArrowRight"]; 
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
    RESPAWN_TIME,
    RESPAWN_PROT_TIME,
    OPTION_BUTTON_BORDER,
    USED_KEYS_WITH_DEFAULT,
    BULLET_ANGLE_OFFSET
};