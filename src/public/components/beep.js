import { getUser } from "../js/userHelpers.js";
import { stopBeep, startBeep } from "../js/beepHelpers.js";
import { emitMessage } from "../js/socketHelpers.js";

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
    const { frequency } = getUser() || {};
    if (!frequency) return;
    emitMessage(true);
    startBeep(frequency);
  }

  onStop() {
    const { frequency } = getUser() || {};
    if (!frequency) return;
    emitMessage(false);
    stopBeep();
  }

  render() {
    this.innerHTML = `
    <button>Beep</button>
    `;
  }
}

customElements.define("beep-button", BeepButton);
