import { DEFAULT_FREQUENCY, DEFAULT_SPEED } from "../js/constants.js";
import { KeyTypes } from "../js/types.js";
import { getUser } from "../js/helpers/userHelpers.js";
import { emitSettings } from "../js/helpers/socketHelpers.js";

class Settings extends HTMLElement {
  constructor() {
    super();
    this.user = getUser();
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
        <div id="user-info">
          <li>Name: <span id="user-name"></span></li>
          <li>Frequency: <span id="user-frequency"></span></li>
          <li>Paddle Speed: <span id="user-speed"></span></li>
          <li>Key Type: <span id="user-keyType"></span></li>
        </div>
        <div class="form-item">
          <label for="keyType">Key Type</label>
          <br />
          <span>straight</span>
          <input type="radio" value="${KeyTypes.Straight}" name="keyType" checked />
          <span>paddle</span>
          <input type="radio" value="${KeyTypes.Paddle}" name="keyType" />
        </div>
        <div class="form-item">
          <label for="frequency">Frequency</label>
          <br />
          <input type="range" min="440" max="1600" id="frequency" name="frequency" value="${DEFAULT_FREQUENCY}" />
        </div>
        <div class="form-item">
          <label for="speed">Paddle Speed</label>
          <br />
          <input type="range" min="50" max="200" id="speed" name="speed" value="${DEFAULT_SPEED}"/>
        </div>
        <div class="form-item">
          <button type="submit">update</button>
        </div>
      </form>`;
  }
}

customElements.define("settings-form", Settings);
