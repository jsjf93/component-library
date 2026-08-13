import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Spinner, type SpinnerSize } from "./Spinner";

const SIZES: SpinnerSize[] = ["sm", "md", "lg"];

describe("Spinner component", () => {
  test("renders with role='status' and default aria-label", async () => {
    const { getByRole } = await render(<Spinner />);
    const spinner = getByRole("status");

    await expect.element(spinner).toBeInTheDocument();
    await expect.element(spinner).toHaveAttribute("aria-label", "Loading…");
  });

  test("uses custom aria-label when provided", async () => {
    const { getByRole } = await render(<Spinner label="Saving changes..." />);
    const spinner = getByRole("status");

    await expect
      .element(spinner)
      .toHaveAttribute("aria-label", "Saving changes...");
  });

  test.each(SIZES)("applies size class %s to inner icon", async (size) => {
    const { container } = await render(<Spinner size={size} />);
    const svgElement = container.querySelector("svg");

    const sizeClassMap: Record<SpinnerSize, string> = {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
    };

    expect(svgElement).not.toBeNull();
    expect(svgElement?.classList.contains(sizeClassMap[size])).toBe(true);
    expect(svgElement?.classList.contains("animate-spin")).toBe(true);
  });

  test("forwards ref to outer span element", async () => {
    const ref = createRef<HTMLSpanElement>();
    await render(<Spinner ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
