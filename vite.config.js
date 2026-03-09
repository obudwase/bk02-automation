import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/oe-automation/",
  plugins: [react()],
  server: {
    proxy: {
      "/oe-automation/api": "http://localhost:3001",
    },
  },
});
