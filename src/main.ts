import './style.css'
import { CONFIG } from './config/config'

// Servicio GET https://api.github.com/users/{username}
import { githubApi } from './services/githubApi'

//Web Components
import './components/app-header'
import './components/app-footer'
import './components/search-input'
import './components/user-card'

// Helpers para forzar un mínimo de duración del loading
const sleep = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

async function withMinDelay<T>(promise: Promise<T>, minMs = 600): Promise<T> {
  const [result] = await Promise.all([promise, sleep(minMs)]);
  return result;
}

console.log('API_BASE =>', CONFIG.API_BASE)
console.log('API_TIMEOUT_MS =>', CONFIG.API_TIMEOUT_MS)

const userCard = document.querySelector('user-card') as (HTMLElement & any);

// Escuchar el CustomEvent 'search' emitido por <search-input>
document.addEventListener('search', async (ev) => {
  // @ts-expect-error lectura simple de detail
  const username: string | undefined = ev?.detail?.username;
  if (!username) return;

  // La tarjeta está oculta al inicio
  if (userCard.hasAttribute('hidden')) {
    userCard.removeAttribute('hidden');
  }

  try {
  userCard.state = 'loading';

  const u = await withMinDelay(githubApi.getUser(username), 600);

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
