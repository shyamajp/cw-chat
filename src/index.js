const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { addUser, getUser, deleteUser, getUsers } = require("./users");

const PORT = 3000;

// TOOD: add error handling
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("login", ({ name, room, frequency }) => {
    const { user, error } = addUser(socket.id, name, room, frequency);
    if (user) {
      socket.join(room);
      socket.to(room).emit("notification", `${name} just entered the room`);
      io.in(room).emit("users", getUsers(room));
    }
  });

  socket.on("message", (message) => {
    const user = getUser(socket.id);
    if (user) {
      socket.to(user.room).emit("message", {
        id: socket.id,
        user: user.name,
        text: message,
        frequency: user.frequency,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id);
    if (user) {
      socket.to(user.room).emit("notification", `${user.name} just left the room`);
      io.in(user.room).emit("users", getUsers(user.room));
    }
  });
});

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
