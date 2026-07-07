import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Label', placeholder: 'Placeholder text' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'search', 'password'],
    },
    error: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
)

export const Showcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-sm">
      <Section label="Default">
        <Input label="Account name" placeholder="e.g. Operating Account" helperText="This name appears on statements." />
      </Section>

      <Section label="Password">
        <Input label="Password" type="password" placeholder="Enter your password" />
      </Section>

      <Section label="Error">
        <Input label="IBAN" placeholder="DE89 XXXX" error="Invalid IBAN format" defaultValue="DE89 XXXX" />
      </Section>

      <Section label="Read-only">
        <Input label="Account number (read-only)" readOnly defaultValue="4002 8812 0033" />
      </Section>

      <Section label="Search">
        <Input variant="search" placeholder="Search transactions..." />
      </Section>

      <Section label="Disabled">
        <Input label="Disabled field" placeholder="Cannot edit" disabled />
      </Section>
    </div>
  ),
}

export const Default: Story = {
  args: {
    label: 'Account name',
    placeholder: 'e.g. Operating Account',
    helperText: 'This name appears on statements.',
  },
}

export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: 'Search transactions...',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
}

export const WithError: Story = {
  args: {
    label: 'IBAN',
    defaultValue: 'DE89 XXXX',
    error: 'Invalid IBAN format',
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Account number (read-only)',
    readOnly: true,
    defaultValue: '4002 8812 0033',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    placeholder: 'Cannot edit',
    disabled: true,
  },
}
