import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Card } from "./Card";

describe("Card component", () => {
  test("renders children and default variant styling", async () => {
    const { getByText, container } = await render(<Card>Card content</Card>);
    const textElement = getByText("Card content");

    await expect.element(textElement).toBeInTheDocument();
    const cardDiv = container.firstElementChild as HTMLElement;
    expect(cardDiv.classList.contains("bg-card")).toBe(true);
  });

  test("applies highlighted variant styling", async () => {
    const { container } = await render(
      <Card variant="highlighted">Highlighted</Card>,
    );
    const cardDiv = container.firstElementChild as HTMLElement;

    expect(cardDiv.classList.contains("border-primary")).toBe(true);
  });

  test("merges custom className with base classes", async () => {
    const { container } = await render(
      <Card className="my-card-class">Content</Card>,
    );
    const cardDiv = container.firstElementChild as HTMLElement;

    expect(cardDiv.classList.contains("my-card-class")).toBe(true);
    expect(cardDiv.classList.contains("rounded-2xl")).toBe(true);
  });

  test("forwards ref to the underlying div element", async () => {
    const ref = createRef<HTMLDivElement>();
    await render(<Card ref={ref}>Ref Card</Card>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
