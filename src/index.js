const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { addUser, getUser, updateUser, deleteUser, getUsers } = require("./userHandlers");
const { EventName } = require("./types");
const { getRooms } = require("./utils");
const { logger } = require("./logger");

const PORT = process.env.PORT || 3000;

/* WEBSOCKET */
io.on("connection", (socket) => {
  logger.info(`[${socket.id}] connected`);
  // All: Number of all connected clients
  io.emit(EventName.UserCount, io.engine.clientsCount);
  // Current user: Current available rooms
  io.to(socket.id).emit(EventName.Rooms, getRooms(io.sockets.adapter.rooms));

  socket.on(EventName.Login, ({ name, room }) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error || !user) {
      logger.error(`[${socket.id}] ${error}`);
      // Current user: Error
      io.to(socket.id).emit(EventName.Error, error);
      return;
    }
    io.to(socket.id).emit(EventName.Error, "");
    logger.info(`[${socket.id}] Joined room "${room}"`);
    socket.join(room);

    // All users in room: User entering notification
    io.in(room).emit(EventName.Notification, `${name} just entered the room`);
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
    updateUser(socket.id, { mode });
    // All users in room: Current mode
    io.in(user.room).emit(EventName.Users, getUsers(user.room));
  });

  socket.on(EventName.Settings, (frequency) => {
    let user = getUser(socket.id);
    if (!user) {
      logger.error(`[${socket.id}] Could not find a user`);
      // Current user: Error
      io.to(socket.id).emit(EventName.Error, "Could not find a user");
      return;
    }
    updateUser(socket.id, { frequency });
    // All users in room: Current frequency
    io.in(user.room).emit(EventName.Users, getUsers(user.room));
  });

  socket.on("disconnect", () => {
    logger.info(`[${socket.id}] Disconnected`);
    const user = deleteUser(socket.id);
    // Broadcast: Number of all connected clients
    io.emit(EventName.UserCount, io.engine.clientsCount);
    if (!user) {
      return;
    }
    logger.info(`[${socket.id}] Left room "${user.room}"`);
    // Other users in room: User leaving notification
    socket.to(user.room).emit(EventName.Notification, `${user.name} just left the room`);
    // Other users in room: All users in room
    socket.to(user.room).emit(EventName.Users, getUsers(user.room));
  });
});

/* ROUTES */
app.get("/health", (req, res, next) => {
  res.send(200);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  res.redirect("/");
});

server.listen(PORT, () => {
  logger.info(`Listening to ${PORT}`);
});
