export class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const year = new Date().getFullYear();
    this.shadowRoot!.innerHTML = `
      <style>
        :host { display:block; }
        footer {
          max-width:960px; margin: 24px auto; padding: 16px;
          color:#6b7280; font: 400 .9rem/1.4 system-ui, sans-serif;
          border-top:1px solid #e5e7eb;
        }
        a { color:#2563eb; text-decoration:none; }
        a:hover { text-decoration:underline; }
      </style>
      <footer>
        <slot>© ${year} Front Falabella — demo técnica</slot>
      </footer>
    `;
  }
}
customElements.define('app-footer', AppFooter);
