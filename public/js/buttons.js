import { OPTION_BUTTON_BORDER } from "./constants.js";


class RotationOptionButtons {
    constructor() {
        this.option_button1 = document.getElementById("option-button1");
        this.option_button2 = document.getElementById("option-button2");
        const BASE_BORDER = this.option_button1.style.border;
        this.option_button1.style.border = OPTION_BUTTON_BORDER;
        this.mouse_rotation = true;
        const on_click = (image, is_btn1) => {
            const border = OPTION_BUTTON_BORDER;
            console.log(`border before change: ${image.style.border}`)
            if (image.style.border !== border) {
                console.log("setting border to new color");
                image.style.border = border;
                if (is_btn1) {
                    this.mouse_rotation = true;
                    this.option_button2.style.border = BASE_BORDER;
                } 
                else {
                    this.mouse_rotation = false;
                    this.option_button1.style.border = BASE_BORDER;
                }
            } 
            else {
                console.log("setting border back to base color");
                image.style.border = BASE_BORDER;
                if (is_btn1) {
                    this.option_button2.style.border = border;
                    this.mouse_rotation = false;
                } 
                else {
                    this.option_button1.style.border = border;
                    this.mouse_rotation = true;
                }
                
            }
        }
        this.option_button1.addEventListener("click", (ev) => {
            on_click(this.option_button1, true);
        });
        this.option_button2.addEventListener("click", (ev) => {
            on_click(this.option_button2, false);
        });
    }

    // returns true if using mouse movement and false if not
    using_mouse_rotation() {
        return this.mouse_rotation;
    }
}


export { RotationOptionButtons };