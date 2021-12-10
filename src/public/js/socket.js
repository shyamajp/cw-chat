const socket = io();
import { stopBeep, startBeep } from "./beepHelpers.js";
import { START_SOUND, STOP_SOUND } from "./constants.js";
import { EventName } from "./types.js";
import { getUser } from "./userHelpers.js";

socket.on(EventName.Notification, (notification) => {
  const ul = document.getElementById("user-notifications");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(notification));
  ul.appendChild(li);
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
