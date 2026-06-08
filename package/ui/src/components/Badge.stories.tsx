import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Badge', variant: 'default' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive', 'verified', 'pending', 'review', 'failed'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
)

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <Section label="Badges & Chips">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="verified">Verified</Badge>
        <Badge variant="pending">Pending</Badge>
        <Badge variant="review">Review</Badge>
        <Badge variant="failed">Failed</Badge>
      </Section>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="verified">Verified</Badge>
      <Badge variant="pending">Pending</Badge>
      <Badge variant="review">Review</Badge>
      <Badge variant="failed">Failed</Badge>
    </div>
  ),
}
