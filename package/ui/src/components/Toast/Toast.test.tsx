import { beforeEach, describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Toaster } from "./Toaster";
import { dismiss, toast } from "./toast-store";

describe("Toast component and store", () => {
  beforeEach(() => {
    dismiss();
  });

  test("renders toast when toast.success is called", async () => {
    const { getByText } = await render(<Toaster />);

    toast.success("Settings saved", {
      description: "Your profile has been updated.",
    });

    const titleElement = getByText("Settings saved");
    const descElement = getByText("Your profile has been updated.");

    await expect.element(titleElement).toBeInTheDocument();
    await expect.element(descElement).toBeInTheDocument();
  });

  test("dismisses toast when dismiss is called", async () => {
    const { getByText } = await render(<Toaster />);

    const id = toast.info("Information", { duration: Infinity });
    await expect.element(getByText("Information")).toBeInTheDocument();

    dismiss(id);
    await expect.element(getByText("Information")).not.toBeInTheDocument();
  });
});
