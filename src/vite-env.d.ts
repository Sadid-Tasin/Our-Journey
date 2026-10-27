/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_EMAILJS_SERVICE_ID: string;
    readonly VITE_EMAILJS_TEMPLATE_ID_TO_ME: string;
    readonly VITE_EMAILJS_TEMPLATE_ID_TO_HER: string;
    readonly VITE_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
