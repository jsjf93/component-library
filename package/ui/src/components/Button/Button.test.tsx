import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
];

const SIZES: ButtonSize[] = ["sm", "default", "lg", "icon"];

describe("Button component", () => {
  test("renders with children and default props", async () => {
    const { getByRole } = await render(<Button>Click me</Button>);

    const button = getByRole("button", { name: "Click me" });
    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveTextContent("Click me");
    await expect.element(button).toHaveAttribute("type", "button");
    await expect.element(button).toHaveClass("bg-primary");
    await expect.element(button).toHaveClass("h-10");
  });

  test.each(VARIANTS)("renders correct variant styling for %s", async (variant) => {
    const { getByRole } = await render(<Button variant={variant}>Button {variant}</Button>);
    const button = getByRole("button", { name: `Button ${variant}` });

    const variantClassMap: Record<ButtonVariant, string> = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      outline: "border-border",
      ghost: "border-transparent",
      link: "text-primary",
      destructive: "bg-destructive",
    };

    await expect.element(button).toHaveClass(variantClassMap[variant]);
  });

  test.each(SIZES)("renders correct size styling for %s", async (size) => {
    const { getByRole } = await render(<Button size={size}>Size {size}</Button>);
    const button = getByRole("button", { name: `Size ${size}` });

    const sizeClassMap: Record<ButtonSize, string> = {
      sm: "h-8",
      default: "h-10",
      lg: "h-11",
      icon: "w-10",
    };

    await expect.element(button).toHaveClass(sizeClassMap[size]);
  });

  test("applies fullWidth class when fullWidth is true", async () => {
    const { getByRole } = await render(<Button fullWidth>Full Width</Button>);
    const button = getByRole("button", { name: "Full Width" });

    await expect.element(button).toHaveClass("w-full");
  });

  test("applies pulse class when pulse is true", async () => {
    const { getByRole } = await render(
      <Button pulse variant="primary">
        Pulse
      </Button>,
    );
    const button = getByRole("button", { name: "Pulse" });

    await expect.element(button).toHaveClass("animate-button-pulse");
  });

  test("handles click events when enabled", async () => {
    const handleClick = vi.fn();
    const { getByRole } = await render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByRole("button", { name: "Click me" });

    await button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("handles disabled state correctly", async () => {
    const handleClick = vi.fn();
    const { getByRole } = await render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    const button = getByRole("button", { name: "Disabled" });

    await expect.element(button).toHaveAttribute("disabled");
    await expect.element(button).toHaveClass("opacity-50");
    await expect.element(button).toHaveClass("cursor-not-allowed");
    await expect.element(button).toHaveClass("pointer-events-none");
  });

  test("handles loading state correctly", async () => {
    const handleClick = vi.fn();
    const { getByRole, container } = await render(
      <Button loading onClick={handleClick}>
        Loading...
      </Button>,
    );
    const button = getByRole("button", { name: "Loading..." });

    await expect.element(button).toHaveAttribute("disabled");
    await expect.element(button).toHaveClass("opacity-75");
    await expect.element(button).toHaveClass("cursor-wait");
    await expect.element(button).toHaveClass("pointer-events-none");

    // Check for spinner SVG element
    const svgElement = container.querySelector("svg");
    expect(svgElement).not.toBeNull();
  });

  test("supports button type submit", async () => {
    const { getByRole } = await render(<Button type="submit">Submit</Button>);
    const button = getByRole("button", { name: "Submit" });
    await expect.element(button).toHaveAttribute("type", "submit");
  });

  test("supports button type reset", async () => {
    const { getByRole } = await render(<Button type="reset">Reset</Button>);
    const button = getByRole("button", { name: "Reset" });
    await expect.element(button).toHaveAttribute("type", "reset");
  });

  test("merges custom class names with base classes", async () => {
    const { getByRole } = await render(<Button className="custom-class-123">Custom</Button>);
    const button = getByRole("button", { name: "Custom" });

    await expect.element(button).toHaveClass("custom-class-123");
    await expect.element(button).toHaveClass("inline-flex");
  });

  test("forwards arbitrary HTML attributes", async () => {
    const { getByRole } = await render(
      <Button data-testid="test-btn" aria-label="Action button">
        Custom Attributes
      </Button>,
    );
    const button = getByRole("button", { name: "Action button" });

    await expect.element(button).toHaveAttribute("data-testid", "test-btn");
    await expect.element(button).toHaveAttribute("aria-label", "Action button");
  });

  test("forwards the ref to the underlying HTMLButtonElement", async () => {
    const ref = createRef<HTMLButtonElement>();
    await render(<Button ref={ref}>Ref Button</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe("BUTTON");
    expect(ref.current?.textContent).toBe("Ref Button");
  });
});
