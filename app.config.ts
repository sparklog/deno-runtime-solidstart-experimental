import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    rollupConfig: {
      external: ["node:async_hooks"],
    },
    experimental: {
      asyncContext: true,
    },
  },
});
