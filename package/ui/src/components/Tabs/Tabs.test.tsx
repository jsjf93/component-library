import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Tabs } from "./Tabs";
import { TabList } from "./TabList";
import { Tab } from "./Tab";

describe("Tabs component", () => {
  test("renders tablist and tabs with correct initial selected state", async () => {
    const { getByRole } = await render(
      <Tabs defaultValue="account">
        <TabList>
          <Tab value="account">Account</Tab>
          <Tab value="password">Password</Tab>
        </TabList>
      </Tabs>,
    );

    const tabList = getByRole("tablist");
    const accountTab = getByRole("tab", { name: "Account" });
    const passwordTab = getByRole("tab", { name: "Password" });

    await expect.element(tabList).toBeInTheDocument();
    await expect.element(accountTab).toHaveAttribute("aria-selected", "true");
    await expect.element(passwordTab).toHaveAttribute("aria-selected", "false");
  });

  test("switches active tab and calls onValueChange on tab click", async () => {
    const handleValueChange = vi.fn();
    const { getByRole } = await render(
      <Tabs defaultValue="account" onValueChange={handleValueChange}>
        <TabList>
          <Tab value="account">Account</Tab>
          <Tab value="password">Password</Tab>
        </TabList>
      </Tabs>,
    );

    const passwordTab = getByRole("tab", { name: "Password" });
    const accountTab = getByRole("tab", { name: "Account" });

    await passwordTab.click();
    expect(handleValueChange).toHaveBeenCalledWith("password");
    await expect.element(passwordTab).toHaveAttribute("aria-selected", "true");
    await expect.element(accountTab).toHaveAttribute("aria-selected", "false");
  });

  test("respects controlled value prop", async () => {
    const { getByRole } = await render(
      <Tabs value="password">
        <TabList>
          <Tab value="account">Account</Tab>
          <Tab value="password">Password</Tab>
        </TabList>
      </Tabs>,
    );

    const passwordTab = getByRole("tab", { name: "Password" });
    await expect.element(passwordTab).toHaveAttribute("aria-selected", "true");
  });
});
