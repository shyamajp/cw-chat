const socket = io();
import { Beep } from "./beep.js";

/* DATA */
let room = "";
let name = "";
let frequency;

// beeps
let myBeep;
let otherBeeps = {};

// keys
let i;

let STRAIGHT_KEY = " ";
let DOT_KEY = "k";
let DASH_KEY = "l";

let DOT_LENGTH = 100;
let DASH_LENGTH = DOT_LENGTH * 3;
let PAUSE_LENGTH = DOT_LENGTH;

/* KEY EVENTS */
const handleKeyUp = (e) => {
  // straight
  if (e.key === STRAIGHT_KEY) {
    myBeep.stop();
    socket.emit("message", "u");
  }
  // paddle
  else if (e.key === DOT_KEY || e.key === DASH_KEY) {
    myBeep.stop();
    clearInterval(i);
    i = undefined;
  }
};

function dot() {
  socket.emit("message", "d");
  myBeep = new Beep(frequency);
  myBeep.play();
  setTimeout(() => {
    socket.emit("message", "u");
    myBeep.stop();
  }, DOT_LENGTH);
  return dot;
}

function dash() {
  socket.emit("message", "d");
  myBeep = new Beep(frequency);
  myBeep.play();
  setTimeout(() => {
    socket.emit("message", "u");
    myBeep.stop();
  }, DASH_LENGTH);
  return dash;
}

const handleKeyDown = (e) => {
  // straight
  if (e.key === STRAIGHT_KEY && !e.repeat) {
    socket.emit("message", "d");
    myBeep = new Beep(frequency);
    myBeep.play();
  }
  // dot
  else if (e.key === DOT_KEY && !e.repeat && !i) {
    i = setInterval(dot(), DOT_LENGTH + PAUSE_LENGTH);
  }
  // dash
  else if (e.key === DASH_KEY && !e.repeat && !i) {
    i = setInterval(dash(), DASH_LENGTH + PAUSE_LENGTH);
  }
};

window.onload = () => {
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
};

window.onunload = () => {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);
};

/* SOCKET */
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
  const { id, user, text, frequency: othersFrequency } = message;

  if (text === "d") {
    otherBeeps[id] = new Beep(othersFrequency);
    otherBeeps[id].play();
  } else if (text === "u") {
    otherBeeps[id].stop();
  }

  const ul = document.getElementById("messages");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(`${user}: ${text}`));
  ul.appendChild(li);
});

/* FORMS */
// login
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  room = e.target.room?.value;
  name = e.target.name?.value;
  frequency = e.target.frequency?.value;
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
