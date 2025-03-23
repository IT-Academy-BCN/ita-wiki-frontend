import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/hooks/**/*.test.tsx"],
    environment: "jsdom",
  },
});
