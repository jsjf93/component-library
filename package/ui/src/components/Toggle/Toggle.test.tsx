import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Toggle } from "./Toggle";

describe("Toggle component", () => {
  test("renders switch role with aria-checked", async () => {
    const { getByRole } = await render(<Toggle defaultChecked={true} />);
    const switchElement = getByRole("switch");

    await expect.element(switchElement).toBeInTheDocument();
    await expect.element(switchElement).toHaveAttribute("aria-checked", "true");
  });

  test("toggles checked state when clicked", async () => {
    const handleChange = vi.fn();
    const { getByRole } = await render(
      <Toggle defaultChecked={false} onChange={handleChange} />,
    );
    const switchElement = getByRole("switch");

    await expect
      .element(switchElement)
      .toHaveAttribute("aria-checked", "false");

    await switchElement.click();
    expect(handleChange).toHaveBeenCalledWith(true);
    await expect.element(switchElement).toHaveAttribute("aria-checked", "true");
  });

  test("toggles when label is clicked", async () => {
    const handleChange = vi.fn();
    const { getByText, getByRole } = await render(
      <Toggle label="Enable Notifications" onChange={handleChange} />,
    );
    const labelSpan = getByText("Enable Notifications");
    const switchElement = getByRole("switch");

    await labelSpan.click();
    expect(handleChange).toHaveBeenCalledWith(true);
    await expect.element(switchElement).toHaveAttribute("aria-checked", "true");
  });

  test("respects controlled checked prop", async () => {
    const { getByRole } = await render(<Toggle checked={true} />);
    const switchElement = getByRole("switch");

    await expect.element(switchElement).toHaveAttribute("aria-checked", "true");
  });

  test("does not toggle when disabled", async () => {
    const handleChange = vi.fn();
    const { getByRole } = await render(
      <Toggle disabled onChange={handleChange} />,
    );
    const switchElement = getByRole("switch");

    await expect.element(switchElement).toHaveAttribute("disabled");
  });

  test("forwards ref to the underlying button element", async () => {
    const ref = createRef<HTMLButtonElement>();
    await render(<Toggle ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
