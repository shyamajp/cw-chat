import socket from "../js/socket.js";
import { getUser } from "../js/userHelpers.js";
import { EventName } from "../js/types.js";
import { stopBeep, startBeep } from "../js/beepHelpers.js";
import { START_SOUND, STOP_SOUND } from "../js/constants.js";

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
    user.transmit && socket.emit(EventName.Message, START_SOUND);
    startBeep(user.frequency);
  }

  onStop() {
    const user = getUser();
    if (!user) return;
    user.transmit && socket.emit(EventName.Message, STOP_SOUND);
    stopBeep();
  }

  render() {
    this.innerHTML = `
    <button>Beep</button>
    `;
  }
}

customElements.define("beep-button", BeepButton);
