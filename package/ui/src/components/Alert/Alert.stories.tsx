import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Transfer complete',
    children: '$2,500.00 has been sent to Sarah Chen.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Action required',
    children: 'Verify your identity to unlock higher limits.',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Payment declined',
    children: 'Insufficient funds in the selected account.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Maintenance window',
    children: 'Scheduled downtime on Apr 22 from 02:00–04:00 UTC.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="success" title="Transfer complete">$2,500.00 has been sent to Sarah Chen.</Alert>
      <Alert variant="warning" title="Action required">Verify your identity to unlock higher limits.</Alert>
      <Alert variant="danger"  title="Payment declined">Insufficient funds in the selected account.</Alert>
      <Alert variant="info"    title="Maintenance window">Scheduled downtime on Apr 22 from 02:00–04:00 UTC.</Alert>
    </div>
  ),
}

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Changes saved successfully.',
  },
}
