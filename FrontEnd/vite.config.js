import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            }
        },
        server: {
            host: '0.0.0.0', // Escuchar en todas las interfaces de red
            port: 5173, // Puerto que deseas usar (puedes cambiarlo si lo deseas)
        }
    };
});
