const express = require("express"); //for accessing express
const socket = require("socket.io");//for accessing socket.io

const app = express(); //Initialized and server ready

app.use(express.static("public")); //for displaying index.html file

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {      //For listening to port & connecting with server
    console.log("Listening to port" + port);
})

let io = socket(server); //initializing socket

io.on("connection", (socket) => {          
    console.log("Made socket connection");
    // Received data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        
        // Now transfer data to all connected computers(clients)
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})