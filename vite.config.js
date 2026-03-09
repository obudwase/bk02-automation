import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/bk02-automation/",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    // Dev only: proxy /bk02-automation/api → local Express server
    proxy: {
      "/bk02-automation/api": {
        target: "http://localhost:3001",
        rewrite: (path) => path.replace(/^\/bk02-automation/, ""),
      },
    },
  },
});
