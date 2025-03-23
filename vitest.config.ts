/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
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
  },
});
