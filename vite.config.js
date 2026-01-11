import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        portafolio: resolve(__dirname, 'portafolio.html'),
        cv: resolve(__dirname, 'cv.html'),
      }
    }
  }
})
