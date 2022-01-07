import Color from "./color.js";

class Point {
    constructor(x, y) {
        this.x = x 
        this.y = y;
    }
}

class Rect {
    constructor(x, y, w, h, color=Color()) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    get_color() {
        return this.color.get_color();
    }
}
export { Point, Rect };