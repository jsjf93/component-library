import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@borderline-ui/ui/theme.css": path.resolve(
        import.meta.dirname,
        "../../package/ui/src/theme.css",
      ),
      "@borderline-ui/ui/styles.css": path.resolve(
        import.meta.dirname,
        "../../package/ui/src/index.css",
      ),
      "@borderline-ui/ui": path.resolve(
        import.meta.dirname,
        "../../package/ui/src/index.ts",
      ),
      "@borderline-ui/icons": path.resolve(
        import.meta.dirname,
        "../../package/icons/src/index.ts",
      ),
    },
  },
});
