import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { useTheme } from "../../theme/theme-context";

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function Readout() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
        <ThemeToggle />
        <div className="text-sm">
          <p className="font-medium text-foreground">
            Resolved: {resolvedTheme}
          </p>
          <p className="text-muted-foreground">Preference: {theme}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className="text-xs text-muted-foreground underline underline-offset-4"
      >
        Reset to system
      </button>
    </div>
  );
}

export const WithHookReadout: Story = {
  render: () => <Readout />,
};
