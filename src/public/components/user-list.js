import socket from "../js/socket.js";
import { DEFAULT_MODE } from "../js/constants.js";
import { EventName } from "../js/types.js";

class UserList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    socket.on(EventName.Users, (users) => {
      this.id = "user-list";
      this.innerHTML = "";
      users.forEach(({ name, mode }) => {
        const userPill = document.createElement("span");
        userPill.className = `user-pill ${mode || DEFAULT_MODE}`;
        userPill.textContent = `${name}`;
        this.appendChild(userPill);
      });
    });
  }
}

customElements.define("user-list", UserList);
