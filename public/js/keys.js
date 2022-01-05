import { 
    PLAYER_RADIUS,
    WEAPON_ANGLE_SPEED,
    BULLET_INTERVAL,
    BULLET_SPEED,
    WEAPON_IDLE_ANGLE,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from "./constants.js";

import { get_time, rotate } from "./util.js";

import { Point } from "./shapes.js";

export default class KeysHandler {
    constructor() {
        this.keys_pressed = {};

        window.onkeydown = (ev) => {
            this.keys_pressed[ev.key] = true;
        };
        window.onkeyup = (ev) => {
            this.keys_pressed[ev.key] = false;
        }

        this.last_bullet_shot = 0;
    }

    handle_keys(delta_time, player, player_movement) {
        if (this.keys_pressed["s"]) {
            player_movement.move_down();
        }
        if (this.keys_pressed["w"]) {
            player_movement.move_up();
        } 
        if (this.keys_pressed["d"]) {
            player_movement.move_right();
        }
        if (this.keys_pressed["a"]) {
            player_movement.move_left();
        }
        if (this.keys_pressed["ArrowRight"]) {
            player.weapon_angle += WEAPON_ANGLE_SPEED * delta_time;
            if (player.weapon_angle > 360) player.weapon_angle = 0;
        }
        if (this.keys_pressed["ArrowLeft"]) {
            player.weapon_angle -= WEAPON_ANGLE_SPEED * delta_time;
            if (player.weapon_angle < 0) player.weapon_angle = 360;
        }
        
        // space
        if (this.keys_pressed[" "]) {
            // add bullet
            const now = get_time();
            if (now - this.last_bullet_shot > BULLET_INTERVAL) {
                var b_x = player.x+PLAYER_RADIUS*2;
                var b_y = player.y;
                var new_pos = rotate(new Point(b_x+BULLET_SPEED, b_y+BULLET_SPEED), new Point(b_x, b_y), player.weapon_angle+WEAPON_IDLE_ANGLE);
                player.bullets.push({
                    x: b_x, 
                    y: b_y,
                    x_speed: b_x-new_pos.x,
                    y_speed: b_y-new_pos.y
                });
                this.last_bullet_shot = now;
            }
        }
    
        // for debugging // XXX remove later
        if (this.keys_pressed["h"]) {
            console.log(Object.keys(this.keys_pressed))
        }
    }

    // updates the position of a bullets
    handle_bullets(delta_time, player) {
        var i = 0;
        player.bullets.forEach(bullet => {
            bullet.x += bullet.x_speed * delta_time;
            bullet.y += bullet.y_speed * delta_time;   
            i++;
        });
        player.bullets = player.bullets.filter(bullet => !(bullet.x > CANVAS_WIDTH || bullet.x < 0 || bullet.y > CANVAS_HEIGHT || bullet.y < 0));  
    }

    set_key(key, val) {
        this.keys_pressed[key] = val;
    }
}
