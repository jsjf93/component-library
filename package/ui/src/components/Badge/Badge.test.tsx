import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Badge, type BadgeVariant } from "./Badge";

const VARIANTS: BadgeVariant[] = [
  "default",
  "secondary",
  "outline",
  "destructive",
  "verified",
  "pending",
  "review",
  "failed",
];

const STATUS_VARIANTS: BadgeVariant[] = [
  "verified",
  "pending",
  "review",
  "failed",
];

describe("Badge component", () => {
  test("renders children correctly with default variant", async () => {
    const { getByText, container } = await render(<Badge>Default Badge</Badge>);
    const textElement = getByText("Default Badge");

    await expect.element(textElement).toBeInTheDocument();
    const badgeSpan = container.firstElementChild as HTMLElement;
    expect(badgeSpan.classList.contains("bg-primary")).toBe(true);
  });

  test.each(VARIANTS)(
    "renders variant %s with expected class",
    async (variant) => {
      const { container } = await render(
        <Badge variant={variant}>Badge</Badge>,
      );
      const badgeSpan = container.firstElementChild as HTMLElement;

      const variantClassMap: Record<BadgeVariant, string> = {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border-border",
        destructive: "bg-destructive",
        verified: "bg-success",
        pending: "bg-warning",
        review: "bg-info",
        failed: "bg-danger",
      };

      expect(badgeSpan.classList.contains(variantClassMap[variant])).toBe(true);
    },
  );

  test.each(STATUS_VARIANTS)(
    "renders status icon for %s variant",
    async (variant) => {
      const { container } = await render(
        <Badge variant={variant}>{variant}</Badge>,
      );
      const svgElement = container.querySelector("svg");

      expect(svgElement).not.toBeNull();
    },
  );

  test("forwards ref to the underlying span element", async () => {
    const ref = createRef<HTMLSpanElement>();
    await render(<Badge ref={ref}>Ref Badge</Badge>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
