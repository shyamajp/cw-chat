class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header>
      <a href="/" id="page-title"> CW Chat </a>
      <span id="online-users">Online: <span id="user-count"></span> users</span>
    </header>`;
  }
}

customElements.define("cw-header", Header);
