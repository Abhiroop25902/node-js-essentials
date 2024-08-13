import { io } from "socket.io-client";

const socket = io("http://localhost:8000/");

socket.on("connect", () => {
    console.log(`Connected`);
});

socket.on("random", (data: SocketData) => {
    console.log(
        `Received random number from ${socket.id}: ${data.randomNumber}`,
    );
});

setInterval(() => {
    const data: SocketData = {
        randomNumber: Math.ceil(Math.random() * 100),
    };
    console.log(`Sending random number ${data.randomNumber} to ${socket.id}`);
    socket.emit("random", data);
}, 5000);

socket.on("disconnect", () => {
    console.log("Disconnected");
});
