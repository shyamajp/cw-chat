import { emitLogin, receiveError } from "../js/socketHelpers.js";
import { createUser } from "../js/userHelpers.js";

class Login extends HTMLElement {
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
    const room = e.target.room.value;
    const name = e.target.name.value;
    emitLogin(room, name);
    receiveError().then((errorMessage) => {
      const errorMessageEl = document.getElementById("error-message");
      errorMessageEl.innerHTML = errorMessage;
      if (!errorMessage) {
        createUser(name, room);
        document.getElementById("user-room").textContent = room;
        document.getElementById("user-name").textContent = name;
        document.getElementById("login-page").style.display = "none";
        document.getElementById("chat-page").style.display = "block";
      }
    });
  }

  render() {
    this.innerHTML = `
    <form id="login-form">
      <div class='form-item'>
        <label for="room">room</label>
        <input id="room" name="room" />
        <room-list></room-list>
      </div>
      <div class='form-item'>
        <label for="name">name</label>
        <input id="name" name="name" />
        <span id='error-message'></span>
      </div>
      <div class='form-item'>
        <button type="submit">login</button>
      </div>
    </form>`;
  }
}

customElements.define("login-form", Login);
