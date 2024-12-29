import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            api: path.resolve(__dirname, 'src/api'),
            assets: path.resolve(__dirname, 'src/assets'),
            modules: path.resolve(__dirname, 'src/modules'),
            router: path.resolve(__dirname, 'src/router'),
            utils: path.resolve(__dirname, 'src/utils'),
            helper: path.resolve(__dirname, 'src/helper'),
            constants: path.resolve(__dirname, 'src/constants'),

            // core
            core: path.resolve(__dirname, 'src/modules/core'),
            core_components: path.resolve(__dirname, 'src/modules/core/components'),

            // modules
            auth: path.resolve(__dirname, 'src/modules/auth'),
            booking: path.resolve(__dirname, 'src/modules/booking'),
            home: path.resolve(__dirname, 'src/modules/home'),
            services: path.resolve(__dirname, 'src/modules/services'),
            addon: path.resolve(__dirname, 'src/modules/addon'),
            user: path.resolve(__dirname, 'src/modules/user'),
        },
    },
});
