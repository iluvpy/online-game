import { sleep, get_time, get_player_image } from "./util.js";
import * as consts from "./constants.js";
import base_player from "./player.js";
import Renderer from "./renderer.js";
import MovementManager from "./movement.js";
import html_events from "./events.js";
import KeysHandler from "./keys.js";
import GameSocket from "./socket.js";
import { ImageButton, RotationOptionButtons } from "./buttons.js";
import Color from "./color.js";

// html elems
const canvas = document.getElementById("display") as HTMLCanvasElement;
const username_inp = document.getElementById("name-inp") as HTMLInputElement;
const weapon_image = document.getElementById("weapon") as HTMLImageElement;
// variables
var player = base_player;
var player_death_time = 0; // when the player died
var respawn_prot_start_time = 0;
var ctx = canvas.getContext("2d");
ctx.canvas.width = consts.CANVAS_WIDTH;
ctx.canvas.height = consts.CANVAS_HEIGHT;
username_inp.value = player.name;
const player_movement = new MovementManager(player.x, player.y);
const render = new Renderer(ctx);
const keys = new KeysHandler();
const game_socket = new GameSocket();
const rotation_options = new RotationOptionButtons();


// init image buttons
const image_btn1 = new ImageButton(keys, 200, 500, "/img/cursor.png", 10, new Color(255, 255, 255), new Color(44, 47, 51));
window.onload = async () => {
    html_events();
    var delta_time = 0.0;
    var start = 0;
    var finish = 0;
    for (;;) {
        start = get_time();
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
        finish = get_time();
        delta_time = (finish - start) / 1000;
    }
};


username_inp.addEventListener('keyup', (e: KeyboardEvent) => { 
    keys.set_key(e.key, false); // dont allow key presses while typing name
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
            const other_player = game_socket.player_data[player_id];
            render.draw_player_data(other_player, player, die);
        }
    }
    
    render.draw_text(`Players: ${game_socket.number_of_players()}`, 10, 20, "16px serif");

    if (!player.alive) {
        var now = get_time();
        var diff = now - player_death_time;
        var text = `Respawn in ${Math.floor((consts.RESPAWN_TIME-diff)/1000)}`  
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
        const pos = keys.get_mouse_pos();
        console.log(`mouse pos ${pos.x} ${pos.y}`);
    }
}

function update(delta_time: number) {
    if (player.alive) {
        keys.handle_movement(player_movement);
        keys.handle_bullet_key(player);
        keys.handle_weapon_rotation(delta_time, player, rotation_options.using_mouse_rotation(), render);
       

    }
    keys.handle_bullets(delta_time, player);
    handle_misc();
}

function has_respawn_prot() {
    var now = get_time();
    return now - respawn_prot_start_time < consts.RESPAWN_PROT_TIME;
}

function die() {
    var now = get_time();
    if (player.alive && !player.respawn_protection) {
        player.alive = false;
        player_death_time = now;
        player.death_count++;
    }
}

