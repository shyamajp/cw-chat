const socket = io();
import { Beep } from "./beep.js";

/* DATA */
let room = "";
let name = "";
let frequency = 880;

// beeps
let myBeep;
let otherBeeps = {};

// straight key settings
let STRAIGHT_KEY = " ";

// paddle key settings
let i;

let DOT_KEY = "l";
let DASH_KEY = "k";
let DOT_LENGTH = 100;
let DASH_LENGTH = DOT_LENGTH * 3;
let PAUSE_LENGTH = DOT_LENGTH;

/* KEY EVENTS */
// StraightKey only
const handleKeyDown = (e) => {
  if (e.key === STRAIGHT_KEY && !e.repeat) {
    socket.emit("message", "d");
    myBeep = new Beep(frequency);
    myBeep.play();
  }
};

const handleKeyUp = (e) => {
  if (e.key === STRAIGHT_KEY) {
    socket.emit("message", "u");
    myBeep.stop();
  }
};

const handleDotKeyDown = (e) => {
  if (e.key === DOT_KEY && !e.repeat) {
    clearInterval(i);
    i = setInterval(() => {
      socket.emit("message", "d");
      myBeep = new Beep(frequency);
      myBeep.play();
      setTimeout(() => {
        socket.emit("message", "u");
        myBeep.stop();
      }, DOT_LENGTH);
    }, DOT_LENGTH + PAUSE_LENGTH);
  }
};

const handleDashKeyDown = (e) => {
  if (e.key === DASH_KEY && !e.repeat) {
    clearInterval(i);
    i = setInterval(() => {
      socket.emit("message", "d");
      myBeep = new Beep(frequency);
      myBeep.play();
      setTimeout(() => {
        socket.emit("message", "u");
        myBeep.stop();
      }, DASH_LENGTH);
    }, DASH_LENGTH + PAUSE_LENGTH);
  }
};

const handleDotKeyUp = (e) => {
  if (e.key === DOT_KEY) {
    clearInterval(i);
  }
};

const handleDashKeyUp = (e) => {
  if (e.key === DASH_KEY) {
    clearInterval(i);
  }
};

window.onload = () => {
  // straight key
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // paddle key
  document.addEventListener("keydown", handleDotKeyDown);
  document.addEventListener("keyup", handleDotKeyUp);
  document.addEventListener("keydown", handleDashKeyDown);
  document.addEventListener("keyup", handleDashKeyUp);
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
