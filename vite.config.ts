import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/CatHealth/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'pages/about/index.html'),
        bloodRequest: resolve(__dirname, 'pages/blood-request/index.html'),
        contact: resolve(__dirname, 'pages/contact/index.html'),
        donate: resolve(__dirname, 'pages/donate/index.html'),
        emergency: resolve(__dirname, 'pages/emergency/index.html'),
        locations: resolve(__dirname, 'pages/locations/index.html'),
        login: resolve(__dirname, 'pages/login/index.html'),
        memberDashboard: resolve(__dirname, 'pages/member-dashboard/index.html'),
        petRegistration: resolve(__dirname, 'pages/pet-registration/index.html'),
        vetRegistration: resolve(__dirname, 'pages/vet-registration/index.html'),
        vetDashboard: resolve(__dirname, 'pages/vet-dashboard/index.html'),
        vision: resolve(__dirname, 'pages/vision/index.html'),
      },
    }
  }
});
