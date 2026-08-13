import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Select } from "./Select";

describe("Select component", () => {
  test("renders label and select element", async () => {
    const { getByLabelText } = await render(
      <Select label="Country">
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </Select>,
    );
    const selectElement = getByLabelText("Country");

    await expect.element(selectElement).toBeInTheDocument();
  });

  test("renders placeholder option when provided", async () => {
    const { getByRole, getByText } = await render(
      <Select label="Country" placeholder="Choose a country">
        <option value="us">United States</option>
      </Select>,
    );
    const selectElement = getByRole("combobox");
    const placeholderOption = getByText("Choose a country");

    await expect.element(selectElement).toBeInTheDocument();
    await expect.element(placeholderOption).toBeInTheDocument();
    const optElement = placeholderOption.element() as HTMLOptionElement;
    expect(optElement.disabled).toBe(true);
  });

  test("renders error message with role='alert'", async () => {
    const { getByRole, getByText } = await render(
      <Select label="Country" error="Selection required">
        <option value="us">United States</option>
      </Select>,
    );
    const alert = getByRole("alert");
    const errorText = getByText("Selection required");

    await expect.element(alert).toBeInTheDocument();
    await expect.element(errorText).toBeInTheDocument();
  });

  test("handles selection change / onChange event", async () => {
    const handleChange = vi.fn();
    const { getByRole } = await render(
      <Select label="Country" onChange={handleChange}>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </Select>,
    );
    const selectElement = getByRole("combobox");

    await selectElement.selectOptions("uk");
    expect(handleChange).toHaveBeenCalled();
  });

  test("forwards ref to the underlying HTMLSelectElement", async () => {
    const ref = createRef<HTMLSelectElement>();
    await render(
      <Select ref={ref} label="Country">
        <option value="us">United States</option>
      </Select>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
