import type { Meta, StoryObj } from '@storybook/react-vite'
import * as Icons from '../index'

type IconComponent = (props: { className?: string }) => React.ReactElement

const meta = {
  title: 'Icons/All Icons',
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => (
    <div className="grid grid-cols-6 gap-6 p-8">
      {(Object.entries(Icons) as [string, IconComponent][]).map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon className="size-6" />
          <span className="text-xs text-muted-foreground font-mono">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-end gap-6 p-8">
      {(['size-3', 'size-4', 'size-5', 'size-6', 'size-8'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icons.Send className={size} />
          <span className="text-xs text-muted-foreground font-mono">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const Colors: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6 p-8">
      <Icons.CheckCircle className="size-6 text-green-500" />
      <Icons.AlertCircle className="size-6 text-yellow-500" />
      <Icons.XCircle className="size-6 text-red-500" />
      <Icons.InfoCircle className="size-6 text-blue-500" />
      <Icons.Spinner className="size-6 text-primary" />
    </div>
  ),
}
