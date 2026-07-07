import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    label: 'KYC Verification',
    value: 67,
  },
}

export const WithCustomValue: Story = {
  args: {
    label: 'Monthly spend limit',
    value: 8400,
    max: 10000,
    formatValue: (v: number, m: number) =>
      `$${v.toLocaleString()} / $${m.toLocaleString()}`,
  },
}

export const Complete: Story = {
  args: {
    label: 'Profile setup',
    value: 100,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Progress label="KYC Verification" value={67} />
      <Progress
        label="Monthly spend limit"
        value={8400}
        max={10000}
        formatValue={(v: number, m: number) => `$${v.toLocaleString()} / $${m.toLocaleString()}`}
      />
    </div>
  ),
}
