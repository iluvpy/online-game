"use strict";
exports.__esModule = true;
var GameSocket = /** @class */ (function () {
    function GameSocket() {
        var _this = this;
        this.player_data = null;
        this.socket = io(window.location.href);
        // pull data from server
        this.socket.on("data", function (my_data) {
            _this.player_data = my_data;
        });
    }
    GameSocket.prototype.update = function (player) {
        this.socket.emit("get-data", player);
    };
    GameSocket.prototype.id = function () {
        return this.socket.id;
    };
    GameSocket.prototype.number_of_players = function () {
        if (this.player_data !== null) {
            return Object.keys(this.player_data).length;
        }
        return 0;
    };
    return GameSocket;
}());
exports["default"] = GameSocket;
