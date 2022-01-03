

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

export { 
    sleep,
    get_random_choice,
    get_random_int,
    to_radians
};