function requireEnv<K extends keyof ImportMetaEnv>(name: K): string {
  const value = import.meta.env[name];
  if (!value || String(value).trim() === '') {
    throw new Error(`Missing required env var: ${String(name)}`);
  }
  return String(value);
}

export const CONFIG = {
  API_BASE: requireEnv('VITE_API_BASE').replace(/\/+$/, ''),
  API_TIMEOUT_MS: (() => {
    const raw = import.meta.env.VITE_API_TIMEOUT_MS;
    const n = raw ? Number(raw) : 8000;
    return Number.isFinite(n) && n > 0 ? n : 8000;
  })()
} as const;