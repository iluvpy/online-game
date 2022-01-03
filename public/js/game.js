import { rotate, sleep } from "./util.js";
import * as consts from "./constants.js";
import player from "./player.js";
import Renderer from "./renderer.js";

const socket = io(window.location.href);
// html elems
const canvas = document.getElementById("display");
const username_inp = document.getElementById("name-inp");
const rifle_image = document.getElementById("rifle");
// game constants

// variables
var keys_pressed = {};
var last_bullet_shot = 0;
var ctx = canvas.getContext("2d");
ctx.canvas.width = 1280;
ctx.canvas.height = 720;
var player_data = null;
var alive = true;
username_inp.value = player.name;

const render = new Renderer(ctx);

socket.on("data", (my_data) => {
    player_data = my_data;
})

window.onkeydown = (ev) => {
    keys_pressed[ev.key] = true;
};
window.onkeyup = (ev) => {
    keys_pressed[ev.key] = false;
}

username_inp.addEventListener("input", (ev) => {
    keys_pressed[ev.data] = false; // dont allow key presses while typing name
    if (username_inp.value.length <= consts.MAX_NAME_SIZE)
        player.name = username_inp.value;
})



function draw_player(player_obj) {
    render.draw_circle(player_obj.x, player_obj.y, consts.PLAYER_RADIUS, player_obj.color)
}

function draw_player_data(player) {
    // draw player name
    render.draw_text(
        player.name, 
        player.x-consts.PLAYER_RADIUS, 
        player.y-consts.PLAYER_RADIUS);
    // draw player body 
    draw_player(player); 
    // draw player weapon
    render.draw_image(
        rifle_image,
        player.x+consts.WEAPON_DISTANCE.x, 
        player.y+consts.WEAPON_DISTANCE.y, 
        player.weapon_angle);
    
    // draw bullets
    player.bullets.forEach(bullet => {
        render.draw_circle(bullet.x, bullet.y, consts.BULLET_RADIUS, "black");
    });
}

function draw() {
    
    draw_player_data(player);

    for (var player_id in player_data) {
        if (player_id !== socket.id) {
            const other_player = player_data[player_id];
            draw_player_data(other_player);
        }
    }
    if (player_data !== null) {
        render.draw_text(`players: ${Object.keys(player_data).length}`, 10, 20, "16px serif");
    }
}

function handle_keys(delta_time) {
    if (keys_pressed["s"] && player.y+consts.PLAYER_RADIUS*2 < ctx.canvas.height) {
        player.y += consts.PLAYER_SPEED * delta_time;
    }
    if (keys_pressed["w"] && player.y > 0) {
        player.y -= consts.PLAYER_SPEED * delta_time;
    } 
    if (keys_pressed["d"] && player.x+consts.PLAYER_RADIUS*2 < ctx.canvas.width) {
        player.x += consts.PLAYER_SPEED * delta_time;
    }
    if (keys_pressed["a"] && player.x > 0) {
        player.x -= consts.PLAYER_SPEED * delta_time;
    }
    if (keys_pressed["ArrowRight"]) {
        player.weapon_angle += consts.WEAPON_ANGLE_SPEED * delta_time;
        if (player.weapon_angle > 360) player.weapon_angle = 0;
    }
    if (keys_pressed["ArrowLeft"]) {
        player.weapon_angle -= consts.WEAPON_ANGLE_SPEED * delta_time;
        if (player.weapon_angle < 0) player.weapon_angle = 360;
    }
    
    // space
    if (keys_pressed[" "]) {
        // add bullet
        const now = new Date().getTime();
        if (now - last_bullet_shot > consts.BULLET_INTERVAL) {
            var b_x = player.x+consts.PLAYER_RADIUS;
            var b_y = player.y;
            var new_pos = rotate({x: b_x+consts.BULLET_SPEED, y: b_y+consts.BULLET_SPEED}, {x: b_x, y: b_y}, player.weapon_angle+consts.WEAPON_IDLE_ANGLE);
            player.bullets.push({
                x: b_x, 
                y: b_y,
                x_speed: b_x-new_pos.x,
                y_speed: b_y-new_pos.y
            });
            last_bullet_shot = now;
        }
    }

    // for debugging // XXX remove later
    if (keys_pressed["h"]) {
        console.log(Object.keys(keys_pressed))
    }
}
 
// updates the position of a bullets
function handle_bullets(delta_time) {
    var i = 0;
    player.bullets.forEach(bullet => {
            bullet.x += bullet.x_speed * delta_time;
            bullet.y += bullet.y_speed * delta_time;   
        i++;
    });
    player.bullets = player.bullets.filter(bullet => !(bullet.x > render.get_width() || bullet.x < 0 || bullet.y > render.get_height() || bullet.y < 0));  
}

function update(delta_time) {
    handle_keys(delta_time);
    handle_bullets(delta_time);
}



window.onload = async () => {
    var delta_time = 0.0;
    var start = 0;
    var finish = 0;
    for (;;) {
        start = new Date().getTime();
        socket.emit("get-data", socket.id, player);
        render.clear();
        // draw here
        if (alive) {
            update(delta_time);
        }
        draw();

        await sleep(consts.UPDATE_RATE);
        finish = new Date().getTime();
        delta_time = (finish - start) / 1000;
    }
};
