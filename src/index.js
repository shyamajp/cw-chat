const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { addUser, getUser, deleteUser, getUsers } = require("./userHandlers");
const { EventName } = require("./types");
const { getRooms } = require("./utils");
const { logger } = require("./logger");

const PORT = 3000;

io.on("connection", (socket) => {
  logger.info(`[${socket.id}] connected`);
  // All: Number of all connected clients
  io.emit(EventName.UserCount, io.engine.clientsCount);
  // Current user: Current available rooms
  io.to(socket.id).emit(EventName.Rooms, getRooms(io.sockets.adapter.rooms));

  socket.on(EventName.Login, ({ name, room, frequency }) => {
    const { user, error } = addUser(socket.id, name, room, frequency);
    if (error || !user) {
      logger.error(`[${socket.id}] ${error}`);
      // Current user: Error
      io.to(socket.id).emit(EventName.Error, error);
      return;
    }
    logger.info(`[${socket.id}] Joined room "${room}"`);
    socket.join(room);

    // Other users in room: User entering notification
    socket.to(room).emit(EventName.Notification, `${name} just entered the room`);
    // All users in room: All users in room
    io.in(room).emit(EventName.Users, getUsers(room));
  });

  socket.on(EventName.Message, (message) => {
    const user = getUser(socket.id);
    if (!user) {
      // Current user: Error
      io.to(socket.id).emit(EventName.Error, "Could not find a user.");
      return;
    }
    // Other users in room: Morse code
    socket.to(user.room).emit(EventName.Message, {
      id: socket.id,
      user: user.name,
      text: message,
      frequency: user.frequency,
    });
  });

  socket.on(EventName.Mode, (mode) => {
    const user = getUser(socket.id);
    if (!user) {
      logger.error(`[${socket.id}] Could not find a user`);
      // Current user: Error
      io.to(socket.id).emit(EventName.Error, "Could not find a user");
      return;
    }
    // Other users in room: Current mode
    io.in(user.room).emit(EventName.Mode, {
      id: socket.id,
      mode,
    });
  });

  socket.on("disconnect", () => {
    logger.info(`[${socket.id}] Disconnected`);
    const user = deleteUser(socket.id);
    if (!user) {
      logger.error(`[${socket.id}] Could not find a user`);
      // Current user: Error
      io.to(socket.id).emit(EventName.Error, "Could not find a user");
      return;
    }
    logger.info(`[${socket.id}] Left room "${user.room}"`);
    // Other users in room: User leaving notification
    socket.to(user.room).emit(EventName.Notification, `${user.name} just left the room`);
    // Other users in room: All users in room
    socket.to(user.room).emit(EventName.Users, getUsers(user.room));
    // Broadcast: Number of all connected clients
    io.emit(EventName.UserCount, io.engine.clientsCount);
  });
});

app.use(express.static(__dirname + "/public"));

/* ROUTES */

// home
app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  } catch (error) {
    next(error);
  }
});

// 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname + "/public/404.html"));
});

server.listen(PORT, () => {
  logger.info(`Listening to ${PORT}`);
});
