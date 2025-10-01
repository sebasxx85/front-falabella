export class SearchInput extends HTMLElement {
  private input!: HTMLInputElement;
  private button!: HTMLButtonElement;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { display:block; }
        .wrap{ max-width:960px; margin:16px auto; padding:0 16px; }
        form { display:flex; gap:8px; }
        label{ position:absolute; left:-9999px; } /* accesible pero oculto */
        input {
          flex:1;
          padding:10px 12px;
          border:1px solid var(--border);
          border-radius: var(--radius);
          background:#fff;
          outline:none;
        }
        input:focus{ border-color: var(--brand); box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand) 25%, transparent); }
        button{
          padding:10px 14px;
          border-radius: var(--radius);
          border:1px solid var(--brand);
          background: var(--brand);
          color:#fff;
          cursor:pointer;
          transition: filter .15s ease;
        }
        button:hover{ filter: brightness(0.95); }
        button:disabled{ opacity:.65; cursor:not-allowed; }
        @media (max-width: 640px){
          form{ flex-direction:column; }
          button{ width:100%; }
        }
      </style>
      <div class="wrap">
        <form novalidate>
          <label for="username">Usuario de GitHub</label>
          <input id="username" type="text" name="username" placeholder="Ingresa usuario de GitHub (ej: octocat)" />
          <button type="submit">Buscar</button>
        </form>
      </div>
    `;
  }

  connectedCallback() {
    const form = this.shadowRoot!.querySelector('form') as HTMLFormElement;
    this.input = form.querySelector('input')!;
    this.button = form.querySelector('button')!;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = this.input.value.trim();
      if (!username) return;
      this.dispatchEvent(new CustomEvent('search', {
        detail: { username },
        bubbles: true, composed: true
      }));
    });
  }

  // API pública para deshabilitar mientras carga
  set loading(v: boolean) {
    if (!this.button) return;
    this.button.disabled = v;
  }
}

customElements.define('search-input', SearchInput);
