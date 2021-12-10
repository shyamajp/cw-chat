class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer>CW Chat (v.0.0.1) &copy; shyamajp</footer>
    `;
  }
}

customElements.define("cw-footer", Footer);
