import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { AppShell } from "./AppShell";
import { Sidebar } from "../Sidebar/Sidebar";

describe("AppShell component", () => {
  test("renders sidebar and main content", async () => {
    const { getByText } = await render(
      <AppShell sidebar={<Sidebar>Sidebar Content</Sidebar>}>
        Main Content Area
      </AppShell>,
    );

    await expect.element(getByText("Sidebar Content")).toBeInTheDocument();
    await expect.element(getByText("Main Content Area")).toBeInTheDocument();
  });

  test("renders mobile navigation button", async () => {
    const { getByRole } = await render(
      <AppShell sidebar={<Sidebar />}>Content</AppShell>,
    );

    const mobileMenuBtn = getByRole("button", { name: "Open navigation" });
    await expect.element(mobileMenuBtn).toBeInTheDocument();
  });
});
