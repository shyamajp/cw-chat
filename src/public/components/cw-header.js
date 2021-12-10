import socket from "../js/socket.js";
import { EventName } from "../js/types.js";

class Header extends HTMLElement {
  constructor() {
    super();
    this.userCount = 0;
  }

  connectedCallback() {
    socket.on(EventName.UserCount, (userCount) => {
      console.log(userCount);
      this.userCount = userCount;
      this.render();
    });
  }

  render() {
    this.innerHTML = `
    <header>
      <a href="/" id="page-title"> CW Chat </a>
      <span id="online-users">Online: <span id="user-count">${this.userCount}</span> users</span>
    </header>`;
  }
}

customElements.define("cw-header", Header);
