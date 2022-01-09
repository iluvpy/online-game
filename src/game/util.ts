import { Point } from "./shapes";


function get_random_player_name() {
    return `player${get_random_int(0, 100)}`;
}

function sleep(ms: number) {
    return new Promise(res => {setTimeout(res, ms)});
}

function get_random_int(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function get_random_choice(array: Array<any>) {
    return array[get_random_int(0, array.length)];
}
  

function to_radians(degrees: number) {
    return degrees * (Math.PI/180);
}

function to_degrees(radians: number) {
    return radians * (180/Math.PI);
}

function rotate(point: Point, origin: Point, angle: number) {
    var radians = to_radians(angle);
    var c = Math.cos(radians);
    var s = Math.sin(radians);
    return { // aplying rotation matrix
        x: c * (point.x-origin.x) - s * (point.y-origin.y) + origin.x,
        y: s * (point.x-origin.x) + c * (point.y-origin.y) + origin.y
    }
}

function get_request(url: string, callback: Function) {
    var xml_http = new XMLHttpRequest();
    xml_http.onreadystatechange = () => { 
        if (xml_http.readyState == 4 && xml_http.status == 200)
            callback(xml_http.responseText);
    }
    xml_http.open("GET", url, true); // true for asynchronous 
    xml_http.send(null);
}

function get_player_image(src: string) {
    const html_img = new Image();
    html_img.src = src;
    return html_img;
}

function void_function() {}
function get_time(): number{
    return new Date().getTime();
}
export { 
    sleep,
    get_random_choice,
    get_random_int,
    to_radians,
    to_degrees,
    rotate,
    get_request,
    get_random_player_name,
    get_player_image,
    void_function,
    get_time
};