import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { StatCard } from "./StatCard";

describe("StatCard component", () => {
  test("renders title and value", async () => {
    const { getByText } = await render(
      <StatCard title="Total Revenue" value="$45,231" />,
    );

    await expect.element(getByText("Total Revenue")).toBeInTheDocument();
    await expect.element(getByText("$45,231")).toBeInTheDocument();
  });

  test("renders icon when provided", async () => {
    const { container } = await render(
      <StatCard
        title="Active Users"
        value={1250}
        icon={<span data-testid="custom-icon">Icon</span>}
      />,
    );

    const iconElement = container.querySelector('[data-testid="custom-icon"]');
    expect(iconElement).not.toBeNull();
  });

  test("renders upward trend direction with positive indicator styling", async () => {
    const { getByText, container } = await render(
      <StatCard
        title="Conversion Rate"
        value="3.2%"
        trend={{ value: "+12% vs last month", direction: "up" }}
      />,
    );

    await expect.element(getByText("+12% vs last month")).toBeInTheDocument();
    const trendContainer = container.querySelector(".text-success-foreground");
    expect(trendContainer).not.toBeNull();
  });

  test("renders downward trend direction with negative indicator styling", async () => {
    const { getByText, container } = await render(
      <StatCard
        title="Bounce Rate"
        value="42%"
        trend={{ value: "-5% vs last month", direction: "down" }}
      />,
    );

    await expect.element(getByText("-5% vs last month")).toBeInTheDocument();
    const trendContainer = container.querySelector(".text-danger-foreground");
    expect(trendContainer).not.toBeNull();
  });

  test("forwards ref to card container element", async () => {
    const ref = createRef<HTMLDivElement>();
    await render(<StatCard ref={ref} title="Ref Test" value="100" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
