import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { Plus, Download, Send, Bell, Settings } from '@borderline/icons'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
    },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    pulse: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

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
    <div className="space-y-8 p-6 max-w-2xl">
      <Section label="Sizes">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section label="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </Section>

      <Section label="With Icons">
        <Button><Plus /> New Transfer</Button>
        <Button variant="outline"><Download /> Export</Button>
        <Button variant="outline"><Send /> Send</Button>
        <Button variant="outline" size="icon" aria-label="Notifications"><Bell /></Button>
        <Button size="icon" aria-label="Settings"><Settings /></Button>
      </Section>

      <Section label="States">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
        <Button loading>Processing...</Button>
        <Button variant="ghost" loading>Syncing</Button>
      </Section>

      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Full-width CTA</p>
        <div className="flex flex-col gap-3 max-w-sm">
          <Button fullWidth>Confirm Transfer</Button>
          <Button variant="outline" fullWidth>Save as Draft</Button>
        </div>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button><Plus /> New Transfer</Button>
      <Button variant="outline"><Download /> Export</Button>
      <Button variant="outline"><Send /> Send</Button>
      <Button variant="outline" size="icon" aria-label="Notifications"><Bell /></Button>
      <Button size="icon" aria-label="Settings"><Settings /></Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Processing...</Button>
      <Button variant="secondary" loading>Loading</Button>
      <Button variant="outline" loading>Fetching</Button>
      <Button variant="ghost" loading>Syncing</Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Button fullWidth>Confirm Transfer</Button>
      <Button variant="outline" fullWidth>Save as Draft</Button>
    </div>
  ),
}

export const Interactions: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-lg">
      <Section label="Press dip — click any button">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </Section>

      <Section label="Hover shadow lift — filled variants only">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </Section>

      <Section label="Pulse ring — opt-in CTA highlight">
        <Button pulse>Confirm Transfer</Button>
        <Button variant="destructive" pulse>Delete Account</Button>
        <Button variant="outline" pulse>Save as Draft</Button>
      </Section>
    </div>
  ),
}
