import Color from "./color";
import { OPTION_BUTTON_BORDER } from "./constants";
import { Rect } from "./shapes";
import Renderer from "./renderer";

class RotationOptionButtons {
    option_button1: HTMLElement
    option_button2: HTMLElement
    mouse_rotation: boolean
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


class ImageButton {
    active: boolean
    x: number
    y: number
    image: HTMLImageElement
    background_rect: Rect
    outline_rect: Rect

    constructor(x: number, y: number, image_path: string, outline_width: number, outline_color: Color, background_color: Color) {
        this.active = false;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = image_path;
        this.background_rect = new Rect(x, y, this.image.width, this.image.height, background_color);
        this.outline_rect = new Rect(x-outline_width, y-outline_width, this.image.width+outline_width*2, this.image.height+outline_width*2, outline_color);

        this.image.onclick = (ev) => {
            this.active = !this.active;
        }
    }

    
    draw(render: Renderer) {
        render.draw_gui_rect(this.background_rect);
        if (this.active) {
            render.draw_gui_rect(this.outline_rect);
        }
        render.draw_image(this.image, this.x, this.y);
    }

}


export { RotationOptionButtons, ImageButton };