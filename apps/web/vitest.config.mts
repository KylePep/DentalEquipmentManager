import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Resolves the "@/*" path alias from tsconfig.json.
    tsconfigPaths: true,
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // Playwright specs live in e2e/ and are run by Playwright, not Vitest.
    exclude: ["e2e/**", "node_modules/**", ".next/**"],
  },
});
