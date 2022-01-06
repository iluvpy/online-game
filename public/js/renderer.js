import { to_radians } from "./util.js";
import { PLAYER_RADIUS, BULLET_RADIUS, WEAPON_DISTANCE } from "./constants.js";
import { get_player_image } from "./util.js";

class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.death_image = document.getElementById("death-img");
    }

    clear(background_color) {
        this.ctx.fillStyle = background_color
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw_text(text, x, y, font = "11px serif", color = "white") {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }

    draw_center_text(text, font="11px serif", color = "white") {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, this.get_width() / 2, this.get_height() / 2);
        this.ctx.textAlign = "start";
    }

    draw_circle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill(); 
    }

    draw_rect(x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    draw_image(image, x, y, angle=0) {
        var width = image.width;
        var height = image.height;
        var radians = to_radians(angle);
        this.ctx.translate(x, y);
        this.ctx.rotate(radians);
        this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
        this.ctx.rotate(-radians);
        this.ctx.translate(-x, -y);
    }

    draw_player(player_obj) {
        if (player_obj.alive) {
            this.draw_circle(player_obj.x, player_obj.y, PLAYER_RADIUS, player_obj.color);
        }
        else {
            this.draw_image(
                this.death_image,
                player_obj.x,
                player_obj.y
            );
        }
    }

    draw_player_data(player_obj, client_player, on_hit) {
        // draw player name
        this.draw_text(
            player_obj.name, 
            player_obj.x-PLAYER_RADIUS, 
            player_obj.y-PLAYER_RADIUS*2);
        // draw player body 
        this.draw_player(player_obj);
        // draw player weapon
        if (player_obj.alive) { // dead people dont have a weapon
            this.draw_image(
                get_player_image(player_obj.weapon_src),
                player_obj.x+WEAPON_DISTANCE.x, 
                player_obj.y+WEAPON_DISTANCE.y, 
                player_obj.weapon_angle);
        }
    
        
        // draw bullets
        player_obj.bullets.forEach(bullet => {
            this.draw_circle(bullet.x, bullet.y, BULLET_RADIUS, "black");
            // if client was hit by a bullet that was shot by another player
            if (client_player !== null) {
                if (
                    bullet.x >= client_player.x-PLAYER_RADIUS && bullet.x <= client_player.x+PLAYER_RADIUS*2 &&
                    bullet.y >= client_player.y-PLAYER_RADIUS && bullet.y <= client_player.y+PLAYER_RADIUS*2
                ) {
                    on_hit();
                }
            }
            
        });
    }
    
    // list players by lowest death count to highest
    draw_player_list(player_data) {
        if (player_data === null) return;
        const list = {}; // player_name : death_count
        for (var key in player_data) {
            const player = player_data[key];
            list[player.name] = player.death_count;
        }
        const x  = 20;
        const font = "12px arial";
        this.draw_text("Deaths", x, 70, font);
        var start_y = 100;
        const y_separation = 20;
        const color = "white";
        for (var i = 0; i < 100; i++) {
            for (var player_name in list) {
                var death_count = list[player_name];
                if (death_count == i) {
                    this.draw_text(`${player_name}: ${death_count}`, x, start_y, font, color);
                    start_y += y_separation;
                }
            }
        }
    }
    

    get_width() {
        return this.ctx.canvas.width;
    }

    get_height() {
        return this.ctx.canvas.height;
    }
}

export default Renderer;