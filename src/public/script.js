const socket = io();

// data
let room = "";
let name = "";

// listen
socket.on("notification", (notification) => {
  const ul = document.getElementById("user-notifications");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(notification));
  ul.appendChild(li);
});

socket.on("users", (users) => {
  const ul = document.getElementById("user-list");
  ul.innerHTML = "";
  users.forEach(({ name }) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(name));
    ul.appendChild(li);
  });
});

socket.on("message", (message) => {
  const { user, text } = message;
  const ul = document.getElementById("messages");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(`${user}: ${text}`));
  ul.appendChild(li);
});

// login
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  room = e.target.room?.value;
  name = e.target.name?.value;
  socket.emit("login", { room, name });

  document.getElementById("user-room").textContent = room;
  document.getElementById("user-name").textContent = name;
});

// message
const input = document.getElementById("message");

input.addEventListener("input", function (e) {
  const message = e.target.value;
  if (message) {
    socket.emit("message", message);
    input.value = "";
  }
});
