import socket from "../js/socket.js";
import { getUser } from "../js/userHelpers.js";
import { EventName } from "../js/types.js";
import { getMyBeep, setMyBeep } from "../js/beepHelpers.js";
import { Beep } from "../js/Beep.js";

class BeepButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("mousedown", this.onStart);
    this.addEventListener("touchstart", this.onStart);
    this.addEventListener("mouseup", this.onStop);
    this.addEventListener("touchend", this.onStop);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onChange);
  }

  onStart() {
    const user = getUser();
    if (!user) return;
    user.transmit && socket.emit(EventName.Message, "d");
    const beep = new Beep(user.frequency);
    setMyBeep(beep);
    beep.play();
  }

  onStop() {
    const user = getUser();
    if (!user) return;
    user.transmit && socket.emit(EventName.Message, "u");
    getMyBeep().stop();
  }

  render() {
    this.innerHTML = `
    <button>Beep</button>
    `;
  }
}

customElements.define("beep-button", BeepButton);
