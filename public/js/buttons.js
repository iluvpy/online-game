"use strict";
exports.__esModule = true;
exports.ImageButton = exports.RotationOptionButtons = void 0;
var constants_js_1 = require("./constants.js");
var shapes_js_1 = require("./shapes.js");
var RotationOptionButtons = /** @class */ (function () {
    function RotationOptionButtons() {
        var _this = this;
        this.option_button1 = document.getElementById("option-button1");
        this.option_button2 = document.getElementById("option-button2");
        var BASE_BORDER = this.option_button1.style.border;
        this.option_button1.style.border = constants_js_1.OPTION_BUTTON_BORDER;
        this.mouse_rotation = true;
        var on_click = function (image, is_btn1) {
            var border = constants_js_1.OPTION_BUTTON_BORDER;
            console.log("border before change: ".concat(image.style.border));
            if (image.style.border !== border) {
                console.log("setting border to new color");
                image.style.border = border;
                if (is_btn1) {
                    _this.mouse_rotation = true;
                    _this.option_button2.style.border = BASE_BORDER;
                }
                else {
                    _this.mouse_rotation = false;
                    _this.option_button1.style.border = BASE_BORDER;
                }
            }
            else {
                console.log("setting border back to base color");
                image.style.border = BASE_BORDER;
                if (is_btn1) {
                    _this.option_button2.style.border = border;
                    _this.mouse_rotation = false;
                }
                else {
                    _this.option_button1.style.border = border;
                    _this.mouse_rotation = true;
                }
            }
        };
        this.option_button1.addEventListener("click", function (ev) {
            on_click(_this.option_button1, true);
        });
        this.option_button2.addEventListener("click", function (ev) {
            on_click(_this.option_button2, false);
        });
    }
    // returns true if using mouse movement and false if not
    RotationOptionButtons.prototype.using_mouse_rotation = function () {
        return this.mouse_rotation;
    };
    return RotationOptionButtons;
}());
exports.RotationOptionButtons = RotationOptionButtons;
var ImageButton = /** @class */ (function () {
    function ImageButton(x, y, image_path, outline_width, outline_color, background_color) {
        var _this = this;
        this.active = false;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = image_path;
        this.background_rect = new shapes_js_1.Rect(x, y, this.image.width, this.image.height, background_color);
        this.outline_rect = new shapes_js_1.Rect(x - outline_width, y - outline_width, this.image.width + outline_width * 2, this.image.height + outline_width * 2, outline_color);
        this.image.onclick = function (ev) {
            _this.active = !_this.active;
        };
    }
    ImageButton.prototype.draw = function (render) {
        render.draw_gui_rect(this.background_rect);
        if (this.active) {
            render.draw_gui_rect(this.outline_rect);
        }
        render.draw_image(this.image, this.x, this.y);
    };
    return ImageButton;
}());
exports.ImageButton = ImageButton;
