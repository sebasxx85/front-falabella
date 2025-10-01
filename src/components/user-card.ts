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
      :host { display:block; }
      .wrap{ max-width:960px; margin:16px auto; padding:0 16px; }
      .card { border:1px solid var(--border); border-radius: var(--radius); padding:16px; box-shadow: var(--shadow-sm); background:#fff; }
      .row { display:flex; gap:16px; align-items:center; }
      img { width:96px; height:96px; border-radius:50%; object-fit:cover; }
      h2 { margin:0 0 6px 0; font-size:1.25rem; }
      p { margin:4px 0; color:var(--text); }
      a { color:#2563eb; text-decoration:none; }
      a:hover { text-decoration:underline; }
      .muted { color:var(--muted); }

      /* Spinner con color de marca */
      .spinner { width:28px; height:28px; border-radius:50%; border:3px solid var(--border); border-top-color: var(--brand); animation: spin .8s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }

      /* Responsive */
      @media (max-width:600px){ .row{ flex-direction:column; align-items:flex-start; } img{ width:84px;height:84px; } }
    `;

    let content = `<div class="card muted">Ingrese un usuario…</div>`;

    if (this._state === 'loading') {
      content = `
        <div class="card" aria-busy="true">
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="spinner" aria-hidden="true"></div>
            <span>Buscando usuario…</span>
          </div>
        </div>`;
    }

    if (this._state === 'error') {
      content = `<div class="card" role="alert" style="color:#b91c1c;">Error: ${this._error || 'Usuario no encontrado'}</div>`;
    }

    if (this._state === 'ready' && this._profile) {
      const u = this._profile;
      content = `
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

    this.shadowRoot!.innerHTML = `<style>${css}</style><div class="wrap">${content}</div>`;
  }
}

customElements.define('user-card', UserCard);
