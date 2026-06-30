/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_READ_ONLY_DEMO?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
