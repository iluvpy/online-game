import { get_random_choice, get_random_int, sleep } from "./util.js";
import * as consts from "./constants.js";
import Renderer from "./renderer.js";
console.log("game");

const socket = io(window.location.href);
// html elems
const canvas = document.getElementById("display");
const username_inp = document.getElementById("name-inp");
const rifle_image = document.getElementById("rifle");
// game constants
const colors = ["green", "red", "yellow", "black", "gray", "blue", "aqua", "purple", "orange"];

// variables
var keys_pressed = {};
var ctx = canvas.getContext("2d");
ctx.canvas.width = 1280;
ctx.canvas.height = 720;
var player_data = null;
var player = {
    x: 100,
    y: 100,
    color: get_random_choice(colors),
    name: `player${get_random_int(0, 100)}`,
    weapon_angle: 0
};
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

function draw() {
    render.draw_text(player.name, player.x-5, player.y-10);
    draw_player(player);   
    render.draw_image(
        rifle_image,
        player.x+consts.WEAPON_DISTANCE.x, 
        player.y+consts.WEAPON_DISTANCE.y, 
        player.weapon_angle);

    for (var player_id in player_data) {
        if (player_id !== socket.id) {
            const other_player = player_data[player_id];
            render.draw_text(
                other_player.name, 
                other_player.x-consts.PLAYER_RADIUS, 
                other_player.y-consts.PLAYER_RADIUS);
            draw_player(other_player);
            render.draw_image(
                rifle_image, 
                other_player.x+consts.WEAPON_DISTANCE.x, 
                other_player.y+consts.WEAPON_DISTANCE.y, 
                other_player.weapon_angle);

        }
    }
    if (player_data !== null)
        render.draw_text(`players: ${Object.keys(player_data).length}`, 10, 20, "16px serif");
}


function update(delta_time) {
    if (keys_pressed["s"]) {
        if (player.y+consts.PLAYER_RADIUS*2 < ctx.canvas.height)
            player.y += consts.PLAYER_SPEED * delta_time;
    }
    if (keys_pressed["w"]) {
        if (player.y > 0)
            player.y -= consts.PLAYER_SPEED * delta_time;
    } 
    if (keys_pressed["d"]) {
        if (player.x+consts.PLAYER_RADIUS*2 < ctx.canvas.width)
            player.x += consts.PLAYER_SPEED * delta_time;
    }
    if (keys_pressed["a"]) {
        if (player.x > 0)
            player.x -= consts.PLAYER_SPEED * delta_time;
    }
    if (keys_pressed["ArrowRight"])
        player.weapon_angle += consts.WEAPON_ANGLE_SPEED * delta_time;
    if (keys_pressed["ArrowLeft"])
        player.weapon_angle -= consts.WEAPON_ANGLE_SPEED * delta_time;
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
        update(delta_time);
        draw();

        await sleep(consts.UPDATE_RATE);
        finish = new Date().getTime();
        delta_time = (finish - start) / 1000;
    }
};
