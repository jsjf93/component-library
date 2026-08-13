import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { RadioGroup, type RadioOption } from "./RadioGroup";

const OPTIONS: RadioOption[] = [
  { value: "free", label: "Free Tier", description: "Basic features" },
  { value: "pro", label: "Pro Tier", description: "Advanced features" },
  { value: "enterprise", label: "Enterprise Tier", disabled: true },
];

describe("RadioGroup component", () => {
  test("renders radiogroup with options and aria-labelledby", async () => {
    const { getByRole, getByText } = await render(
      <RadioGroup name="plan" label="Select a Plan" options={OPTIONS} />,
    );
    const radioGroup = getByRole("radiogroup");
    const groupLabel = getByText("Select a Plan");

    await expect.element(radioGroup).toBeInTheDocument();
    await expect.element(groupLabel).toBeInTheDocument();
  });

  test("renders option labels and descriptions", async () => {
    const { getByText } = await render(
      <RadioGroup name="plan" options={OPTIONS} defaultValue="free" />,
    );

    await expect.element(getByText("Free Tier")).toBeInTheDocument();
    await expect.element(getByText("Basic features")).toBeInTheDocument();
    await expect.element(getByText("Pro Tier")).toBeInTheDocument();
  });

  test("selects default option and handles option selection", async () => {
    const handleChange = vi.fn();
    const { getByLabelText } = await render(
      <RadioGroup
        name="plan"
        options={OPTIONS}
        defaultValue="free"
        onChange={handleChange}
      />,
    );

    const freeRadio = getByLabelText("Free Tier");
    const proRadio = getByLabelText("Pro Tier");

    const freeInput = freeRadio.element() as HTMLInputElement;
    const proInput = proRadio.element() as HTMLInputElement;

    expect(freeInput.checked).toBe(true);
    expect(proInput.checked).toBe(false);

    await proRadio.click();
    expect(handleChange).toHaveBeenCalledWith("pro");
  });

  test("disables disabled option", async () => {
    const { getByLabelText } = await render(
      <RadioGroup name="plan" options={OPTIONS} />,
    );

    const enterpriseRadio = getByLabelText("Enterprise Tier");
    await expect.element(enterpriseRadio).toHaveAttribute("disabled");
  });

  test("forwards ref to the outer container div", async () => {
    const ref = createRef<HTMLDivElement>();
    await render(<RadioGroup ref={ref} name="plan" options={OPTIONS} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.getAttribute("role")).toBe("radiogroup");
  });
});
