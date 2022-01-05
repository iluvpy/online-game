import { get_random_choice, get_random_int, get_random_player_name } from "./util.js";
import {CANVAS_HEIGHT, CANVAS_WIDTH, COLORS, WEAPONS} from "./constants.js";

function generate_player() {
    return {
        x: get_random_int(100, CANVAS_WIDTH-100),
        y: get_random_int(100, CANVAS_HEIGHT-100),
        color: get_random_choice(COLORS),
        name: get_random_player_name(),
        weapon_angle: 0,
        weapon_src: WEAPONS[0],
        bullets: [],
        alive: true,
        died: 0
    };
}
export default generate_player();
export {generate_player};
