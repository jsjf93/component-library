import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("ThemeToggle component", () => {
  test("renders theme toggle button inside ThemeProvider with light theme default", async () => {
    const { getByRole } = await render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = getByRole("button", { name: "Switch to dark theme" });
    await expect.element(button).toBeInTheDocument();
  });

  test("toggles theme and updates aria-label when clicked", async () => {
    const { getByRole } = await render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );

    const lightBtn = getByRole("button", { name: "Switch to dark theme" });
    await lightBtn.click();

    const darkBtn = getByRole("button", { name: "Switch to light theme" });
    await expect.element(darkBtn).toBeInTheDocument();
  });
});
