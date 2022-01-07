
export default class Color {
    color: string
    constructor(r=255, g=255, b=255) {
        this.color = `rgb(${r}, ${g}, ${b})`;
    }

    get_color() {
        return this.color;
    }
}