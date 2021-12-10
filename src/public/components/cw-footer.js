class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer>&copy; shyamajp</footer>
    `;
  }
}

customElements.define("cw-footer", Footer);
