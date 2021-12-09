export const socket = io();
import { Beep, getOtherBeep, setOtherBeep } from "./beep.js";
import { EventName } from "./types.js";
import { getUser } from "./user.js";

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
