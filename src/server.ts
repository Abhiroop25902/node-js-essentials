import express from "express";
import * as http from "node:http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log(`Connected to: ${socket.id}`);

    socket.on("random", (data: SocketData) => {
        console.log(
            `Received random number from ${socket.id}: ${data.randomNumber}`,
        );
    });

    setInterval(() => {
        const data: SocketData = {
            randomNumber: Math.ceil(Math.random() * 100),
        };
        console.log(
            `Sending random number ${data.randomNumber} to ${socket.id}`,
        );
        socket.emit("random", data);
    }, 5000);

    socket.on("disconnect", (disconnectReason) => {
        console.log(
            `Disconnected from ${socket.id} due to ${disconnectReason}`,
        );
    });
});

server.listen(8000, () => {
    console.log("Waiting for connections in port 8000");
});
