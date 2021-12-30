import { get_random_choice, sleep } from "./util.js";
console.log("game");

const socket = io(window.location.href);
const canvas = document.getElementById("display");
const player_count = document.getElementById("player-count");
const colors = ["green", "red", "yellow", "black", "gray", "blue", "aqua", "purple", "orange"];
var keys_pressed = {};
var ctx = canvas.getContext("2d");
const UPDATE_RATE = 5; // updates each 5ms
const PLAYER_RADIUS = 10;
var player_data = null;
var player = {
    x: 100,
    y: 100,
    color: get_random_choice(colors)
};


socket.on("data", (my_data) => {
    player_data = my_data;
})

window.onkeydown = (ev) => {
    keys_pressed[ev.key] = true;
};
window.onkeyup = (ev) => {
    keys_pressed[ev.key] = false;
}

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
    
    draw_text(socket.id, player.x-5, player.y-10);
    draw_player(player);

    for (var player_id in player_data) {
        if (player_id !== socket.id) {
            const other_player = player_data[player_id];
            draw_text(player_id, other_player.x-5, other_player.y-10);
            draw_player(other_player);
        }
    }
    if (player_data !== null) 
        player_count.innerHTML = `players: ${Object.keys(player_data).length}`; // player count
}


function update() {
    if (keys_pressed["s"]) {
        player.y += 1;
    }
    if (keys_pressed["w"]) {
        player.y -= 1;
    } 
    if (keys_pressed["d"]) {
        player.x += 1;
    }
    if (keys_pressed["a"]) {
        player.x -= 1;
    }
}



(async function main() {
    for (;;) {
        await sleep(UPDATE_RATE);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        update();
        draw();
        socket.emit("get-data", socket.id, player);
    }
})();