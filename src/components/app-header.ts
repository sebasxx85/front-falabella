export class AppHeader extends HTMLElement {
  static get observedAttributes() { return ['title']; }

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
      /* Barra completa en verde */
      .bar {
        background: var(--brand);
        color: #fff;
        box-shadow: 0 1px 0 rgba(0,0,0,.05);
      }
      .container {
        max-width: 960px;
        margin: 0 auto;
        padding: 12px 16px;
      }
      header {
        display:flex; align-items:center; gap:12px;
      }
      .logo {
        width: 28px; height: 28px; border-radius: 6px;
        background: rgba(255,255,255,.95); /* cuadrito claro */
      }
      h1 {
        margin: 0;
        font: 600 1.1rem/1.2 system-ui, sans-serif;
        color: #fff; /* título en blanco */
      }
      /* Línea divisoria muy sutil bajo la barra */
      .divider {
        height: 1px;
        background: var(--border);
      }

      @media (max-width:600px){
        .container { padding: 10px 12px; }
        h1 { font-size: 1rem; }
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${css}</style>
      <div class="bar">
        <div class="container">
          <header>
            <div class="logo" aria-hidden="true"></div>
            <h1>${this.headerTitle}</h1>
            <slot></slot>
          </header>
        </div>
      </div>
      <div class="divider"></div>
    `;
  }
}

customElements.define('app-header', AppHeader);
