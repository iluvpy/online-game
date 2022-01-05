import { get_player_image, sleep } from "./util.js";
import * as consts from "./constants.js";
import base_player from "./player.js";
import Renderer from "./renderer.js";
import MovementManager from "./movement.js";
import html_events from "./events.js";
import KeysHandler from "./keys.js";
import GameSocket from "./socket.js";


// html elems
const canvas = document.getElementById("display");
const username_inp = document.getElementById("name-inp");
const rip_image = document.getElementById("rip-img");
const weapon_image = document.getElementById("weapon");
// variables
var player = base_player;
var player_death_time = 0; // when the player died
var ctx = canvas.getContext("2d");
ctx.canvas.width = consts.CANVAS_WIDTH;
ctx.canvas.height = consts.CANVAS_HEIGHT;
username_inp.value = player.name;
const player_movement = new MovementManager(player.x, player.y);
const render = new Renderer(ctx);
const keys = new KeysHandler();
const game_socket = new GameSocket();


window.onload = async () => {
    html_events();
    var delta_time = 0.0;
    var start = 0;
    var finish = 0;
    for (;;) {
        start = new Date().getTime();
        game_socket.update(player);
        render.clear(consts.BACKGROUND_COLOR);
        // draw here
        update(delta_time);
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




username_inp.addEventListener("input", (ev) => {
    keys.press(ev.data) = false; // dont allow key presses while typing name
    if (username_inp.value.length <= consts.MAX_NAME_SIZE) {
        player.name = username_inp.value;
    }
});

function draw() {
    
    draw_player_data(player, true);

    for (var player_id in game_socket.player_data) {
        if (player_id !== game_socket.id()) {
            const other_player = game_socket.player_data[player_id];
            draw_player_data(other_player, false);
        }
    }
    
    render.draw_text(`Players: ${game_socket.number_of_players()}`, 10, 20, "16px serif");

    if (!player.alive) {
        var now = new Date().getTime();
        var diff = now - player_death_time;
        var text = `Respawn in ${Math.floor((consts.RESPAWN_TIME-diff)/1000)}`  
        render.draw_center_text(text, "48px serif");
        if (diff > consts.RESPAWN_TIME) {
            player.alive = true;
        }
    }

}



function draw_player_data(player_obj, is_client) {
    // draw player name
    render.draw_text(
        player_obj.alive ? player_obj.name : "DEAD", 
        player_obj.x-consts.PLAYER_RADIUS, 
        player_obj.y-consts.PLAYER_RADIUS*2);
    // draw player body 
    render.draw_player(player_obj, rip_image);
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


function handle_misc() {
    player.weapon_src = weapon_image.src;
}

function update(delta_time) {
    if (player.alive) {
        keys.handle_keys(delta_time, player, player_movement);
    }
    keys.handle_bullets(delta_time, player);
    handle_misc();
}

function die() {
    if (player.alive) {
        player.alive = false;
        player_death_time = new Date().getTime();
        player.died++;
    }
}

