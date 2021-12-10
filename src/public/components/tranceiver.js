import { getUser } from "../js/userHelpers.js";
import { stopAllBeeps } from "../js/beepHelpers.js";
import { emitMessage, emitMode } from "../js/socketHelpers.js";

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
      stopAllBeeps();
    } else {
      emitMessage(false);
    }
    emitMode(mode);
    getUser().transmit = transmit;
  }

  render() {
    this.innerHTML = `
    <input type="checkbox" name="transmit" id="transmit" />
    `;
  }
}

customElements.define("tranceiver-toggle", Tranceiver);
