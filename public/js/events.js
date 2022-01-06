import { WEAPONS } from "./constants.js";

// adds event listeners to html elements
export default function html_events() {
    const weapon_image = document.getElementById("weapon");
    
    weapon_image.addEventListener("click", (ev) => {
        const src = weapon_image.src;
        var i = 0;
        for (var weapon_src of WEAPONS) {
            if (src.includes(weapon_src)) break;
            i++;
        }
        console.log(`i: ${i}`);
        if (i < WEAPONS.length-1) {
            weapon_image.src = WEAPONS[i+1];
        } 
        else {
            weapon_image.src = WEAPONS[0];
        }
    });

}