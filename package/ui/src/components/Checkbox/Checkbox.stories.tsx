import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Subscribe to product updates' },
  argTypes: {
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>

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
      <Section label="Agreements">
        <Checkbox
          label={
            <>
              I agree to the{' '}
              <a href="#" className="text-accent-foreground underline underline-offset-2">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-accent-foreground underline underline-offset-2">Privacy Policy</a>
            </>
          }
        />
        <Checkbox label="Subscribe to product updates" defaultChecked />
      </Section>

      <Section label="With Group Label">
        <div>
          <Checkbox groupLabel="Notifications" label="Email me about new features" />
        </div>
        <Checkbox label="Email me about account activity" defaultChecked />
      </Section>

      <Section label="Error">
        <Checkbox label="You must accept the terms" error="This field is required" />
      </Section>

      <Section label="Disabled">
        <Checkbox label="Cannot change" disabled />
        <Checkbox label="Locked on" disabled defaultChecked />
      </Section>
    </div>
  ),
}

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const WithGroupLabel: Story = {
  args: {
    groupLabel: 'Agreements',
    label: 'I agree to the Terms of Service',
  },
}

export const WithLinkInLabel: Story = {
  args: {
    label: (
      <>
        I agree to the{' '}
        <a href="#" className="text-accent-foreground underline underline-offset-2">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-accent-foreground underline underline-offset-2">Privacy Policy</a>
      </>
    ),
  },
}

export const WithError: Story = {
  args: {
    label: 'You must accept the terms',
    error: 'This field is required',
  },
}

export const Disabled: Story = {
  args: { label: 'Cannot change', disabled: true },
}
