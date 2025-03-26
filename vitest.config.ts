/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTest.ts",
    outputFile: "json",
    globals: true,
    coverage: {
      enabled: true,
      provider: "v8",
      cleanOnRerun: true,
    },
    css: true,
    include: [
      "**/__test__/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "./src/**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
  },
});
