import socket from "../../js/socket.js";
import { EventName } from "../../js/types.js";

class NotificationList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    socket.on(EventName.Notification, (notification) => {
      this.id = "notification-list";
      const notificationMessage = document.createElement("li");
      notificationMessage.innerHTML = notification;
      this.appendChild(notificationMessage);
    });

    this.render();
  }

  render() {
    this.innerHTML = "";
  }
}

customElements.define("notification-list", NotificationList);
