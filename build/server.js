"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
var http = _interopRequireWildcard(require("node:http"));
var _socket = require("socket.io");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var server = http.createServer(app);
var io = new _socket.Server(server);
io.on("connection", function (socket) {
  console.log("Connected to: ".concat(socket.id));
  socket.on("random", function (data) {
    console.log("Received random number from ".concat(socket.id, ": ").concat(data.randomNumber));
  });
  var intervalId = setInterval(function () {
    var data = {
      randomNumber: Math.ceil(Math.random() * 100)
    };
    console.log("Sending random number ".concat(data.randomNumber, " to ").concat(socket.id));
    socket.emit("random", data);
  }, 5000);
  console.log("Starting setInterval with id ".concat(intervalId));
  socket.on("disconnect", function (disconnectReason) {
    console.log("Disconnected from ".concat(socket.id, " due to ").concat(disconnectReason));
    console.log("Stopping Interval with id ".concat(intervalId));
    clearInterval(intervalId);
  });
});
server.listen(8000, function () {
  console.log("Waiting for connections in port 8000");
});