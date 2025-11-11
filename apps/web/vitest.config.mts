import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    coverage: {
      include: ["app/**/*.{ts.tsx}", "lib/**/*.{ts,tsx}"],
      provider: "v8",
    },
  },
});
