import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { label: 'Notes', placeholder: 'Add a note...' },
  argTypes: {
    error: { control: 'text' },
    helperText: { control: 'text' },
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
} satisfies Meta<typeof Textarea>

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
        <Textarea label="Notes" placeholder="Add a note to this transaction..." helperText="Optional" />
      </Section>

      <Section label="With Character Count">
        <Textarea
          label="Notes"
          placeholder="Add a note to this transaction..."
          helperText="Optional · Max 500 characters"
          maxLength={500}
        />
      </Section>

      <Section label="Error">
        <Textarea label="Notes" error="This field is required" />
      </Section>

      <Section label="Disabled">
        <Textarea label="Notes" placeholder="Cannot edit" disabled />
      </Section>
    </div>
  ),
}

export const Default: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add a note to this transaction...',
    helperText: 'Optional',
  },
}

export const WithCharacterCount: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add a note to this transaction...',
    helperText: 'Optional · Max 500 characters',
    maxLength: 500,
  },
}

export const WithError: Story = {
  args: {
    label: 'Notes',
    error: 'This field is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Cannot edit',
    disabled: true,
  },
}
