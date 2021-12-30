import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = http.Server(app);
const port = 3000;
const io = new Server({
    cors: { origin: "*"}
});

io.attach(server);

var player_data = {};

//Whenever someone connects this gets executed
io.on('connection', socket => {
    console.log('A user connected');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
       delete player_data[socket.id]
    });

    socket.on("get-data", (id, data) => {
        //console.log(`data pulled! id: ${id}, p data: ${data}`);
        if (!(id in player_data)) {
            console.log(`new user with id ${id} joined!`);
        }
        if (id !== null)
            player_data[id] = data;
        socket.emit("data", player_data);
        
    });
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "index.html"));
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
