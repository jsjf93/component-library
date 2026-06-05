import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from './Toggle'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  args: { label: 'Transaction alerts', defaultChecked: true },
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
)

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-sm">
      <Section label="Notifications">
        <div className="flex flex-col gap-4 divide-y divide-border">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm font-medium text-foreground">Transaction alerts</span>
            <Toggle defaultChecked />
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm font-medium text-foreground">Monthly statements</span>
            <Toggle defaultChecked />
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm font-medium text-foreground">Promotional emails</span>
            <Toggle />
          </div>
        </div>
      </Section>

      <Section label="With Built-in Label">
        <Toggle label="Transaction alerts" defaultChecked />
        <Toggle label="Monthly statements" defaultChecked />
        <Toggle label="Promotional emails" />
      </Section>

      <Section label="Disabled">
        <Toggle label="Locked setting" defaultChecked disabled />
        <Toggle label="Locked setting (off)" disabled />
      </Section>
    </div>
  ),
}

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Transaction alerts', defaultChecked: true },
}

export const On: Story = {
  args: { defaultChecked: true },
}

export const Off: Story = {
  args: { defaultChecked: false },
}

export const Disabled: Story = {
  args: { label: 'Locked setting', disabled: true, defaultChecked: true },
}

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [on, setOn] = useState(true)
      return (
        <div className="space-y-4">
          <Toggle label="Transaction alerts" checked={on} onChange={setOn} />
          <p className="text-sm text-muted-foreground">State: <strong>{on ? 'on' : 'off'}</strong></p>
        </div>
      )
    }
    return <ControlledExample />
  },
}
