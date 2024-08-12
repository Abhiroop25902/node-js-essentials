"use strict";

var _hapi = _interopRequireDefault(require("@hapi/hapi"));
var _helloRoute = _interopRequireDefault(require("./helloRoute"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var routes = [_helloRoute["default"]];
var server = _hapi["default"].server({
  port: 3000,
  host: "localhost"
});
routes.forEach(function (route) {
  server.route(route);
});
server.start().then(function () {
  console.log("Hapi Server is listening on port 3000");
});