import { socket } from "../js/socket.js";
import { getUser } from "../js/user.js";
import { EventName } from "../js/types.js";

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

    socket.emit(EventName.Settings, frequency);

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
          <input type="range" min="440" max="1600" id="frequency" name="frequency" />
        </div>
        <div class="form-item">
          <label for="speed">speed</label>
          <input type="range" min="50" max="200" id="speed" name="speed" />
        </div>
        <div class="form-item">
          <label for="keyType">straight</label>
          <input type="radio" value="straight" name="keyType" />
          <label for="keyType">paddle</label>
          <input type="radio" value="paddle" name="keyType" />
        </div>
        <div class='form-item'>
          <button type="submit">update</button>
        </div>
      </form>`;
  }
}

customElements.define("settings-form", Settings);