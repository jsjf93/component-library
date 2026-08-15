import { dirname } from "node:path";
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
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(ts|tsx)",
    "../../icons/src/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
};

export default config;
