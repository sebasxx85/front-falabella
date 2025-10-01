type CardState = 'idle' | 'loading' | 'error' | 'ready';

type Profile = {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  html_url: string;
};

export class UserCard extends HTMLElement {
  private _state: CardState = 'idle';
  private _error = '';
  private _profile: Profile | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  set state(v: CardState) { this._state = v; this.render(); }
  set profile(p: Profile | null) { this._profile = p; this._state = p ? 'ready' : 'idle'; this.render(); }
  set errorMessage(msg: string) { this._error = msg; this._state = 'error'; this.render(); }

  private render() {
    const css = `
      :host { display:block; max-width:720px; margin:16px auto; font-family: system-ui, sans-serif; }
      .card { border:1px solid #e5e7eb; border-radius:12px; padding:16px; box-shadow: 0 1px 2px rgba(0,0,0,.06); }
      .row { display:flex; gap:16px; align-items:center; }
      img { width:96px; height:96px; border-radius:50%; object-fit:cover; }
      h2 { margin:0 0 6px 0; font-size:1.25rem; }
      p { margin:4px 0; color:#374151; }
      a { color:#2563eb; text-decoration:none; }
      a:hover { text-decoration:underline; }
      .muted { color:#6b7280; }
      @media (max-width:600px){ .row{ flex-direction:column; align-items:flex-start; } img{ width:80px;height:80px; } }

      /* Spinner reutilizable dentro del componente */
      .spinner { width:28px; height:28px; border-radius:50%; border:3px solid #e5e7eb; border-top-color:#111827; animation: spin .8s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
    `;

    let html = `<div class="card muted">Ingrese un usuario…</div>`;

    if (this._state === 'loading') {
      html = `
        <div class="card" aria-busy="true">
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="spinner" aria-hidden="true"></div>
            <span>Buscando usuario…</span>
          </div>
        </div>`;
    }

    if (this._state === 'error') {
      html = `<div class="card" role="alert" style="color:#b91c1c;">Error: ${this._error || 'Usuario no encontrado'}</div>`;
    }

    if (this._state === 'ready' && this._profile) {
      const u = this._profile;
      html = `
        <article class="card">
          <div class="row">
            <img alt="Avatar" src="${u.avatar_url}">
            <div>
              <h2>${u.name ?? '(sin nombre)'}</h2>
              <p>${u.bio ?? ''}</p>
              <p class="muted">Repos públicos: <strong>${u.public_repos}</strong></p>
              <a href="${u.html_url}" target="_blank" rel="noopener">Ver perfil</a>
            </div>
          </div>
        </article>`;
    }

    this.shadowRoot!.innerHTML = `<style>${css}</style>${html}`;
  }
}

customElements.define('user-card', UserCard);
