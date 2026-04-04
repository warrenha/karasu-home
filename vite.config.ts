import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/// <reference types="vitest/config" />
import { configDefaults, defineConfig } from 'vitest/config'

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
        setupFiles: './test/vitest/setup-tests.ts',
        // Don't run playwrite test as vitest tests:
        exclude: [
            ...configDefaults.exclude,
            'test/playwright/*'
        ]
    }
})
