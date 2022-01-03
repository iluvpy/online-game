import { to_radians } from "./util.js";

class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw_text(text, x, y, font = "11px serif", color = "black") {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }

    draw_circle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill(); 
    }

    draw_image(image, x, y, angle=0) {
        var width = image.width;
        var height = image.height;
        var radians = to_radians(angle);
        this.ctx.translate(x, y);
        this.ctx.rotate(radians);
        this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
        this.ctx.rotate(-radians);
        this.ctx.translate(-x, -y);
    }

    get_width() {
        return this.ctx.canvas.width;
    }

    get_height() {
        return this.ctx.canvas.height;
    }
}

export default Renderer;