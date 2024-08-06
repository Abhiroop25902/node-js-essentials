import * as http from "node:http";

const server = http.createServer((req, res) => {
  const { url, method } = req;

  console.log("I received a request");
  console.log(url);
  console.log(method);

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Home page</h1>");
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>About page</h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>404 Not Found</h1>");
  }

  res.end();
});

server.listen(3000, () => console.log("Server listening on port 3000"));
