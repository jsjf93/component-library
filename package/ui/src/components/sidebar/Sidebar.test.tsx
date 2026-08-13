import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Sidebar } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";

describe("Sidebar component", () => {
  test("renders sidebar container element", async () => {
    const { container } = await render(
      <Sidebar>
        <SidebarItem href="/dashboard" active>
          Dashboard
        </SidebarItem>
      </Sidebar>,
    );

    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();
  });

  test("renders active SidebarItem with aria-current='page'", async () => {
    const { getByRole } = await render(
      <SidebarItem href="/dashboard" active>
        Dashboard
      </SidebarItem>,
    );

    const link = getByRole("link", { name: "Dashboard" });
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("aria-current", "page");
  });

  test("supports polymorphic 'as' prop", async () => {
    const CustomLink = ({
      to,
      children,
      ...props
    }: {
      to: string;
      children: React.ReactNode;
    }) => (
      <a data-testid="custom-link" href={to} {...props}>
        {children}
      </a>
    );

    const { getByTestId } = await render(
      <SidebarItem as={CustomLink} to="/settings">
        Settings
      </SidebarItem>,
    );

    const customLink = getByTestId("custom-link");
    await expect.element(customLink).toBeInTheDocument();
    await expect.element(customLink).toHaveAttribute("href", "/settings");
  });

  test("renders mobile backdrop when open is true and calls onClose when clicked", async () => {
    const handleClose = vi.fn();
    const { container } = await render(
      <Sidebar open={true} onClose={handleClose}>
        <SidebarItem href="/home">Home</SidebarItem>
      </Sidebar>,
    );

    const backdrop = container.querySelector('[aria-hidden="true"]');
    expect(backdrop).not.toBeNull();

    (backdrop as HTMLElement).click();
    expect(handleClose).toHaveBeenCalled();
  });

  test("forwards ref to aside element", async () => {
    const ref = createRef<HTMLElement>();
    await render(<Sidebar ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("ASIDE");
  });
});
