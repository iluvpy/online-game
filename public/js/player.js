import { get_random_choice, get_random_int } from "./util.js";
import {CANVAS_HEIGHT, CANVAS_WIDTH, COLORS} from "./constants.js";

function generate_player() {
    return {
        x: get_random_int(100, CANVAS_WIDTH-100),
        y: get_random_int(100, CANVAS_HEIGHT-100),
        color: get_random_choice(COLORS),
        name: `player${get_random_int(0, 100)}`,
        weapon_angle: 0,
        bullets: []
    };
}
export default generate_player();
export {generate_player};
