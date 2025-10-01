interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  readonly VITE_API_TIMEOUT_MS?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}