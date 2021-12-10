import { getUser } from "../js/helpers/userHelpers.js";
import { stopAllBeeps } from "../js/helpers/beepHelpers.js";
import { emitMessage, emitMode } from "../js/helpers/socketHelpers.js";

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
    if (transmit) {
      stopAllBeeps();
    } else {
      emitMessage(false);
    }
    emitMode(transmit);
    getUser().transmit = transmit;
  }

  render() {
    this.innerHTML = `
    <input type="checkbox" name="transmit" id="transmit" />
    `;
  }
}

customElements.define("tranceiver-switch", Tranceiver);
