import socket from "../js/socket.js";
import { createUser } from "../js/userHelpers.js";
import { EventName } from "../js/types.js";

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
    const room = e.target.room?.value;
    const name = e.target.name?.value;
    socket.emit(EventName.Login, { room, name });

    let errorMessage = "";
    socket.on(EventName.Error, (error) => {
      errorMessage = error;
    });
    setTimeout(() => {
      const span = document.getElementById("error-message");
      if (!errorMessage) {
        span.innerHTML = "";
        createUser(name, room);
        document.getElementById("user-room").textContent = room;
        document.getElementById("user-name").textContent = name;
      } else {
        span.innerHTML = errorMessage;
      }
    }, 100);
  }

  render() {
    this.innerHTML = `
    <form id="login-form">
      <div class='form-item'>
        <label for="room">room</label>
        <input id="room" name="room" />
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
