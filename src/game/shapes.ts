import Color from "./color.js";

class Point {
    x: number
    y: number
    constructor(x, y) {
        this.x = x 
        this.y = y;
    }
}

class Rect {
    x: number
    y: number
    w: number
    h: number
    color: Color
    constructor(x: number, y: number, w: number, h: number, color= new Color()) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    get_color() {
        return this.color;
    }
}
export { Point, Rect };