import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

const processEnvDefines = (mode: string) => ({
    'process.env.NODE_ENV': JSON.stringify(mode),
    'process.env.DRAGGABLE_DEBUG': 'false',
});

export default defineConfig(({mode}) => ({
    plugins: [react()],
    define: processEnvDefines(mode),
    optimizeDeps: {
        esbuildOptions: {
            define: processEnvDefines(mode),
        },
    },
    server: {
        port: 5173,
        strictPort: true,
    },
    build: {
        outDir: 'build',
    },
}));
