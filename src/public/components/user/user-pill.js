import { DEFAULT_MODE } from "../../js/constants.js";

export class UserPill extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick);
    this.name = "";
    this.mode = "";
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.mode = this.getAttribute("mode");

    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onChange);
  }

  render() {
    this.innerHTML = `
    <span class="user-pill ${this.mode || DEFAULT_MODE}">${this.name}</span>
    `;
  }
}

customElements.define("user-pill", UserPill);
