const socket = io();
import { Beep } from "./beep.js";

/* DATA */
let room = "";
let name = "";
let frequency = 880;
let myBeep;

/* KEY EVENTS */
// audio stuff

// StraightKey only
const handleKeyDown = (e) => {
  if (e.key === " " && !e.repeat) {
    socket.emit("message", "d");
    myBeep.play();
  }
};

const handleKeyUp = (e) => {
  if (e.key === " ") {
    socket.emit("message", "u");
    myBeep.stop();
  }
};

window.onload = () => {
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
};

// cleanup
window.onunload = () => {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);
};

/* SOCKET */
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
  const { user, text, frequency } = message;
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
  frequency = e.target.frequency?.value;
  myBeep = new Beep(frequency);
  myBeep.init();
  socket.emit("login", { room, name, frequency });

  document.getElementById("user-room").textContent = room;
  document.getElementById("user-name").textContent = name;
  document.getElementById("user-frequency").textContent = frequency;
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
