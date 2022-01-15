import { 
    PLAYER_RADIUS,
    WEAPON_ANGLE_SPEED,
    BULLET_INTERVAL,
    BULLET_SPEED,
    WEAPON_IDLE_ANGLE,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    USED_KEYS_WITH_DEFAULT,
    BULLET_ANGLE_OFFSET
} from "./constants.js";

import { get_time, rotate, to_degrees } from "./util.js";

import { Point } from "./shapes.js";

export default class KeysHandler {
    keys_pressed: Object
    mouse_pos: Point
    event_callbacks: Object
    last_bullet_shot: number
    mouse_down: boolean
    constructor() {
        this.keys_pressed = {};
        this.mouse_pos = new Point(0, 0);
        this.event_callbacks = {}; // "mouseup", "mousedown", "keydown", etc
        this.mouse_down = false;
        window.onkeydown = (ev) => {
            this.keys_pressed[ev.key] = true;
            if (ev.key in USED_KEYS_WITH_DEFAULT) {
                ev.preventDefault();
            }

            if ("keydown" in this.event_callbacks) {
                const callbacks: Array<Function> = this.event_callbacks["keydown"];
                for (var callback of callbacks) {
                    callback(ev);
                }
            }
        };
        window.onkeyup = (ev) => {
            this.keys_pressed[ev.key] = false;
            if (ev.key in USED_KEYS_WITH_DEFAULT) {
                ev.preventDefault();
            }
            if ("keyup" in this.event_callbacks) {
                const callbacks: Array<Function> = this.event_callbacks["keyup"];
                for (var callback of callbacks) {
                    callback(ev);
                }
            }
        }

        window.onmousemove = (ev: MouseEvent) => {
            this.mouse_pos.x = ev.x;
            this.mouse_pos.y = ev.y;
            if ("mousemove" in this.event_callbacks) {
                const callbacks: Array<Function> = this.event_callbacks["mousemove"];
                for (var callback of callbacks) {
                    callback(ev);
                }
            }
        }

        window.onmouseup = (ev: MouseEvent) => {
            this.mouse_down = false;
            if ("mouseup" in this.event_callbacks) {
                const callbacks: Array<Function> = this.event_callbacks["mousup"];
                for (var callback of callbacks) {
                    callback(ev);
                }
            }
        }

        window.onmousedown = (ev: MouseEvent) => {
            this.mouse_down = true;
            if ("mousedown" in this.event_callbacks) {
                const callbacks: Array<Function> = this.event_callbacks["mousedown"];
                for (var callback of callbacks) {
                    callback(ev);
                }
            }
        }

        this.last_bullet_shot = 0;
    }

    handle_movement(player_movement) {
        if (this.is_pressed("s")) {
            player_movement.move_down();
        }
        if (this.is_pressed("w")) {
            player_movement.move_up();
        } 
        if (this.is_pressed("d")) {
            player_movement.move_right();
        }
        if (this.is_pressed("a")) {
            player_movement.move_left();
        }

        // for debugging // XXX remove later
        if (this.keys_pressed["h"]) {
            console.log(Object.keys(this.keys_pressed))
        }
    }

    handle_weapon_rotation(delta_time, player, mouse_rotation, render) {
        if (mouse_rotation) {
            /**
             * i just want to say that i have no idea how this is working or why this is 
             * working and that i am thankful that it is
             * i didnt follow any formula or anything and it somehow worked 
             */
            const opposite = this.mouse_pos.y-player.y;
            const adjacent = player.x-this.mouse_pos.x;
            const hypotenuse = Math.sqrt(adjacent*adjacent + opposite*opposite);
            var rotation = 360-to_degrees(Math.asin(opposite/hypotenuse)) - WEAPON_IDLE_ANGLE;
            if (adjacent < 0) {
                rotation = 360-rotation-90;
            }
            player.weapon_angle = rotation;
        }
        else {
            if (this.is_pressed("ArrowRight")) {
                player.weapon_angle += WEAPON_ANGLE_SPEED * delta_time;
                if (player.weapon_angle > 360) player.weapon_angle = 0;
            }
            if (this.is_pressed("ArrowLeft")) {
                player.weapon_angle -= WEAPON_ANGLE_SPEED * delta_time;
                if (player.weapon_angle < 0) player.weapon_angle = 360;
            }
        }
    }

    handle_bullet_key(player) {
        // space
        if (this.is_pressed(" ")) {
            // add bullet
            const now = get_time();
            if (now - this.last_bullet_shot > BULLET_INTERVAL) {
                var b_x = player.x+PLAYER_RADIUS*2;
                var b_y = player.y;
                var new_pos = rotate(new Point(b_x+BULLET_SPEED, b_y+BULLET_SPEED), new Point(b_x, b_y), player.weapon_angle+WEAPON_IDLE_ANGLE-BULLET_ANGLE_OFFSET);
                player.bullets.push({
                    x: b_x, 
                    y: b_y,
                    x_speed: b_x-new_pos.x,
                    y_speed: b_y-new_pos.y
                });
                this.last_bullet_shot = now;
            }
        }
    }

    // updates the position of a bullets
    handle_bullets(delta_time: number, player: any) {
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

    is_pressed(key) {
        if (!(key in this.keys_pressed)) return false;
        return this.keys_pressed[key];
    }

    get_mouse_pos() {
        return this.mouse_pos;
    }

    is_mouse_down() {
        return this.mouse_down;
    }

    add_callback(event_name: string, callback: Function) {
        if (event_name in this.event_callbacks) {
            this.event_callbacks[event_name].push(callback);
        } 
        else {
            this.event_callbacks[event_name] = Array();
            this.event_callbacks[event_name].push(callback);
        }
    }
}
