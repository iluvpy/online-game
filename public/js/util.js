"use strict";
exports.__esModule = true;
exports.get_time = exports.void_function = exports.get_player_image = exports.get_random_player_name = exports.get_request = exports.rotate = exports.to_degrees = exports.to_radians = exports.get_random_int = exports.get_random_choice = exports.sleep = void 0;
function get_random_player_name() {
    return "player".concat(get_random_int(0, 100));
}
exports.get_random_player_name = get_random_player_name;
function sleep(ms) {
    return new Promise(function (res) { setTimeout(res, ms); });
}
exports.sleep = sleep;
function get_random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
exports.get_random_int = get_random_int;
function get_random_choice(array) {
    return array[get_random_int(0, array.length)];
}
exports.get_random_choice = get_random_choice;
function to_radians(degrees) {
    return degrees * (Math.PI / 180);
}
exports.to_radians = to_radians;
function to_degrees(radians) {
    return radians * (180 / Math.PI);
}
exports.to_degrees = to_degrees;
function rotate(point, origin, angle) {
    var radians = to_radians(angle);
    var c = Math.cos(radians);
    var s = Math.sin(radians);
    return {
        x: c * (point.x - origin.x) - s * (point.y - origin.y) + origin.x,
        y: s * (point.x - origin.x) + c * (point.y - origin.y) + origin.y
    };
}
exports.rotate = rotate;
function get_request(url, callback) {
    var xml_http = new XMLHttpRequest();
    xml_http.onreadystatechange = function () {
        if (xml_http.readyState == 4 && xml_http.status == 200)
            callback(xml_http.responseText);
    };
    xml_http.open("GET", url, true); // true for asynchronous 
    xml_http.send(null);
}
exports.get_request = get_request;
function get_player_image(src) {
    var html_img = new Image();
    html_img.src = src;
    return html_img;
}
exports.get_player_image = get_player_image;
function void_function() { }
exports.void_function = void_function;
function get_time() {
    return new Date().getTime();
}
exports.get_time = get_time;
