const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server running");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", function(socket) {
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  // Disconnect
  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    // tell us how many are still connected
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  // Send Message
  socket.on("send message", function(data) {
    //console.log(data);
    io.sockets.emit("new message", { msg: data });
  });
});
