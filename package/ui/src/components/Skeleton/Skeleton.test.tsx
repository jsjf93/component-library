import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Skeleton } from "./Skeleton";

describe("Skeleton component", () => {
  test("renders with aria-hidden and animation class", async () => {
    const { container } = await render(<Skeleton className="h-4 w-32" />);
    const div = container.firstElementChild as HTMLElement;

    expect(div.getAttribute("aria-hidden")).toBe("true");
    expect(div.classList.contains("animate-skeleton-pulse")).toBe(true);
    expect(div.classList.contains("h-4")).toBe(true);
    expect(div.classList.contains("w-32")).toBe(true);
  });

  test("forwards ref to underlying div element", async () => {
    const ref = createRef<HTMLDivElement>();
    await render(<Skeleton ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
