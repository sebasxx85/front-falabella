export class AppHeader extends HTMLElement {
  // Vamos a observar el atributo "title" (sigue siendo válido usarlo en el HTML)
  static get observedAttributes() { return ['title']; }

  // Cambiamos el nombre del getter para no chocar con HTMLElement.title
  private get headerTitle() {
    return this.getAttribute('title') ?? 'Front Falabella';
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const css = `
      :host { display:block; }
      header {
        max-width: 960px; margin: 0 auto; padding: 16px;
        display:flex; align-items:center; gap:12px;
      }
      .logo { width:28px; height:28px; border-radius:6px; background:#111827; }
      h1 { margin:0; font: 600 1.1rem/1.2 system-ui, sans-serif; }
      @media (max-width:600px){ header { padding: 12px; } h1{ font-size:1rem; } }
      hr { border:0; height:1px; background:#e5e7eb; }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${css}</style>
      <header>
        <div class="logo" aria-hidden="true"></div>
        <h1>${this.headerTitle}</h1>
        <slot></slot>
      </header>
      <hr />
    `;
  }
}

customElements.define('app-header', AppHeader);
