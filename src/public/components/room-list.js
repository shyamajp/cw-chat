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
      this.innerHTML = "";

      if (!rooms.length) {
        const emptyMessageEl = document.createElement("span");
        emptyMessageEl.innerHTML = "Oops! No rooms available. Do you wanna create one?";
        this.appendChild(emptyMessageEl);
        return;
      }
      this.id = "room-list";

      rooms.slice(0, 10).forEach((room) => {
        const roomPillEl = document.createElement("room-pill", { is: RoomPill });
        roomPillEl.setAttribute("room", room);
        this.appendChild(roomPillEl);
      });
    });
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onChange);
  }
}

customElements.define("room-list", RoomList);
