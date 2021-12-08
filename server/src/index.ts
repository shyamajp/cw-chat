import cors from "cors";
import path from "path";

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;
const { addUser, getUser, deleteUser, getUsers } = require("./users");

app.use(cors());

io.on("connection", (socket) => {
  socket.on("login", ({ name, room }, callback) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error) return callback(error);
    socket.join(user.room);
    socket.in(room).emit("notification", {
      title: "Someone's here",
      description: `${user.name} just entered the room`,
    });
    io.in(room).emit("users", getUsers(room));
    callback();
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id);
    if (user) {
      io.to(user.room).emit("notification", {
        title: "Someone just left",
        description: `${user.name} just left the room`,
      });
      io.to(user.room).emit("users", getUsers(user.room));
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
