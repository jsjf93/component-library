import { describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { Button } from "../Button/Button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./Modal";

describe("Modal component", () => {
  test("renders modal dialog when open is true", async () => {
    const handleClose = vi.fn();
    await render(
      <Modal open={true} onClose={handleClose}>
        <ModalHeader title="Edit Profile" onClose={handleClose} />
        <ModalBody>Body text here</ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>,
    );

    const dialog = page.getByRole("dialog", { includeHidden: true });
    await expect.element(dialog).toBeInTheDocument();
    await expect.element(page.getByText("Edit Profile")).toBeInTheDocument();
    await expect.element(page.getByText("Body text here")).toBeInTheDocument();
  });

  test("does not render modal when open is false", async () => {
    const handleClose = vi.fn();
    await render(
      <Modal open={false} onClose={handleClose}>
        <ModalHeader title="Closed Modal" />
      </Modal>,
    );

    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });

  test("calls onClose when close button in ModalHeader is clicked", async () => {
    const handleClose = vi.fn();
    await render(
      <Modal open={true} onClose={handleClose}>
        <ModalHeader title="Modal Title" onClose={handleClose} />
      </Modal>,
    );

    const closeBtn = page.getByRole("button", {
      name: "Close modal",
      includeHidden: true,
    });
    await closeBtn.click();
    expect(handleClose).toHaveBeenCalled();
  });
});
