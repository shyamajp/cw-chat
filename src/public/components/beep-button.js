import { getUser } from "../js/userHelpers.js";
import { stopBeep, startBeep } from "../js/beepHelpers.js";
import { emitMessage } from "../js/socketHelpers.js";

class BeepButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("mousedown", this.onStart);
    this.addEventListener("mouseup", this.onStop);

    this.addEventListener("touchstart", this.onStart, { passive: true });
    this.addEventListener("touchend", this.onStop, { passive: true });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.addEventListener("mousedown", this.onStart);
    this.addEventListener("mouseup", this.onStop);

    this.addEventListener("touchstart", this.onStart, { passive: true });
    this.addEventListener("touchend", this.onStop, { passive: true });
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
    <button id="beep-button">Beep</button>
    `;
  }
}

customElements.define("beep-button", BeepButton);
