import { Button, Toaster, toast } from "@borderline-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Payment received")}>
          Success
        </Button>
        <Button onClick={() => toast.error("Payment failed")}>Error</Button>
        <Button onClick={() => toast.info("New feature available")}>
          Info
        </Button>
        <Button onClick={() => toast.warning("Your plan expires soon")}>
          Warning
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast.success("Transfer sent", {
              description:
                "$4,200.00 to Acme Corp will settle in 1-2 business days.",
            })
          }
        >
          Send transfer
        </Button>
        <Button
          onClick={() =>
            toast.error("Transfer failed", {
              description: "Insufficient funds in the source account.",
            })
          }
        >
          Trigger failure
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

// Exercises the two layout edge cases: a title long enough to wrap (the icon
// must stay pinned to the first line) and a title-only toast (which must not
// leave slack pooling under the text).
export const TitleLengths: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Payment received")}>
          Short, no description
        </Button>
        <Button
          onClick={() =>
            toast.warning(
              "Your scheduled transfer to Acme Corporation could not be completed",
            )
          }
        >
          Wrapping, no description
        </Button>
        <Button
          onClick={() =>
            toast.error(
              "Your scheduled transfer to Acme Corporation could not be completed",
              {
                description:
                  "The source account had insufficient funds at the time of the transfer.",
              },
            )
          }
        >
          Wrapping, with description
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

export const Positions: Story = {
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
  },
  args: {
    position: "bottom-right",
  },
  render: (args) => (
    <>
      <Button
        onClick={() =>
          toast.info("Positioned toast", { description: args.position })
        }
      >
        Fire toast
      </Button>
      <Toaster {...args} />
    </>
  ),
};

export const Stacking: Story = {
  render: () => (
    <>
      <Button
        onClick={() => {
          toast.success("First");
          toast.info("Second");
          toast.warning("Third");
          toast.error("Fourth");
          toast.success("Fifth");
        }}
      >
        Fire 5 toasts (only 3 shown)
      </Button>
      <Toaster max={3} />
    </>
  ),
};

export const Persistent: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast.warning("Action required", {
            description: "This toast stays until dismissed.",
            duration: Infinity,
          })
        }
      >
        Fire persistent toast
      </Button>
      <Toaster />
    </>
  ),
};

export const Programmatic: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.info(`Toast ${Date.now()}`)}>
          Fire toast
        </Button>
        <Button variant="outline" onClick={() => toast.dismiss()}>
          Dismiss all
        </Button>
      </div>
      <Toaster />
    </>
  ),
};
