const template = document.createElement("template");
template.innerHTML = `
  <span>
    <slot name="key"></slot>
    <slot name="action"></slot>
  </span>
`;

class KeyBlock extends HTMLElement {
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

customElements.define("key-block", KeyBlock);
