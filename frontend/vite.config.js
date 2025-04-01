import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from 'url';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        http: 'http://localhost',
        port: 3000,
        host: true,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
