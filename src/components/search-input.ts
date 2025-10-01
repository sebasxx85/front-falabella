export class SearchInput extends HTMLElement {
  private input!: HTMLInputElement;
  private button!: HTMLButtonElement;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { display:block; max-width:640px; margin:16px auto; font-family: system-ui, sans-serif; }
        form { display:flex; gap:8px; }
        input { flex:1; padding:10px 12px; border:1px solid #d1d5db; border-radius:8px; }
        button { padding:10px 14px; border-radius:8px; border:1px solid #111827; background:#111827; color:white; cursor:pointer; }
        button:disabled { opacity:.6; cursor:not-allowed; }
      </style>
      <form novalidate>
        <input type="text" name="username" placeholder="Ingresa usuario de GitHub (ej: octocat)" />
        <button type="submit">Buscar</button>
      </form>
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

  // API pública opcional para deshabilitar mientras carga
  set loading(v: boolean) {
    if (!this.button) return;
    this.button.disabled = v;
  }
}

customElements.define('search-input', SearchInput);
