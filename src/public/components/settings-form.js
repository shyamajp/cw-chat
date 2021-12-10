import { getUser } from "../js/userHelpers.js";
import { emitSettings } from "../js/socketHelpers.js";

class Settings extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("submit", this.onSubmit);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    const user = getUser();
    if (!user) {
      return;
    }
    const speed = e.target.speed?.value;
    const frequency = e.target.frequency?.value;
    const keyType = e.target.keyType?.value;

    emitSettings(frequency);

    user.speed = speed;
    user.frequency = frequency;
    user.keyType = keyType;

    document.getElementById("user-frequency").textContent = frequency;
    document.getElementById("user-speed").textContent = speed;
    document.getElementById("user-keyType").textContent = keyType;
  }

  render() {
    this.innerHTML = `
      <form id="settings-form">
        <div class="form-item">
          <label for="frequency">frequency</label>
          <br />
          <input type="range" min="440" max="1600" id="frequency" name="frequency" />
        </div>
        <div class="form-item">
          <label for="speed">speed</label>
          <br />
          <input type="range" min="50" max="200" id="speed" name="speed" />
        </div>
        <div class="form-item">
          <label for="keyType">paddle</label>
          <br />
          <span>straight</span>
          <input type="radio" value="straight" name="keyType" />
          <span>paddle</span>
          <input type="radio" value="paddle" name="keyType" />
        </div>
        <div class="form-item">
          <button type="submit">update</button>
        </div>
      </form>`;
  }
}

customElements.define("settings-form", Settings);
