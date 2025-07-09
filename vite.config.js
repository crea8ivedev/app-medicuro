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
  host: "0.0.0.0",
  proxy: {
    '/api': {
      target: env.VITE_API_BASE_URL,
      changeOrigin: true,
      secure: env.VITE_NODE_ENV === "production",
      ws: true,
    },
    '/google': {
      target: env.VITE_API_BASE_URL, // same backend target
      changeOrigin: true,
      secure: env.VITE_NODE_ENV === "production",
    },
    '/auth': {
      target: env.VITE_API_BASE_URL,
      changeOrigin: true,
      secure: env.VITE_NODE_ENV === "production",
    }
  }
},
  preview : {
    allowedHosts : ["medicuro-app.encircledev.com","http://192.168.1.125:5173"]
  }
}
})

