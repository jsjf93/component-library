import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const AccountOptions = () => (
  <>
    <option value="checking">Checking Account</option>
    <option value="savings">Savings Account</option>
    <option value="business">Business Account</option>
  </>
)

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Account type',
    placeholder: 'Select account type',
    children: <AccountOptions />,
  },
  argTypes: {
    error: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>

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
      <Section label="Default">
        <Select label="Account type" placeholder="Select account type">
          <AccountOptions />
        </Select>
      </Section>

      <Section label="With Helper Text">
        <Select label="Account type" placeholder="Select account type" helperText="This will be your primary account.">
          <AccountOptions />
        </Select>
      </Section>

      <Section label="Error">
        <Select label="Account type" placeholder="Select account type" error="Please select an account type.">
          <AccountOptions />
        </Select>
      </Section>

      <Section label="Disabled">
        <Select label="Account type" placeholder="Select account type" disabled>
          <AccountOptions />
        </Select>
      </Section>
    </div>
  ),
}

export const Default: Story = {}

export const WithHelperText: Story = {
  args: { helperText: 'This will be your primary account.' },
}

export const WithError: Story = {
  args: { error: 'Please select an account type.' },
}

export const Disabled: Story = {
  args: { disabled: true },
}
