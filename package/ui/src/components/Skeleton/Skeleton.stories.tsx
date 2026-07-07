import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: { className: 'h-4 w-48' },
}

export const ListRows: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="rounded-xl border border-border p-4 flex flex-col gap-3 w-64">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  ),
}
