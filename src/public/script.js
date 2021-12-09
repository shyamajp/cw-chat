const socket = io();
import { Beep } from "./beep.js";
import { EventName } from "./types.js";

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

// customization
let transmit = false;

/* KEY EVENTS */
const handleKeyUp = (e) => {
  // straight
  if (e.key === STRAIGHT_KEY) {
    myBeep.stop();
    transmit && socket.emit(EventName.Message, "u");
  }
  // paddle
  else if (e.key === DOT_KEY || e.key === DASH_KEY) {
    myBeep.stop();
    clearInterval(i);
    i = undefined;
  }
};

function dot() {
  transmit && socket.emit(EventName.Message, "d");
  myBeep = new Beep(frequency);
  myBeep.play();
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, "u");
    myBeep.stop();
  }, DOT_LENGTH);
  return dot;
}

function dash() {
  transmit && socket.emit(EventName.Message, "d");
  myBeep = new Beep(frequency);
  myBeep.play();
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, "u");
    myBeep.stop();
  }, DASH_LENGTH);
  return dash;
}

const handleKeyDown = (e) => {
  // straight
  if (e.key === STRAIGHT_KEY && !e.repeat) {
    transmit && socket.emit(EventName.Message, "d");
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
socket.on(EventName.Notification, (notification) => {
  const ul = document.getElementById("user-notifications");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(notification));
  ul.appendChild(li);
});

socket.on(EventName.Users, (users) => {
  const ul = document.getElementById("user-list");
  ul.innerHTML = "";
  users.forEach(({ name }) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(name));
    ul.appendChild(li);
  });
});

socket.on(EventName.Rooms, (rooms) => {
  console.log(rooms);
});

socket.on(EventName.UserCount, (userCount) => {
  console.log(userCount);
});

socket.on(EventName.Mode, (mode) => {
  console.log(mode);
});

socket.on(EventName.Error, (error) => {
  console.log(error);
});

socket.on(EventName.Message, (message) => {
  const { id, user, text, frequency: othersFrequency } = message;

  if (!transmit) {
    if (text === "d") {
      otherBeeps[id] = new Beep(othersFrequency);
      otherBeeps[id].play();
    } else if (text === "u") {
      otherBeeps[id].stop();
    }
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
  socket.emit(EventName.Login, { room, name, frequency });

  document.getElementById("user-room").textContent = room;
  document.getElementById("user-name").textContent = name;
  document.getElementById("user-frequency").textContent = frequency;
});

const transmitInput = document.getElementById("transmit");
transmitInput.addEventListener("change", function () {
  transmit = this.checked;
  const mode = transmit ? "transmit" : "receive";
  socket.emit(EventName.Mode, mode);
});
