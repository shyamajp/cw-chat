import { Beep, getMyBeep, setMyBeep, getOtherBeep, setOtherBeep } from "./js/beep.js";
import { EventName } from "./js/types.js";
import { socket } from "./js/socket.js";
import { getUser, setUser, User } from "./js/user.js";

/* DATA */
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
  const beep = getMyBeep();
  // straight
  if (e.key === STRAIGHT_KEY) {
    beep.stop();
    transmit && socket.emit(EventName.Message, "u");
  }
  // paddle
  else if (e.key === DOT_KEY || e.key === DASH_KEY) {
    beep.stop();
    clearInterval(i);
    i = undefined;
  }
};

function dot() {
  const transmit = getUser().transmit;
  transmit && socket.emit(EventName.Message, "d");
  const beep = new Beep(getUser().frequency);
  setMyBeep(beep);
  beep.play();
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, "u");
    beep.stop();
  }, DOT_LENGTH);
  return dot;
}

function dash() {
  const transmit = getUser().transmit;
  transmit && socket.emit(EventName.Message, "d");
  const beep = new Beep(getUser().frequency);
  setMyBeep(beep);
  beep.play();
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, "u");
    beep.stop();
  }, DASH_LENGTH);
  return dash;
}

const handleKeyDown = (e) => {
  const user = getUser();
  // straight
  if (e.key === STRAIGHT_KEY && !e.repeat) {
    user.transmit && socket.emit(EventName.Message, "d");
    setMyBeep(new Beep(user.frequency));
    getMyBeep().play();
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

  if (!getUser().transmit) {
    if (text === "d") {
      const beep = new Beep(othersFrequency);
      setOtherBeep(id, beep);
      beep.play();
    } else if (text === "u") {
      getOtherBeep(id).stop();
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

  const room = e.target.room?.value;
  const name = e.target.name?.value;
  const frequency = e.target.frequency?.value;
  socket.emit(EventName.Login, { room, name, frequency });
  setUser(new User(name, room, frequency));
  document.getElementById("user-room").textContent = room;
  document.getElementById("user-name").textContent = name;
  document.getElementById("user-frequency").textContent = frequency;
});

const transmitInput = document.getElementById("transmit");
transmitInput.addEventListener("change", function () {
  const transmit = this.checked;
  const mode = transmit ? "transmit" : "receive";
  socket.emit(EventName.Mode, mode);
  getUser().transmit = transmit;
});
