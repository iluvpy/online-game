

function sleep(ms) {
    return new Promise(res => {setTimeout(res, ms)});
}

function get_random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function get_random_choice(array) {
    return array[get_random_int(0, array.length)];
}
  

function to_radians(degrees) {
    return degrees * (Math.PI/180);
}

function rotate(point, origin ,angle) {
    var radians = to_radians(angle);
    var c = Math.cos(radians);
    var s = Math.sin(radians);
    return { // aplying rotation matrix
        x: c * (point.x-origin.x) - s * (point.y-origin.y) + origin.x,
        y: s * (point.x-origin.x) + c * (point.y-origin.y) + origin.y
    }
}

function get_request(url, callback) {
    var xml_http = new XMLHttpRequest();
    xml_http.onreadystatechange = () => { 
        if (xml_http.readyState == 4 && xml_http.status == 200)
            callback(xml_http.responseText);
    }
    xml_http.open("GET", url, true); // true for asynchronous 
    xml_http.send(null);
}

export { 
    sleep,
    get_random_choice,
    get_random_int,
    to_radians,
    rotate,
    get_request
};