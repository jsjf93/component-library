import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@borderline-ui/ui/theme.css": resolve(
        import.meta.dirname,
        "../../../package/ui/src/theme.css",
      ),
      "@borderline-ui/ui/styles.css": resolve(
        import.meta.dirname,
        "../../../package/ui/src/index.css",
      ),
      "@borderline-ui/ui": resolve(
        import.meta.dirname,
        "../../../package/ui/src/index.ts",
      ),
      "@borderline-ui/icons": resolve(
        import.meta.dirname,
        "../../../package/icons/src/index.ts",
      ),
    };
    return config;
  },
};

export default config;
