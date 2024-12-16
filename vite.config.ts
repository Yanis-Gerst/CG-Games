import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  optimizeDeps: {
    exclude: ["@babylonjs/havok"],
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
