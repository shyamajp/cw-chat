import socket from "../../js/socket.js";
import { EventName } from "../../js/types.js";
import { UserPill } from "./user-pill.js";

class UserList extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick);
  }

  connectedCallback() {
    socket.on(EventName.Users, (users) => {
      this.id = "user-list";
      this.innerHTML = "";
      users.forEach(({ name, mode }) => {
        const userPill = document.createElement("user-pill", { is: UserPill });
        userPill.setAttribute("name", name);
        userPill.setAttribute("mode", mode);
        this.appendChild(userPill);
      });
    });
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onChange);
  }

  render() {
    this.innerHTML = "";
  }
}

customElements.define("user-list", UserList);
