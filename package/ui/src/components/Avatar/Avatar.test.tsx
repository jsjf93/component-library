import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Avatar, type AvatarSize } from "./Avatar";

const SIZES: AvatarSize[] = ["sm", "md", "lg"];

describe("Avatar component", () => {
  test("renders initials when provided and uppercases them up to 2 letters", async () => {
    const { getByText } = await render(<Avatar initials="joshua" />);
    const initialsElement = getByText("JO");

    await expect.element(initialsElement).toBeInTheDocument();
  });

  test("renders default user icon when no image or initials are provided", async () => {
    const { container } = await render(<Avatar />);
    const svgElement = container.querySelector("svg");

    expect(svgElement).not.toBeNull();
  });

  test("renders image when src is provided", async () => {
    const { container } = await render(
      <Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />,
    );
    const imgElement = container.querySelector("img");

    expect(imgElement).not.toBeNull();
    expect(imgElement?.getAttribute("src")).toBe(
      "https://example.com/avatar.jpg",
    );
    expect(imgElement?.getAttribute("alt")).toBe("User Avatar");
  });

  test.each(SIZES)(
    "applies correct container size classes for size %s",
    async (size) => {
      const { container } = await render(<Avatar size={size} initials="AB" />);
      const avatarSpan = container.firstElementChild as HTMLElement;

      const sizeClassMap: Record<AvatarSize, string> = {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      };

      expect(avatarSpan.classList.contains(sizeClassMap[size])).toBe(true);
    },
  );

  test("forwards ref to the outer span element", async () => {
    const ref = createRef<HTMLSpanElement>();
    await render(<Avatar ref={ref} initials="AB" />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
