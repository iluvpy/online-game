import { get_random_choice, get_random_int, sleep } from "./util.js";
console.log("game");

const socket = io(window.location.href);
const canvas = document.getElementById("display");
const player_count = document.getElementById("player-count");
const username_inp = document.getElementById("name-inp");
const colors = ["green", "red", "yellow", "black", "gray", "blue", "aqua", "purple", "orange"];
const MAX_NAME_SIZE = 20;
const UPDATE_RATE = 1; // rate at which the game updates
const PLAYER_RADIUS = 10;
const PLAYER_SPEED = 200;
var keys_pressed = {};
var ctx = canvas.getContext("2d");
var player_data = null;
var player = {
    x: 100,
    y: 100,
    color: get_random_choice(colors),
    name: `player${get_random_int(0, 100)}`
};
username_inp.value = player.name;


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
    if (username_inp.value.length <= MAX_NAME_SIZE)
        player.name = username_inp.value;
})

function draw_text(text, x, y) {
    ctx.fillStyle = "black";
    ctx.font = '11px serif';
    ctx.fillText(text, x, y);
}
  
function draw_player(player_obj) {
    ctx.beginPath();
    ctx.arc(player_obj.x+PLAYER_RADIUS, player_obj.y+PLAYER_RADIUS, PLAYER_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = player_obj.color;
    ctx.fill(); 
}

function draw() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    
    draw_text(player.name, player.x-5, player.y-10);
    draw_player(player);

    for (var player_id in player_data) {
        if (player_id !== socket.id) {
            const other_player = player_data[player_id];
            draw_text(other_player.name, other_player.x-5, other_player.y-10);
            draw_player(other_player);
        }
    }
    if (player_data !== null) 
        player_count.innerHTML = `players: ${Object.keys(player_data).length}`; // player count
}


function update(delta_time) {
    if (keys_pressed["s"]) {
        player.y += PLAYER_SPEED * delta_time;
    }
    if (keys_pressed["w"]) {
        player.y -= PLAYER_SPEED * delta_time;
    } 
    if (keys_pressed["d"]) {
        player.x += PLAYER_SPEED * delta_time;
    }
    if (keys_pressed["a"]) {
        player.x -= PLAYER_SPEED * delta_time;
    }
}



(async function main() {
    var delta_time = 0.0;
    var start = 0;
    var finish = 0;
    for (;;) {
        start = new Date().getTime();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        update(delta_time);
        draw();
        socket.emit("get-data", socket.id, player);
        await sleep(UPDATE_RATE);
        finish = new Date().getTime();
        delta_time = (finish - start) / 1000;
    }
})();