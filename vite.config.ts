import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components')
        }
    },
    test: {
        environment: 'jsdom',
        setupFiles: './test/setup-tests.ts'
    }
})
