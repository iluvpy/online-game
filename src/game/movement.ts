import { PLAYER_FRICTION, PLAYER_RADIUS, PLAYER_SPEED } from "./constants.js";
import { Point } from "./shapes.js";

class MovementManager {
    x: number
    y: number
    dy: number
    dx: number
    constructor(player_x: number, player_y: number) {
        this.x = player_x;
        this.y = player_y;
        this.dy = 0;
        this.dx = 0;
    }

    update(delta_time: number, canvas_width: number, canvas_height: number) {
        const next_x = this.x + this.dx * delta_time; 
        const next_y = this.y + this.dy * delta_time; 
        if (next_x-PLAYER_RADIUS > 0 && next_x < canvas_width-PLAYER_RADIUS) {
            this.x = next_x;
        }
        if (next_y-PLAYER_RADIUS > 0 && next_y < canvas_height-PLAYER_RADIUS) {
            this.y = next_y;
        }
        
        this.dx *= PLAYER_FRICTION;
        this.dy *= PLAYER_FRICTION;
    }

    move_up() {
        this.dy -= PLAYER_SPEED;
    }

    move_down() {
        this.dy += PLAYER_SPEED;
    }

    move_left() {
        this.dx -= PLAYER_SPEED;
    }

    move_right() {
        this.dx += PLAYER_SPEED;
    }

    get_coords() {
        return new Point(this.x, this.y);
    }
}

export default MovementManager;