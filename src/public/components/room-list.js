import socket from "../js/socket.js";
import { EventName } from "../js/types.js";

class RoomPill extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick);
    this.room = "";
  }

  connectedCallback() {
    this.room = this.getAttribute("room");

    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onChange);
  }

  onClick() {
    document.getElementById("room").value = this.room;
  }

  render() {
    this.innerHTML = `
    <a class="room-pill">
      <span>${this.room}</span>
    </a>
    `;
  }
}

customElements.define("room-pill", RoomPill);

class RoomList extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick);
  }

  connectedCallback() {
    socket.on(EventName.Rooms, (rooms) => {
      if (!rooms.length) {
        return;
      }
      this.id = "room-list";
      this.innerHTML = "";
      rooms.slice(0, 10).forEach((room) => {
        const roomPill = document.createElement("room-pill", { is: RoomPill });
        roomPill.setAttribute("room", room);
        this.appendChild(roomPill);
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

customElements.define("room-list", RoomList);
