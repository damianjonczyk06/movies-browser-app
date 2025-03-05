/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_TMDB_API_KEY: string;
  readonly VITE_TMDB_AUTH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
