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
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
       delete player_data[socket.id]
    });

    socket.on("get-data", (data) => {
        const id = socket.id;
        //console.log(`data pulled! id: ${id}, p data: ${data}`);
        if (id !== null) {
            if (!(id in player_data)) {
                console.log(`${id} connected!`);
            }
            
                player_data[id] = data;
        }
        socket.emit("data", player_data);
        
    });

    socket.on("death", () => {
        delete player_data[id];
    });
});


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "index.html"));
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
