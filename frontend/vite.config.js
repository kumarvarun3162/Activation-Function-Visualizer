import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tailwind v4 (2026): configuration is CSS-first.
// No tailwind.config.js needed — theme lives in index.css under @theme {}.
// Install: npm install tailwindcss @tailwindcss/vite @vitejs/plugin-react

export default defineConfig({
  plugins: [
    tailwindcss(),   // must come before react()
    react(),
  ],
  server: {
    port: 5173,
  },
});