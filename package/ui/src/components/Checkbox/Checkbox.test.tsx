import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Checkbox } from "./Checkbox";

describe("Checkbox component", () => {
  test("renders label linked to input via id", async () => {
    const { getByLabelText } = await render(<Checkbox label="Accept terms" />);
    const checkboxInput = getByLabelText("Accept terms");

    await expect.element(checkboxInput).toBeInTheDocument();
    await expect.element(checkboxInput).toHaveAttribute("type", "checkbox");
  });

  test("renders groupLabel when provided", async () => {
    const { getByText } = await render(
      <Checkbox label="Option 1" groupLabel="Settings Group" />,
    );
    const groupLabelElement = getByText("Settings Group");

    await expect.element(groupLabelElement).toBeInTheDocument();
  });

  test("renders error message with role='alert' when error prop is set", async () => {
    const { getByRole, getByText } = await render(
      <Checkbox label="Option" error="You must accept this" />,
    );
    const alert = getByRole("alert");
    const errorText = getByText("You must accept this");

    await expect.element(alert).toBeInTheDocument();
    await expect.element(errorText).toBeInTheDocument();
  });

  test("handles checked / onChange state changes", async () => {
    const handleChange = vi.fn();
    const { getByLabelText } = await render(
      <Checkbox label="Subscribe" onChange={handleChange} />,
    );
    const checkboxInput = getByLabelText("Subscribe");

    await checkboxInput.click();
    expect(handleChange).toHaveBeenCalled();
  });

  test("disables input when disabled prop is true", async () => {
    const { getByLabelText } = await render(
      <Checkbox label="Disabled option" disabled />,
    );
    const checkboxInput = getByLabelText("Disabled option");

    await expect.element(checkboxInput).toHaveAttribute("disabled");
  });

  test("forwards ref to the underlying HTMLInputElement", async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<Checkbox ref={ref} label="Ref Checkbox" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe("checkbox");
  });
});
