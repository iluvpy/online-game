import { get_player_image, rotate, sleep } from "./util.js";
import * as consts from "./constants.js";
import base_player, { generate_player } from "./player.js";
import Renderer from "./renderer.js";
import { Point } from "./shapes.js";
import MovementManager from "./movement.js";
import html_events from "./events.js";


const socket = io(window.location.href);
// html elems
const canvas = document.getElementById("display");
const username_inp = document.getElementById("name-inp");
const rip_image = document.getElementById("rip-img");
const weapon_image = document.getElementById("weapon");
// game constants

// variables
var player = base_player;
var keys_pressed = {};
var player_death_time = 0; // when the player died
var last_bullet_shot = 0;
var ctx = canvas.getContext("2d");
ctx.canvas.width = consts.CANVAS_WIDTH;
ctx.canvas.height = consts.CANVAS_HEIGHT;
var player_data = null;
username_inp.value = player.name;
const player_movement = new MovementManager(player.x, player.y);
const render = new Renderer(ctx);

// pull data from server
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
    if (username_inp.value.length <= consts.MAX_NAME_SIZE) {
        player.name = username_inp.value;
    }
});



function draw_player(player_obj) {
    if (player_obj.alive) {
        render.draw_circle(player_obj.x, player_obj.y, consts.PLAYER_RADIUS, player_obj.color);
    }
    else {
        render.draw_image(
            rip_image,
            player_obj.x,
            player_obj.y
        );
    }
}

function draw_player_data(player_obj, is_client) {
    // draw player name
    render.draw_text(
        player_obj.alive ? player_obj.name : "DEAD", 
        player_obj.x-consts.PLAYER_RADIUS, 
        player_obj.y-consts.PLAYER_RADIUS*2);
    // draw player body 
    draw_player(player_obj); 
    // draw player weapon
    if (player_obj.alive) { // dead people dont have a weapon
        render.draw_image(
            get_player_image(player_obj.weapon_src),
            player_obj.x+consts.WEAPON_DISTANCE.x, 
            player_obj.y+consts.WEAPON_DISTANCE.y, 
            player_obj.weapon_angle);
    }

    
    // draw bullets
    player_obj.bullets.forEach(bullet => {
        render.draw_circle(bullet.x, bullet.y, consts.BULLET_RADIUS, "black");
        // if client was hit by a bullet that was shot by another player
        if (
            bullet.x >= player.x-consts.PLAYER_RADIUS && bullet.x <= player.x+consts.PLAYER_RADIUS*2 &&
            bullet.y >= player.y-consts.PLAYER_RADIUS && bullet.y <= player.y+consts.PLAYER_RADIUS*2 && !is_client
        ) {
            die();
        }
    });
}

function draw() {
    
    draw_player_data(player, true);
    

    for (var player_id in player_data) {
        if (player_id !== socket.id) {
            const other_player = player_data[player_id];
            draw_player_data(other_player, false);
        }
    }
    if (player_data !== null) {
        render.draw_text(`Players: ${Object.keys(player_data).length}`, 10, 20, "16px serif");
    }
    if (!player.alive) {
        var now = new Date().getTime();
        var diff = now - player_death_time;
        var text = `Respawn in ${Math.floor((consts.RESPAWN_TIME-diff)/1000)}`  
        render.draw_center_text(text, "48px serif");
        if (diff > consts.RESPAWN_TIME) {
            var name = player.name;
            player.alive = true;
            player = generate_player();
            player.name = name;
        }
    }

}

function handle_keys(delta_time) {
    if (keys_pressed["s"] && player.y+consts.PLAYER_RADIUS*2 < ctx.canvas.height) {
        player_movement.move_down();
    }
    if (keys_pressed["w"] && player.y > 0) {
        player_movement.move_up();
    } 
    if (keys_pressed["d"] && player.x+consts.PLAYER_RADIUS*2 < ctx.canvas.width) {
        player_movement.move_right();
    }
    if (keys_pressed["a"] && player.x > 0) {
        player_movement.move_left();
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
            var b_x = player.x+consts.PLAYER_RADIUS*2;
            var b_y = player.y;
            var new_pos = rotate(new Point(b_x+consts.BULLET_SPEED, b_y+consts.BULLET_SPEED), new Point(b_x, b_y), player.weapon_angle+consts.WEAPON_IDLE_ANGLE);
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

function handle_misc() {
    player.weapon_src = weapon_image.src;
}

function update(delta_time) {
    handle_keys(delta_time);
    handle_bullets(delta_time);
    handle_misc();
}

function die() {
    if (player.alive) {
        player.alive = false;
        player_death_time = new Date().getTime();
    }

}

window.onload = async () => {
    html_events();
    var delta_time = 0.0;
    var start = 0;
    var finish = 0;
    for (;;) {
        start = new Date().getTime();
        socket.emit("get-data", player);
        render.clear(consts.BACKGROUND_COLOR);
        // draw here
        if (player.alive) {
            update(delta_time);
        } 

        player_movement.update(delta_time, render.get_width(), render.get_height());
        var new_pos = player_movement.get_coords();
        player.x = new_pos.x;
        player.y = new_pos.y;
        draw();


        await sleep(consts.UPDATE_RATE);
        finish = new Date().getTime();
        delta_time = (finish - start) / 1000;
    }
};
