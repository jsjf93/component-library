import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from './RadioGroup'

const transferOptions = [
  { value: 'instant',   label: 'Instant',   description: 'Arrives within seconds — $0.50 fee' },
  { value: 'standard',  label: 'Standard',  description: '1–2 business days — Free' },
  { value: 'scheduled', label: 'Scheduled', description: 'Choose a date — Free' },
]

const simpleOptions = [
  { value: 'personal', label: 'Personal' },
  { value: 'business', label: 'Business' },
  { value: 'joint',    label: 'Joint' },
]

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    name: 'story',
    label: 'Transfer speed',
    options: transferOptions,
    defaultValue: 'standard',
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
    {children}
  </div>
)

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-sm">
      <Section label="With Descriptions">
        <RadioGroup
          name="transfer"
          label="Transfer speed"
          options={transferOptions}
          defaultValue="standard"
        />
      </Section>

      <Section label="Simple">
        <RadioGroup
          name="account"
          label="Account type"
          options={simpleOptions}
        />
      </Section>

      <Section label="Disabled">
        <RadioGroup
          name="disabled"
          label="Transfer speed"
          options={transferOptions}
          defaultValue="standard"
          disabled
        />
      </Section>
    </div>
  ),
}

export const Default: Story = {}

export const WithDescriptions: Story = {
  args: {
    name: 'speed',
    label: 'Transfer speed',
    options: transferOptions,
    defaultValue: 'standard',
  },
}

export const Simple: Story = {
  args: {
    name: 'account',
    label: 'Account type',
    options: simpleOptions,
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [value, setValue] = useState('standard')
      return (
        <div className="space-y-4">
          <RadioGroup
            name="controlled"
            label="Transfer speed"
            options={transferOptions}
            value={value}
            onChange={setValue}
          />
          <p className="text-sm text-muted-foreground">Selected: <strong>{value}</strong></p>
        </div>
      )
    }
    return <ControlledExample />
  },
}
