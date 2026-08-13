import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Textarea } from "./Textarea";

describe("Textarea component", () => {
  test("renders label linked to textarea element", async () => {
    const { getByLabelText } = await render(<Textarea label="Feedback" />);
    const textarea = getByLabelText("Feedback");

    await expect.element(textarea).toBeInTheDocument();
  });

  test("displays character count when maxLength is set", async () => {
    const { getByText, getByRole } = await render(
      <Textarea label="Bio" maxLength={100} defaultValue="Hello" />,
    );
    const charCounter = getByText("5/100");

    await expect.element(charCounter).toBeInTheDocument();

    const textarea = getByRole("textbox");
    await textarea.fill("Hello World");
    await expect.element(getByText("11/100")).toBeInTheDocument();
  });

  test("renders error message with role='alert'", async () => {
    const { getByRole, getByText } = await render(
      <Textarea label="Comment" error="Comment cannot be empty" />,
    );
    const alert = getByRole("alert");
    const errorMsg = getByText("Comment cannot be empty");

    await expect.element(alert).toBeInTheDocument();
    await expect.element(errorMsg).toBeInTheDocument();
  });

  test("renders helperText when error is not present", async () => {
    const { getByText } = await render(
      <Textarea label="Bio" helperText="Max 200 characters" />,
    );
    const helperMsg = getByText("Max 200 characters");

    await expect.element(helperMsg).toBeInTheDocument();
  });

  test("handles onChange event", async () => {
    const handleChange = vi.fn();
    const { getByRole } = await render(
      <Textarea placeholder="Type something..." onChange={handleChange} />,
    );
    const textarea = getByRole("textbox");

    await textarea.fill("Testing Textarea");
    expect(handleChange).toHaveBeenCalled();
  });

  test("forwards ref to the underlying HTMLTextAreaElement", async () => {
    const ref = createRef<HTMLTextAreaElement>();
    await render(<Textarea ref={ref} label="Ref Textarea" />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
