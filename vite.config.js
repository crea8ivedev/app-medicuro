import { defineConfig , loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig(({command,mode}) => {
  const env = loadEnv(mode,process.cwd(), "")
  return {
  plugins: [react(), eslint(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: env.VITE_NODE_ENV == "production",
        // rewrite: (path) => path.replace(/^\/api/, ''),
        ws:true
      },
    }
  }
}
})

