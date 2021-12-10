const socket = io();
import { stopBeep, startBeep } from "./beepHelpers.js";
import { START_SOUND, STOP_SOUND, DEFAULT_FREQUENCY, DEFAULT_MODE } from "./constants.js";
import { EventName } from "./types.js";
import { getUser } from "./userHelpers.js";

socket.on(EventName.Notification, (notification) => {
  const ul = document.getElementById("user-notifications");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(notification));
  ul.appendChild(li);
});

socket.on(EventName.Users, (users) => {
  const ul = document.getElementById("user-list");
  ul.innerHTML = "";
  users.forEach(({ name, mode, frequency }) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${name} (${mode || DEFAULT_MODE}) (${frequency || DEFAULT_FREQUENCY})`));
    ul.appendChild(li);
  });
});

socket.on(EventName.Rooms, (rooms) => {
  const ul = document.getElementById("room-list");
  ul.innerHTML = "";
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(room));
    ul.appendChild(li);
  });
});

socket.on(EventName.UserCount, (userCount) => {
  const span = document.getElementById("user-count");
  span.innerHTML = userCount;
});

socket.on(EventName.Message, (message) => {
  const { id, text, frequency } = message;

  if (!getUser().transmit) {
    if (text === START_SOUND) {
      startBeep(frequency, id);
    } else if (text === STOP_SOUND) {
      stopBeep(id);
    }
  }
});

export default socket;
