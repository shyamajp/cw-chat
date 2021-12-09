const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { addUser, getUser, deleteUser, getUsers } = require("./users");
const { EventName } = require("./types");
const { getRooms } = require("./utils");

const PORT = 3000;

// TOOD: add error handling
io.on("connection", (socket) => {
  console.log("User connected");
  // All: Number of all connected clients
  io.emit(EventName.UserCount, io.engine.clientsCount);
  // Current user: Current available rooms
  io.to(socket.id).emit(EventName.Rooms, getRooms(io.sockets.adapter.rooms));

  socket.on(EventName.Login, ({ name, room, frequency }) => {
    const { user, error } = addUser(socket.id, name, room, frequency);
    if (user) {
      socket.join(room);
      // Other users in room: User entering notification
      socket.to(room).emit(EventName.notification, `${name} just entered the room`);
      // All users in room: All users in room
      io.in(room).emit(EventName.Users, getUsers(room));
    }
  });

  socket.on(EventName.message, (message) => {
    const user = getUser(socket.id);
    if (user) {
      // Other users in room: Morse code
      socket.to(user.room).emit(EventName.message, {
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
      // Other users in room: User leaving notification
      socket.to(user.room).emit(EventName.notification, `${user.name} just left the room`);
      // Other users in room: All users in room
      socket.to(user.room).emit(EventName.Users, getUsers(user.room));
    }
    // Broadcast: Number of all connected clients
    io.emit(EventName.Rooms, io.engine.clientsCount);
  });
});

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
