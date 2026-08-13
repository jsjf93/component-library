import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Progress } from "./Progress";

describe("Progress component", () => {
  test("renders label, progressbar role, and percentage display", async () => {
    const { getByRole, getByText } = await render(
      <Progress label="Uploading file" value={45} max={100} />,
    );

    const labelElement = getByText("Uploading file");
    const pctElement = getByText("45%");
    const progressBar = getByRole("progressbar");

    await expect.element(labelElement).toBeInTheDocument();
    await expect.element(pctElement).toBeInTheDocument();
    await expect.element(progressBar).toHaveAttribute("aria-valuenow", "45");
    await expect.element(progressBar).toHaveAttribute("aria-valuemin", "0");
    await expect.element(progressBar).toHaveAttribute("aria-valuemax", "100");
  });

  test("clamps value above max to max", async () => {
    const { getByRole } = await render(
      <Progress label="Over max" value={150} max={100} />,
    );
    const progressBar = getByRole("progressbar", { name: "Over max" });
    await expect.element(progressBar).toHaveAttribute("aria-valuenow", "100");
  });

  test("clamps value below min to 0", async () => {
    const { getByRole } = await render(
      <Progress label="Under min" value={-20} max={100} />,
    );
    const progressBar = getByRole("progressbar", { name: "Under min" });
    await expect.element(progressBar).toHaveAttribute("aria-valuenow", "0");
  });

  test("uses custom formatValue function when provided", async () => {
    const formatFn = (val: number, max: number) => `${val} of ${max} items`;
    const { getByText } = await render(
      <Progress
        label="Items loaded"
        value={3}
        max={10}
        formatValue={formatFn}
      />,
    );

    await expect.element(getByText("3 of 10 items")).toBeInTheDocument();
  });

  test("forwards ref to outer container div", async () => {
    const ref = createRef<HTMLDivElement>();
    await render(<Progress ref={ref} label="Ref Progress" value={50} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
