"use strict";

var _socket = require("socket.io-client");
var socket = (0, _socket.io)("http://localhost:8000/");
socket.on("connect", function () {
  console.log("Connected");
});
socket.on("random", function (data) {
  console.log("Received random number from ".concat(socket.id, ": ").concat(data.randomNumber));
});
setInterval(function () {
  var data = {
    randomNumber: Math.ceil(Math.random() * 100)
  };
  console.log("Sending random number ".concat(data.randomNumber, " to ").concat(socket.id));
  socket.emit("random", data);
}, 5000);
socket.on("disconnect", function () {
  console.log("Disconnected");
});