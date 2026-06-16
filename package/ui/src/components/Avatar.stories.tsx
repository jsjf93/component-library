import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithInitials: Story = {
  args: { initials: 'JD', size: 'md' },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Jane Doe',
    size: 'md',
  },
}

export const FallbackIcon: Story = {
  args: { size: 'md' },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar initials="JD" size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar initials="JD" size="md" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar initials="JD" size="lg" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  ),
}

export const FallbackChain: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=5" alt="With image" />
        <span className="text-xs text-muted-foreground">image</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar initials="SC" />
        <span className="text-xs text-muted-foreground">initials</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar />
        <span className="text-xs text-muted-foreground">icon</span>
      </div>
    </div>
  ),
}
