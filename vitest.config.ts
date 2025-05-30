import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig,
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTest.ts",
    mockReset: true,
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify("http://localhost:3000"),
  },
});
