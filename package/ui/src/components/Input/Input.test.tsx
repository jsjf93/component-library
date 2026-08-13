import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Input } from "./Input";

describe("Input component", () => {
  test("renders label linked to input element", async () => {
    const { getByLabelText } = await render(<Input label="Email address" />);
    const inputElement = getByLabelText("Email address");

    await expect.element(inputElement).toBeInTheDocument();
  });

  test("renders search icon when variant is search", async () => {
    const { container } = await render(
      <Input variant="search" placeholder="Search..." />,
    );
    const svgElement = container.querySelector("svg");

    expect(svgElement).not.toBeNull();
  });

  test("toggles password visibility when password toggle button is clicked", async () => {
    const { getByRole, container } = await render(
      <Input type="password" label="Password" />,
    );

    const inputElement = container.querySelector("input");
    expect(inputElement?.getAttribute("type")).toBe("password");

    const toggleBtn = getByRole("button", { name: "Show password" });
    await expect.element(toggleBtn).toBeInTheDocument();

    await toggleBtn.click();
    expect(inputElement?.getAttribute("type")).toBe("text");

    const hideBtn = getByRole("button", { name: "Hide password" });
    await expect.element(hideBtn).toBeInTheDocument();
  });

  test("renders error message with role='alert'", async () => {
    const { getByRole, getByText } = await render(
      <Input label="Username" error="Username is required" />,
    );
    const alert = getByRole("alert");
    const errorMsg = getByText("Username is required");

    await expect.element(alert).toBeInTheDocument();
    await expect.element(errorMsg).toBeInTheDocument();
  });

  test("renders helper text when error is not set", async () => {
    const { getByText } = await render(
      <Input label="Username" helperText="Enter a unique username" />,
    );
    const helperMsg = getByText("Enter a unique username");

    await expect.element(helperMsg).toBeInTheDocument();
  });

  test("handles typing / onChange events", async () => {
    const handleChange = vi.fn();
    const { getByRole } = await render(
      <Input placeholder="Type here" onChange={handleChange} />,
    );
    const input = getByRole("textbox");

    await input.fill("Hello World");
    expect(handleChange).toHaveBeenCalled();
  });

  test("forwards ref to the underlying HTMLInputElement", async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<Input ref={ref} label="Ref Input" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
