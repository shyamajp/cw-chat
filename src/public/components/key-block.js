class KeyBlock extends HTMLElement {
  constructor() {
    super();
    this.key = "";
    this.action = "";
  }

  connectedCallback() {
    this.key = this.getAttribute("key");
    this.action = this.getAttribute("action");

    this.render();
  }

  render() {
    this.innerHTML = `
    <span class="key-block">${this.key} ${this.action}</span>
    `;
  }
}

customElements.define("key-block", KeyBlock);
