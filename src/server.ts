import express from "express";
import * as http from "node:http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log(`Connected to: ${socket.client}`);

    socket.on("someEvent", () => {
        socket.emit("someOtherEvent", { message: "Hello!" });
    });

    socket.on("disconnect", (socket) => {
        console.log(`Disconnected from ${socket}`);
    });
});

server.listen(8000, () => {
    console.log("Waiting for connections in port 8000");
});
