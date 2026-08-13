import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Alert, type AlertVariant } from "./Alert";

const VARIANTS: AlertVariant[] = ["success", "warning", "danger", "info"];

describe("Alert component", () => {
  test("renders with role=alert and the given title", async () => {
    const { getByRole } = await render(<Alert title="Rendered successfully" />);

    const element = getByRole("alert");
    await expect.element(element).toBeInTheDocument();
    await expect.element(element).toHaveTextContent("Rendered successfully");
  });

  test("renders children alongside the title", async () => {
    const { getByRole } = await render(
      <Alert title="Heads up" children="Some extra detail" />,
    );

    await expect
      .element(getByRole("alert"))
      .toHaveTextContent("Heads upSome extra detail");
  });

  test("omits the description element when no children are passed", async () => {
    const { container } = await render(<Alert title="No description" />);

    // Only the title <span> should be present, not a second one for children.
    expect(container.querySelectorAll("span.font-semibold + span")).toHaveLength(0);
  });

  test("defaults to the info variant", async () => {
    const { getByRole } = await render(<Alert title="Defaults to info" />);

    await expect.element(getByRole("alert")).toHaveClass("bg-info");
  });

  test.each(VARIANTS)("applies the %s variant's styling", async (variant) => {
    const { getByRole } = await render(<Alert variant={variant} title="Styled" />);

    await expect.element(getByRole("alert")).toHaveClass(`bg-${variant}`);
  });

  test("merges a custom className with the base classes", async () => {
    const { getByRole } = await render(
      <Alert title="Custom class" className="my-custom-class" />,
    );

    const element = getByRole("alert");
    await expect.element(element).toHaveClass("my-custom-class");
    await expect.element(element).toHaveClass("flex");
  });

  test("forwards arbitrary HTML attributes to the root element", async () => {
    const { getByRole } = await render(
      <Alert title="Extra props" data-testid="custom-alert" />,
    );

    await expect.element(getByRole("alert")).toHaveAttribute("data-testid", "custom-alert");
  });

  test("forwards the ref to the underlying div", async () => {
    const ref = createRef<HTMLDivElement>();
    await render(<Alert ref={ref} title="Ref check" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.getAttribute("role")).toBe("alert");
  });
});
