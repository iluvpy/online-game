import { get_random_choice, get_random_int } from "./util.js";
import {COLORS} from "./constants.js";
// the player object
export default {
    x: 100,
    y: 100,
    color: get_random_choice(COLORS),
    name: `player${get_random_int(0, 100)}`,
    weapon_angle: 0,
    bullets: []
};