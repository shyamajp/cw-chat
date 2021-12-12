class CheatSheet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <table id="cheat-sheet">
      <tr>
        <td class="alphebet">A</td>
        <td class="code">・ー</td>
        <td class="alphebet">N</td>
        <td class="code">ー・</td>
        <td class="alphebet">1</td>
        <td class="code">・ーーーー</td>
        <td class="alphebet">.</td>
        <td class="code">・ー・ー・ー</td>
      </tr>
      <tr>
        <td class="alphebet">B</td>
        <td class="code">ー・・・・</td>
        <td class="alphebet">O</td>
        <td class="code">ーーー</td>
        <td class="alphebet">2</td>
        <td class="code">・・ーーー</td>
        <td class="alphebet">,</td>
        <td class="code">ーー・・ーー</td>
      </tr>
      <tr>
        <td class="alphebet">C</td>
        <td class="code">ー・ー・</td>
        <td class="alphebet">P</td>
        <td class="code">・ーー・</td>
        <td class="alphebet">3</td>
        <td class="code">・・・ーー</td>
        <td class="alphebet">?</td>
        <td class="code">・・ーー・・</td>
      </tr>
      <tr>
        <td class="alphebet">D</td>
        <td class="code">ー・・</td>
        <td class="alphebet">Q</td>
        <td class="code">ーー・ー</td>
        <td class="alphebet">4</td>
        <td class="code">・・・・ー</td>
        <td class="alphebet">!</td>
        <td class="code">ー・ー・ーー</td>
      </tr>
      <tr>
        <td class="alphebet">E</td>
        <td class="code">・</td>
        <td class="alphebet">R</td>
        <td class="code">・ー・</td>
        <td class="alphebet">5</td>
        <td class="code">・・・・・</td>
        <td class="alphebet">'</td>
        <td class="code">・ーーーー・</td>
      </tr>
      <tr>
        <td class="alphebet">F</td>
        <td class="code">・・ー・</td>
        <td class="alphebet">S</td>
        <td class="code">・・・</td>
        <td class="alphebet">6</td>
        <td class="code">ー・・・・</td>
        <td class="alphebet">"</td>
        <td class="code">・ー・・ー・</td>
      </tr>
      <tr>
        <td class="alphebet">G</td>
        <td class="code">ーー・</td>
        <td class="alphebet">T</td>
        <td class="code">ー</td>
        <td class="alphebet">7</td>
        <td class="code">ーー・・・</td>
        <td class="alphebet">:</td>
        <td class="code">ーーー・・・</td>
      </tr>
      <tr>
        <td class="alphebet">H</td>
        <td class="code">・・・・</td>
        <td class="alphebet">U</td>
        <td class="code">・・ー</td>
        <td class="alphebet">8</td>
        <td class="code">ーーー・・</td>
        <td class="alphebet">;</td>
        <td class="code">ー・ー・ー・</td>
      </tr>
      <tr>
        <td class="alphebet">I</td>
        <td class="code">・・</td>
        <td class="alphebet">V</td>
        <td class="code">・・・ー</td>
        <td class="alphebet">9</td>
        <td class="code">ーーーー・</td>
        <td class="alphebet">/</td>
        <td class="code">・・ーー・ー</td>
      </tr>
      <tr>
        <td class="alphebet">J</td>
        <td class="code">・ーーー</td>
        <td class="alphebet">W</td>
        <td class="code">・ーー</td>
        <td class="alphebet">0</td>
        <td class="code">ーーーーー</td>
        <td class="alphebet">ｰ</td>
        <td class="code">ー・・・・ー</td>
      </tr>
      <tr>
        <td class="alphebet">K</td>
        <td class="code">ー・ー</td>
        <td class="alphebet">X</td>
        <td class="code">ー・・ー</td>
        <td class="alphebet"></td>
        <td class="code"></td>
        <td class="alphebet">$</td>
        <td class="code">・・・ー・・ー</td>
      </tr>
      <tr>
        <td class="alphebet">L</td>
        <td class="code">・ー・・</td>
        <td class="alphebet">Y</td>
        <td class="code">ー・ーー</td>
        <td class="alphebet"></td>
        <td class="code"></td>
        <td class="alphebet">@</td>
        <td class="code">・ーー・ー・</td>
      </tr>
      <tr>
        <td class="alphebet">M</td>
        <td class="code">ーー</td>
        <td class="alphebet">Z</td>
        <td class="code">ーー・・</td>
        <td class="alphebet"></td>
        <td class="code"></td>
        <td class="alphebet"></td>
        <td class="code"></td>
      </tr>
    </table>`;
  }
}

customElements.define("cheat-sheet", CheatSheet);
