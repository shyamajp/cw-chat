export class RoomPill extends HTMLElement {
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
