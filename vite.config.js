import { defineConfig } from 'vite'

export default defineConfig({
  base: '/chat/', // Replace 'chat' with your actual repository name
  server: {
    port: 3000,
    open: true
  }
}) 