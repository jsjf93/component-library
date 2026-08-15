import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@borderline/ui/theme.css": path.resolve(
        import.meta.dirname,
        "../../package/ui/src/theme.css",
      ),
      "@borderline/ui/styles.css": path.resolve(
        import.meta.dirname,
        "../../package/ui/src/index.css",
      ),
      "@borderline/ui": path.resolve(
        import.meta.dirname,
        "../../package/ui/src/index.ts",
      ),
      "@borderline/icons": path.resolve(
        import.meta.dirname,
        "../../package/icons/src/index.ts",
      ),
    },
  },
});
