import './style.css'

// Config (.env)
import { CONFIG } from './config/config'

// Servicio (GET https://api.github.com/users/{username})
import { githubApi } from './services/githubApi'

// Registrar Web Components
import './components/app-header'
import './components/app-footer'
import './components/search-input'
import './components/user-card'

// Logs para verificar las envs
console.log('API_BASE =>', CONFIG.API_BASE)
console.log('API_TIMEOUT_MS =>', CONFIG.API_TIMEOUT_MS)

// Referencia al componente <user-card>
const userCard = document.querySelector('user-card') as any;

// Escuchar el CustomEvent 'search' emitido por <search-input>
document.addEventListener('search', async (ev) => {
  // @ts-expect-error lectura simple de detail
  const username: string | undefined = ev?.detail?.username;
  if (!username) return;

  try {
    userCard.state = 'loading';
    const u = await githubApi.getUser(username);
    userCard.profile = {
      avatar_url: u.avatar_url,
      name: u.name,
      bio: u.bio,
      public_repos: u.public_repos,
      html_url: u.html_url,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Fallo desconocido';
    userCard.errorMessage = message;
  }
});
