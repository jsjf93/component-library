import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Alert } from "./Alert";

describe("Alert component", async () => {
  test("Renders success", async () => {
    const { getByRole } = await render(
      <Alert
        variant="success"
        title="Rendered successfully"
        children="Rendering the Alert component"
      />,
    );

    const element = getByRole("alert");
    expect(element).toBeInViewport();
  });
});
