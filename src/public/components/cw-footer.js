const template = document.createElement("template");
template.innerHTML = `
  <style>
    footer {
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      font-weight: 300;
    }
  </style>
  <footer>
    CW Chat
    (v.<slot name="version"></slot>)
    &copy; shyamajp
  </footer>
`;
class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("cw-footer", Footer);
