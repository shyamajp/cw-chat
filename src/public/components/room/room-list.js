import socket from "../../js/socket.js";
import { EventName } from "../../js/types.js";
import { RoomPill } from "./room-pill.js";

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
    this.innerHTML = ``;
  }
}

customElements.define("room-list", RoomList);
