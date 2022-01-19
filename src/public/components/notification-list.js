import socket from "../../js/socket.js";
import { EventName } from "../../js/types.js";

class NotificationList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    socket.on(EventName.Notification, (notification) => {
      const notificationMessageEl = document.createElement("li");
      notificationMessageEl.textContent = notification;
      this.appendChild(notificationMessageEl);

      const notificationScrollEl = document.getElementById("notification-scroll");
      notificationScrollEl.scrollTop = notificationScrollEl.scrollHeight;
    });
    this.render();
  }

  render() {
    this.innerHTML = `<ul id="notification-list"></ul>`;
  }
}

customElements.define("notification-list", NotificationList);
