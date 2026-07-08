import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'
import { TabList } from './TabList'
import { Tab } from './Tab'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    defaultValue: 'all',
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => (
    <Tabs {...args}>
      <TabList>
        <Tab value="all">All</Tab>
        <Tab value="incoming">Incoming</Tab>
        <Tab value="outgoing">Outgoing</Tab>
        <Tab value="pending">Pending</Tab>
      </TabList>
    </Tabs>
  ),
}

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="all">
      <TabList>
        <Tab value="all">All</Tab>
        <Tab value="incoming">Incoming</Tab>
        <Tab value="outgoing">Outgoing</Tab>
        <Tab value="pending">Pending</Tab>
      </TabList>
    </Tabs>
  ),
}

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [value, setValue] = useState('incoming')
      return (
        <div className="space-y-4">
          <Tabs value={value} onValueChange={setValue}>
            <TabList>
              <Tab value="all">All</Tab>
              <Tab value="incoming">Incoming</Tab>
              <Tab value="outgoing">Outgoing</Tab>
              <Tab value="pending">Pending</Tab>
            </TabList>
          </Tabs>
          <p className="text-sm text-muted-foreground">
            Selected: <strong>{value}</strong>
          </p>
        </div>
      )
    }
    return <ControlledExample />
  },
}

export const Overflow: Story = {
  render: () => (
    <div className="max-w-xs">
      <Tabs defaultValue="all">
        <TabList>
          <Tab value="all">All</Tab>
          <Tab value="incoming">Incoming</Tab>
          <Tab value="outgoing">Outgoing</Tab>
          <Tab value="pending">Pending</Tab>
          <Tab value="scheduled">Scheduled</Tab>
          <Tab value="failed">Failed</Tab>
          <Tab value="disputed">Disputed</Tab>
          <Tab value="refunded">Refunded</Tab>
        </TabList>
      </Tabs>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="all">
      <TabList>
        <Tab value="all">All</Tab>
        <Tab value="incoming">Incoming</Tab>
        <Tab value="outgoing" disabled>Outgoing</Tab>
        <Tab value="pending">Pending</Tab>
      </TabList>
    </Tabs>
  ),
}
