import { socket } from "../js/socket.js";
import { getUser } from "../js/user.js";
import { EventName } from "../js/types.js";
import { stopAllOtherBeeps } from "../js/beep.js";

class Tranceiver extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onChange);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onChange);
  }

  onChange(e) {
    const transmit = e.composedPath()[0].checked;
    const mode = transmit ? "transmit" : "receive";
    if (transmit) {
      stopAllOtherBeeps();
    }
    socket.emit(EventName.Mode, mode);
    getUser().transmit = transmit;
  }

  render() {
    this.innerHTML = `
    <input type="checkbox" name="transmit" id="transmit" />
    `;
  }
}

customElements.define("tranceiver-toggle", Tranceiver);
