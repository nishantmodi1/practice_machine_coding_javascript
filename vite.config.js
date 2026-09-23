import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [react()],
//   optimizeDeps: {
//     // Exclude the specific CSS path from Vite's dependency pre-bundling scan
//     exclude: ['grapesjs/dist/css/grapes.min.css'],
//   },
// }

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Exclude the specific CSS path from Vite's dependency pre-bundling scan
    exclude: ['grapesjs/dist/css/grapes.min.css'],
  },
});