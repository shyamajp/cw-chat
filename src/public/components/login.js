import { socket } from "../js/socket.js";
import { setUser, User } from "../js/user.js";
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
    const frequency = e.target.frequency?.value;
    socket.emit(EventName.Login, { room, name, frequency });
    setUser(new User(name, room, frequency));
    document.getElementById("user-room").textContent = room;
    document.getElementById("user-name").textContent = name;
    document.getElementById("user-frequency").textContent = frequency;
  }

  render() {
    this.innerHTML = `
    <form id="login-form">
      <h2>Login</h2>
      <label for="room">room</label>
      <input id="room" name="room" />
      <br />
      <label for="name">name</label>
      <input id="name" name="name" />
      <br />
      <label for="frequency">frequency</label>
      <input type="range" min="440" max="1600" id="frequency" name="frequency" />
      <br />
      <button type="submit">login</button>
    </form>`;
  }
}

customElements.define("login-form", Login);
