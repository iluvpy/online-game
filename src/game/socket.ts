

export default class GameSocket {
    player_data: Object
    socket: any
    constructor() {
        this.player_data = null;
        // @ts-ignore
        this.socket = io(window.location.href);
        // pull data from server
        this.socket.on("data", (my_data) => {
            this.player_data = my_data;
        });
    }

    update(player: Object) {
        this.socket.emit("get-data", player);
    }    

    id() {
        return this.socket.id;
    }

    number_of_players() {
        if (this.player_data !== null) {
            return Object.keys(this.player_data).length;
        }
        return 0;
    }
}