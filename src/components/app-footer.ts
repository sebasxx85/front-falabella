export class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const year = new Date().getFullYear();
    this.shadowRoot!.innerHTML = `
      <style>
        :host { display:block; }
        .container{ max-width:960px; margin:24px auto; padding:16px; }
        footer {
          color: var(--muted);
          font: 400 .9rem/1.4 system-ui, sans-serif;
          border-top: 1px solid var(--border);
          padding-top: 12px;
        }
        a { color: var(--brand-600); text-decoration:none; }
        a:hover { text-decoration:underline; }
      </style>
      <div class="container">
        <footer>
          <slot>© ${year} Front Falabella — Sebastián Sepúlveda</slot>
        </footer>
      </div>
    `;
  }
}
customElements.define('app-footer', AppFooter);
