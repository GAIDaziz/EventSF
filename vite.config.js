import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/users': {
    target: 'http://localhost:3005',
    changeOrigin: true,
  },
      '/api': { // Toutes les requêtes commençant par /api seront redirigées
        target: 'http://localhost:3005', // URL de ton backend
        changeOrigin: true, // Nécessaire si ton backend est sur un domaine différent
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optionnel : supprime /api du chemin de la requête
      },
    },
  },
})
